import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
// import { PiUsersThreeFill } from "react-icons/pi";
// import { FaUserMd } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../custoomhooks/useAxiosSecure";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from "react-router-dom";

const ManageInterestedCamp = () => {
    AOS.init()

const axiosSecure = useAxiosSecure();
const {data:professionalsInterest, refetch}  = useQuery({
    queryKey:['professionalsInterest'],
    queryFn: async() =>{
        const res = await axiosSecure.get('/professionalsInterest')
        return res.data
    }
})  
console.log(professionalsInterest , 'professionalsInterest')



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
            axiosSecure.delete(`/professionalsInterest/${id}`)
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




    const handleInteresStatus = (id)=>{
        console.log(id, 'proId')
           Swal.fire({
               title: "Are you sure to accept ?",
               text: "You won't be able to retrun this!",
               icon: "warning",
               showCancelButton: true,
               confirmButtonColor: "#3085d6",
               cancelButtonColor: "#d33",
               confirmButtonText: "Yes, i want  !"
             }).then( async(result) => {
               if (result.isConfirmed) {

                axiosSecure.patch(`/professionalsInterest/${id}`, { interest: 'accepted' })
                   .then(res=> {
                    console.log(res, 'oo')
                       if(res?.data?.modifiedCount > 0){
                           Swal.fire({ title: "success!",  text: "Accepted Confirmed.", icon: "success"  });
                        }
                    })
                    refetch()  
                }
       
          })
       }




    return (
        <div data-aos="fade-left"  data-aos-duration="3000" className=" bg-[white] mx-auto mt-5  w-[95%] pb-10">
            <div className="flex justify-between px-5 py-10">
               <h1 className="text-xl capitalize text-gray-500 rounded-md font-semibold">Total professionals get Interested camps  : {professionalsInterest?.length}</h1>
            </div>


            <div className="overflow-x-auto md:px-5">
            <table className="table">
                <thead className=" bg-[#04e4ac] h-16 text-white ">
                <tr className="uppercase">
                    <th>Professionals</th>
                    <th>Professionals name</th>
                    <th>campname</th>
                    <th>participant</th>
                    <th>venuelocation</th>
                    <th>status</th>
                    <th>ACTION</th>
                </tr>
                </thead>
                <tbody>

            {
                professionalsInterest?.map((professionalsInterest)=> 
                // console.log(professionalsInterest)
                    <tr key={professionalsInterest._id} className="text-gray-500 "> 

                    <th><img className="rounded-full w-[60px] h-[60px] border-teal-400 border-2" src={professionalsInterest?.professionalsBio[0].photo} alt="" /></th>
                    <td><Link to={'/dashboard/proHome'}> <h1 className="font-bold underline uppercase">{professionalsInterest?.professionalsBio[0].name }</h1></Link></td>
                    <td><h1 className="font-bold">{professionalsInterest?.campData?.campname  }</h1> </td>
                    <td><h1 className="font-bold">{professionalsInterest?.campData?.participant || 0  }</h1> </td>
                    <td><h1 className="font-bold">{professionalsInterest?.campData?.venuelocation }</h1> </td>
                   
                    {professionalsInterest.campData.interest !== ('accepted') ? 
                     <td > <h1  onClick={()=> handleInteresStatus(professionalsInterest?._id)} className="font-bold  hover:bg-slate-500 text-white rounded w-1/2 cursor-pointer bg-[#04e4ac]  text-center flex justify-center border p-2"> {professionalsInterest?.campData?.interest} ? </h1></td>
                     :<td ><h1 className="font-bold  hover:bg-[#74767e]  text-white rounded  cursor-pointer bg-[#74767e] text-center flex justify-center border p-2"> {professionalsInterest.campData.interest} </h1> </td> 
                     }
                   
                   
                   
                    <th><button onClick={()=> handleDelete(professionalsInterest._id)} className="p-2 bg-red-500 text-lg rounded hover:bg-slate-400 transition-all text-white"><MdDelete /></button>  </th>
                </tr>
                             
            )}



                </tbody>
            </table>
            </div>


</div>
    );
};

export default ManageInterestedCamp;