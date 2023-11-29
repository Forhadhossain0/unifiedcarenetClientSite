import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { MdDelete } from "react-icons/md";
import useAxiosSecure from "../../../custoomhooks/useAxiosSecure";
import useAuth from "../../../custoomhooks/useAuth";
import { Link } from "react-router-dom";
import { FaMoneyCheck } from "react-icons/fa";


const RegisteredCamps = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()

    const {data:registerdCamp =[],refetch}= useQuery({
        queryKey: ['registerdCamp'],
        queryFn: async()=>{
            const res = await axiosSecure.get('/registerdCamp')
            return res?.data
        }
    })
    console.log(registerdCamp)

    const filterCamp = registerdCamp?.filter(x=> x?.perticipentInfo?.email === user?.email )

    const totalPrice1 = filterCamp?.reduce((a,b)=> a + (b.camp.campfee), 0)
    const totalPrice = totalPrice1?.toFixed(2)

    const handleDelete = (id) =>{
        console.log(id)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
            axiosSecure.delete(`/registerdCamp/${id}`)
            .then(res=> {
                // console.log(res)
                if(res?.data?.deletedCount > 0){
                    refetch()
                      Swal.fire({
                      title: "Deleted!",
                      text: "Your file has been deleted.",
                      icon: "success"
                    });
                }else{console.log('not show mess')}
            })
            }
        });
    }




    return (
    <div>
            <div className=" py-5 items-center flex justify-between mb-10 px-16 bg-[#42d1e4a9]  ">
               <h1 className="text-sm capitalize font-serif text-white font-bold ">Dashboard/RegisteredCamps (My Camps : {filterCamp?.length})</h1>
               <h1 className="text-lg  capitalize text-white font-serif  ">update delete your campaign details to manage camp informations.</h1>
            </div>

    <div className="md:px-10">

               <div className="flex py-10 gap-5 items-center">
               <h1 className="text-xl capitalize font-semibold">your Camps Fee : <span className="text-orange-400">${totalPrice}</span></h1>
               {filterCamp?.length > 0 ? <Link to={'/dashboard/userPayment'}><h1 className="btn  btn-info hover:bg-orange-400 w-32 px-5 rounded text-white  flex gap-2">Card PAY <FaMoneyCheck/> </h1></Link>
                                 : <button disabled ><h1 className="btn  btn-info hover:bg-gray-400 border-none bg-gray-400 w-32 px-5 rounded text-gray-200  flex gap-2">Card PAY <FaMoneyCheck/> </h1></button>
                }
               </div>


            <div className="overflow-x-auto ">
            <table className="table">
                <thead className=" shadow text-rose-500 h-16 border  ">
                <tr>
                    <th>   <label>  <input type="checkbox" className="checkbox" /> </label>  </th>
                    <th>Camp Name</th>
                    <th>Specialized Services</th>
                    <th>Scheduled Datetime</th>
                    <th>Venue Location</th>
                    <th>Fee</th>
                    <th>ACTION</th>
                </tr>
                </thead>

                <tbody>
            {
                filterCamp?.map((camp,index)=> 
                <tr key={camp._id} className="text-gray-500  "> 
                    <td> {index + 1}  </td>
                    <td><h1 className="font-bold">{camp?.camp.campname}</h1> </td>
                    <td><h1 className="font-bold">{camp?.camp.specializedservices}</h1></td>
                    <td><h1 className="font-bold">{camp?.camp.scheduleddatetime}</h1></td>
                    <td><h1 className="font-bold">{camp?.camp.venuelocation}</h1></td>
                    <td><h1 className="font-bold">{camp?.camp.campfee}</h1></td>
                    {/* <td><Link to={`/dashboard/updatecamp/${camp?.camp._id}`}  className="  "> <FaEdit className="  h-9 p-2 w-9 text-lg  bg-blue-500 rounded hover:bg-slate-400 transition-all text-white"></FaEdit> </Link></td> */}
                    <td><button onClick={()=> handleDelete(camp?._id)} className="p-2 bg-red-500 text-lg rounded hover:bg-slate-400 transition-all text-white"><MdDelete /></button>  </td>
                </tr>
                             
            )}



                </tbody>
            </table>
            </div>


</div>
        </div>
    );
};

export default RegisteredCamps;