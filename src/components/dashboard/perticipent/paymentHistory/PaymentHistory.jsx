import { useQuery } from "@tanstack/react-query";
import { CiSquareQuestion } from "react-icons/ci";
import { IoMdDoneAll } from "react-icons/io";
import useAuth from "../../../custoomhooks/useAuth";
import useAxiosSecure from "../../../custoomhooks/useAxiosSecure";
import { Helmet } from "react-helmet";


const PaymentHistory = () => {

    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data: payment = [] } = useQuery({
        queryKey : ['paymenthistory',user.email],
        queryFn : async ()=>{
            const result = await axiosSecure.get(`/payment/${user.email}`)
            return result.data
        }
    })
    
console.log(payment)


return (
    <div className="md:px-20 pt-12 w-full h-full">
  
  <Helmet><title>Unified || Payment-History</title></Helmet>
  
        <h1 className="text-xl capitalize  border-b-2 pb-1 mb-5 ml-5 w-[40%]  text-teal-500 py-6 font-semibold">Total completed & Pending payment  : {payment?.length}</h1>

        <div className="overflow-x-auto md:px-5">
        <table className="table  ">
            <thead className="  shadow border h-16 text-black  ">
              <tr>
                <th><label>  <input type="checkbox" className="checkbox" /> </label>  </th>
                <th>TRANSACTION ID</th> 
                <th>TRANSACTION DATE</th> 
                <th>PRODUCT Fee</th>
                <th>PAYMENT STATUS</th>
              </tr>
            </thead>

            <tbody>
          { payment?.sort((a,b)=> new Date(b.date) -  new Date(a.date) )?.map((payment,index)=> 
              <tr key={payment._id} className="text-gray-400 cursor-pointer"> 
                <th> {index + 1}  </th> 
                <td><h1 className="font-bold">{payment.transactionId}</h1></td>
                <td><h1 className="font-bold">{payment.date}</h1>  </td>
                <td><h1 className="font-bold">${payment.fee}</h1> </td>
                {payment.status === 'Confirmed' ? 
                 <td ><h1 className="font-bold py-2  rounded text-center flex gap-1 justify-center items-center capitalize text-black bg-lime-300"> {payment.status} <IoMdDoneAll></IoMdDoneAll> </h1> </td> 
                :<td ><h1 className="font-bold py-2 hover:bg-blue-600 rounded text-center capitalize flex gap-1 justify-center items-center text-white bg-sky-400">{payment.status} <CiSquareQuestion className="text-xl text-black"></CiSquareQuestion></h1> </td>
                 }

              </tr> 
          )}

            </tbody>
        </table>
        </div>


</div>
    );
};

export default PaymentHistory;