import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
import { PiUsersThreeFill } from "react-icons/pi";
import { FaUserMd } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../custoomhooks/useAxiosSecure";
import { Helmet } from "react-helmet";


const Allusers = () => {

const axiosSecure = useAxiosSecure();


const {data:hasAllUsers, refetch}  = useQuery({
    queryKey:['hasAllUsers'],
    queryFn: async() =>{
        const res = await axiosSecure.get('/users')
        return res.data
    }
})  


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
            axiosSecure.delete(`/users/${id}`)
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


    const handleOrganizerRole = (user) =>{
        Swal.fire({
            title: "Are you sure?",
            text: "you wnat to get this user Organizer permission!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, i want!"
          }).then((result) => {
             if (result.isConfirmed) { 
                axiosSecure.patch(`/users/organizer/${user._id}`)
                .then(res=>{
                    console.log(res)
                    if(res.data.modifiedCount > 0){
                        refetch()
                        Swal.fire({
                        title: "got organizer role!",
                        text: "Your role has been changed.",
                        icon: "success"
                      });
                    }
                  })
            }})
          
    }


    const handleProfessionalRole = (user) =>{
        Swal.fire({
            title: "Are you sure?",
            text: "you wnat to get this user Professionals permission!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, i want"
          }).then((result) => {
             if (result.isConfirmed) { 
                axiosSecure.patch(`/users/professionals/${user._id}`)
                .then(res=>{
                    console.log(res)
                    if(res.data.modifiedCount > 0){
                        refetch()
                        Swal.fire({
                        title: "got professionals role!",
                        text: "Your role has been changed.",
                        icon: "success"
                      });
                    }
                  })
            }})
          
    }

    

    return (
        <div className="md:px-20">

<Helmet><title>Unified || All-Users</title></Helmet>

            <div className="flex justify-between px-5 py-10">
               <h1 className="text-xl capitalize font-semibold">Total Users : {hasAllUsers?.length}</h1>
            </div>


            <div className="overflow-x-auto md:px-5">
            <table className="table">
                <thead className=" bg-[#08c5ff] h-16 text-white ">
                <tr>
                    <th>   <label>  <input type="checkbox" className="checkbox" /> </label>  </th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th> ORGANIZER ROLE</th>
                    <th>PROFESSIONALS ROLE</th>
                    <th>ACTION</th>
                </tr>
                </thead>
                <tbody>

            {
                hasAllUsers?.map((user,index)=> 
                    <tr key={user._id} className="text-gray-400 "> 
                    <th> {index + 1}  </th>
                    <td><h1 className="font-bold">{user?.name ? user.name : user.displayName  }</h1> </td>
                    <td><h1 className="font-bold">{user.email}</h1></td>
                 
                    <td > 
                        {
                          user?.role === 'organizer' ?   'Organizer'   :<h1  onClick={()=> handleOrganizerRole(user)} className="font-bold w-10  hover:bg-slate-500 text-white rounded bg-[#067a8f] border text-xl p-2"> <PiUsersThreeFill /> </h1>
                        }
                    </td>

                    <td> 
                        {
                          user?.role === 'professionals' ?   'Halthcare Professionals'   :<h1  onClick={()=> handleProfessionalRole(user)} className="font-bold w-10  hover:bg-slate-500 text-white rounded bg-[#08d0eb] border text-xl p-2"> <FaUserMd /></h1>
                        } 
                     </td>

                    <th><button onClick={()=> handleDelete(user._id)} className="p-2 bg-red-500 text-lg rounded hover:bg-slate-400 transition-all text-white"><MdDelete /></button>  </th>
                </tr>
                             
            )}



                </tbody>
            </table>
            </div>


</div>
    );
};

export default Allusers;