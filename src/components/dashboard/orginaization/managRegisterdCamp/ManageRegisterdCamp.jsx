import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../custoomhooks/useAxiosSecure";
import { CiSquareQuestion } from "react-icons/ci";
import { IoMdDoneAll } from "react-icons/io";
import Swal from "sweetalert2";
// import useAuth from "../../../custoomhooks/useAuth";


const ManageRegisterdCamp = () => {

    // const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data: payment = [],refetch } = useQuery({
        queryKey : ['paymenthistory'],
        queryFn : async ()=>{
            const result = await axiosSecure.get(`/payment`)
            return result.data;
        }
    });

console.log(payment,'manag org camp')




const handlePaymentStatus = (id)=>{
 console.log(id)
    Swal.fire({
        title: "Are you sure to confirm ?",
        text: "You won't be able to retrun this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, want pay !"
      }).then( async(result) => {
        if (result.isConfirmed) {

            axiosSecure.patch(`/payment/${id}`)
            .then(res=> {
                if(res?.data?.modifiedCount > 0){
                    refetch()  
                  Swal.fire({ title: "success!",  text: "sucessfully has been Confirmed.", icon: "success"  });
                }
            })

      }

   })

}

return (
    <div className="md:px-20">
  
        <h1 className="text-xl capitalize p-6 font-semibold">BOOKING TIME  : {payment?.length} times</h1>

        <div className="overflow-x-auto md:px-5">
        <table className="table  ">
            <thead className=" bg-[#f09494] h-16 text-white  ">
              <tr>
                <th>USER EMAIL</th> 
                <th>PHONE NUMBER</th> 
                <th>BOOKING DATE</th>
                <th>ACTIVITY</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>
          { payment?.sort((a,b)=> new Date(b.date) -  new Date(a.date) )?.map((payment)=> 
              <tr key={payment._id} className="text-gray-400 cursor-pointer"> 
                <td><h1 className="font-bold">{payment.email}</h1></td>
                <td><h1 className="font-bold">{payment?.phoneNumber ? payment.phoneNumber[0] : 'N/A'}</h1></td>
                <td><h1 className="font-bold">{payment.date}</h1>  </td>
                {payment.status === 'Confirmed' ? 
                 <td ><h1 className="font-bold py-2  rounded text-center flex gap-1 justify-center items-center capitalize text-black bg-lime-300"> {payment.status} <IoMdDoneAll></IoMdDoneAll> </h1> </td> 
                // :<td onClick={()=>handlePaymentStatus(payment._id)}><h1 className="font-bold py-2 hover:bg-blue-600 rounded text-center capitalize text-white bg-sky-400">Confirm</h1> </td>
                :<td onClick={()=>handlePaymentStatus(payment._id)}><h1 className="font-bold py-2 hover:bg-blue-600 rounded text-center capitalize flex gap-1 justify-center items-center text-white bg-sky-400">Confirm <CiSquareQuestion className="text-xl text-black"></CiSquareQuestion></h1> </td>
                 }

                {payment.status === 'Confirmed' ? 
                 <td ><h1 className="rounded-full w-9 h-9  bg-lime-300">  </h1> </td> 
                :<td ><h1 className="rounded-full w-9 h-9  bg-sky-400"></h1> </td>
                 }

                {/* <td><h1 className="bg-blue-700 rounded-full w-9 h-9"> </h1> </td>  */}
              </tr> 
          )}

            </tbody>
        </table>
        </div>


</div>
    );
};

export default ManageRegisterdCamp;