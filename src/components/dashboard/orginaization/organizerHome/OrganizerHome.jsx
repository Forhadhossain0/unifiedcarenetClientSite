import { IoWalletSharp } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { LuChefHat } from "react-icons/lu";
import { FaCaravan } from "react-icons/fa";
import useAxiosSecure from "../../../custoomhooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../custoomhooks/useAuth";



const OrganizerHome = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()

    const {data:camp =[]}= useQuery({
        queryKey: ['camp'],
        queryFn: async()=>{
            const res = await axiosSecure.get('/camp')
            return res?.data
        }
    })
    const {data:users =[]}= useQuery({
        queryKey: ['camp'],
        queryFn: async()=>{
            const res = await axiosSecure.get('/users')
            return res?.data
        }
    })



    return (
        <>
             <div className="md:w-[90%] h-auto w-full  mx-auto ">
          <h1 className="text-3xl my-10 font-bold capitalize font-sans">Hi! Wellcome <span className="text-lime-400">{user ? user.displayName : 'to came Back' }</span> </h1>
          <div className="w-full md:flex justify-center mx-auto gap-5">


             <div className="flex justify-center items-center p-12 gap-5 rounded bg-gradient-to-r from-amber-500 to-amber-100 ">
              <FaUsers className="text-5xl rounded text-white"></FaUsers>
              <div className="text-white ">
                <h1 className="text-2xl font-bold">{users?.length}</h1>
                <p className="text-xl">Users</p>
              </div>
             </div>

             <div className="flex justify-center items-center p-12 gap-5 rounded bg-gradient-to-r from-rose-500 to-rose-100 ">
              <LuChefHat className="text-5xl rounded text-white"></LuChefHat>
              <div className="text-white ">
                <h1 className="text-2xl font-bold">{camp?.length}</h1>
                <p className="text-xl">Campaign</p>
              </div>
             </div>

             <div className="flex justify-center items-center p-12 gap-5 rounded bg-gradient-to-r from-purple-500 to-purple-100 ">
              <IoWalletSharp className="text-5xl rounded text-white"></IoWalletSharp>
              <div className="text-white ">
                <h1 className="text-2xl font-bold"> 22 </h1>
                <p className="text-xl">Earnings</p>
              </div>
             </div>

             <div className="flex justify-center items-center p-12 gap-5 rounded bg-gradient-to-r from-blue-400 to-purple-100 ">
              <FaCaravan className="text-5xl rounded text-white"></FaCaravan>
              <div className="text-white ">
                <h1 className="text-2xl font-bold">44</h1>
                <p className="text-xl">Participents</p>
              </div>
             </div>

          </div>


        </div>
        </>
    );
};

export default OrganizerHome;