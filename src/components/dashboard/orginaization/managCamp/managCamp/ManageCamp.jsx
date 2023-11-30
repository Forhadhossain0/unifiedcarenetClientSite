import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../custoomhooks/useAxiosSecure";

// import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
import {  FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";


const ManageCamp = () => {
    const axiosSecure = useAxiosSecure()

    const {data:camp =[],refetch}= useQuery({
        queryKey: ['camp'],
        queryFn: async()=>{
            const res = await axiosSecure.get('/camp')
            return res?.data
        }
    })

    console.log(camp)


    const handleDelete = (id) =>{
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
            axiosSecure.delete(`/camp/${id}`)
            .then(res=> {
                if(res){
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

<Helmet><title>Unified || ManageCamp</title></Helmet>

            <div className=" py-5 items-center flex justify-between mb-10 px-16 bg-[#42d1e4a9]  ">
               <h1 className="text-sm capitalize font-serif text-white font-bold ">Dashboard/ManagCamp (Total Camps : {camp?.length})</h1>
               <h1 className="text-lg  capitalize text-white font-serif  ">update delete your campaign details to manage camp informations.</h1>
            </div>

    <div className="md:px-10">

            <div className="overflow-x-auto ">
            <table className="table">
                <thead className=" shadow text-rose-500 h-16 border  ">
                <tr>
                    <th>   <label>  <input type="checkbox" className="checkbox" /> </label>  </th>
                    <th>Camp Name</th>
                    <th>Specialized Services</th>
                    <th>Scheduled Datetime</th>
                    <th>Venue Location</th>
                    <th>Update</th>
                    <th>ACTION</th>
                </tr>
                </thead>

                <tbody>
            {
                camp?.map((camp,index)=> 
                <tr key={camp._id} className="text-gray-500  "> 
                    <td> {index + 1}  </td>
                    <td><h1 className="font-bold">{camp?.campname}</h1> </td>
                    <td><h1 className="font-bold">{camp.specializedservices}</h1></td>
                    <td><h1 className="font-bold">{camp.scheduleddatetime}</h1></td>
                    <td><h1 className="font-bold">{camp.venuelocation}</h1></td>
                    <td><Link to={`/dashboard/updatecamp/${camp._id}`}  className="  "> <FaEdit className="  h-9 p-2 w-9 text-lg  bg-blue-500 rounded hover:bg-slate-400 transition-all text-white"></FaEdit> </Link></td>
                    <td><button onClick={()=> handleDelete(camp._id)} className="p-2 bg-red-500 text-lg rounded hover:bg-slate-400 transition-all text-white"><MdDelete /></button>  </td>
                </tr>
                             
            )}



                </tbody>
            </table>
            </div>


</div>
        </div>
    );
};

export default ManageCamp;