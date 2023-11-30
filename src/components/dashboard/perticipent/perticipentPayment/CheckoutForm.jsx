import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../custoomhooks/useAxiosSecure";
import useAuth from "../../../custoomhooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const CheckoutForm = () => {

  const [message,setMessage] = useState([]);
  const [clientSecret,setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth()



  const {data,refetch} = useQuery({
    queryKey: ['registerdCamp'],
    queryFn: async()=>{
        const res = await axiosSecure.get('/registerdCamp')
        return res?.data
    }
  })

  const filterCamp = data?.filter(x=> x?.perticipentInfo?.email === user?.email )
  const totalAmount = filterCamp?.reduce((a,b)=> a + (b.camp.campfee), 0)
  // console.log(totalAmount)
  
  const userPhoneNumber = filterCamp?.map(x=> x.perticipentInfo.phoneNumber)
  // console.log(userPhoneNumber)

    
  useEffect(()=>{
     if(totalAmount > 0){
      axiosSecure.post('/create-payment-intent',{fee:totalAmount})
      .then(res=> setClientSecret(res.data.clientSecret))
     }
  },[axiosSecure,totalAmount])
  console.log(clientSecret)


console.log(data)


const handleSubmit = async (e)=>{
    e.preventDefault();

    Swal.fire({
        title: "Are you sure to pay ?",
        text: "You won't be able to retrun this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, want pay !"
      }).then( async(result) => {
        if (result.isConfirmed) {


      const card = elements.getElement(CardElement);

        if(!stripe || !elements){ return;   }

        if(card == null){ return; }

        const {error,paymentMethod} = await stripe.createPaymentMethod({
            type : 'card',
            card
        })
        
        if(error){
            console.log('payment error', error)
        }else{
            console.log('payment method', paymentMethod)
        }


      const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment( clientSecret  , {
          payment_method:{
              card: card,
              billing_details:{
                email:user?.email,
                name:user?.displayName, 
             }
            } 
        })



       if(confirmError){
        setMessage(confirmError) ;
        console.log('confirmError get ', confirmError);
       }else{
         console.log('paymentIntent get ', paymentIntent)
         if(paymentIntent.status === 'succeeded'){
           setMessage('');
          //  now save the payment history in DB 
          const payment = {
            transactionId: paymentIntent.id,  fee: totalAmount, date: new Date(),email: user.email , phoneNumber: userPhoneNumber,
            regsiterdCampIds: data?.map(cart=> cart._id),
            campIds: data?.map(cart=> cart.camp._id   ),
            status: 'pending'
          }
              const res = await axiosSecure.post('/payment',payment)
              if(res?.data?.paymentResult?.insertedId){
              Swal.fire({ title: "success!",  text: "Your payment has been complete.", icon: "success"  });
              refetch();
              setMessage(<>Your transactionId :  { paymentIntent.id} </>)
             }
          }}
          
        }
    })
      refetch();

    };

  return (
    <div className=" mt-10 p-10 bg-[#fff] border shadow border-blue-300 mx-auto w-1/2 h-auto  ">
      <form onSubmit={handleSubmit}  >
        <label className="text-xl font-bold flex text-blue-500 justify-center mb-16 capitalize">add your card details</label>
        <label className="text-lg text-gray-400 font-bold  capitalize">total amount : ${totalAmount}</label>

        <CardElement className="border rounded  p-5 mt-4"
          options={{  style: { base: { fontSize: "16px", color: "#424770", "::placeholder": { color: "#aab7c4"} },
                               invalid: {color: "#9e2146"}  },  }} />

          <button disabled={!stripe || !clientSecret || !totalAmount } type="submit" className="w-full text-center btn font-bold text-black px-5 py-3 hover:bg-amber-200 bg-amber-300 rounded mt-5" >
          Pay  </button>
      </form>



      <p className="text-[#2e2626] capitalize text-center font-semibold mt-7">{message?.message || message}</p>

    </div>
  );
};

export default CheckoutForm;
