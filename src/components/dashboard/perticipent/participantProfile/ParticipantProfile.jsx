import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../custoomhooks/useAuth";
import useAxiosSecure from "../../../custoomhooks/useAxiosSecure";
import { IoWalletSharp } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { LuChefHat } from "react-icons/lu";
import { FaCaravan } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const ParticipantProfile = () => {

    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const [offer,setOffer] = useState('')

    // payment total length
    const {data: payment = [] } = useQuery({
        queryKey : ['paymenthistory',user.email],
        queryFn : async ()=>{
            const result = await axiosSecure.get(`/payment/${user.email}`)
            return result.data
        }
    })
    console.log(payment)
    const totalfee = payment?.reduce((a,b)=> a + (b.fee), 0)
    console.log(totalfee) 
    const totalCamp = payment?.reduce((a, b) => a + (b.campIds.length || 0), 0);
    console.log(totalCamp);



    const {data: reviews = [] } = useQuery({
        queryKey : ['reviews',user.email],
        queryFn : async ()=>{
            const result = await axiosSecure.get(`/reviews`)
            return result.data
        }
    })
    const review = reviews?.filter(x=> x?.email === user?.email)
    console.log(review)
    


    useEffect(() => {
        if (totalfee >= 500) {
            setOffer('💐💫Congratulations! You have received a gift for spending $1000 or more to join us.');
        } else {
            setOffer('You will receive a special gift from us if you spend more than $1000 in our campaign.');
        }
    }, [totalfee]);


    return (

    <div className="bg-[url('https://t4.ftcdn.net/jpg/05/42/73/17/360_F_542731787_npIDENXs9NMkl1mtyHKj8De2WBL2vnFW.jpg')] cursor-pointer bg-no-repeat bg-cover w-full md:flex justify-between   h-full ">

        <div  className=" h-[100vh] lg:px-20 py-10   w-full  ">
           
            <Link to={'/contact'} >
               <h1  className="font-semibold capitalize font-sans w-[70%] text-[black] ">{offer } <span className="underline text-rose-400"> !Connect With us </span></h1>
            </Link>
            

            <h1 className="text-2xl py-5 font-bold mt-10 capitalize font-sans">Hi! Wellcome <span className="text-[#10a176] text-3xl">{user ? user.displayName : 'to came Back' }</span> </h1>
            <div className="w-full  grid grid-cols-1 md:grid-cols-2 mx-auto md:gap-5">

             <div className="flex justify-center items-center p-12 gap-5 rounded bg-gradient-to-r from-teal-500 to-amber-100 ">
              <div className="text-white ">
                <h1 className="text-4xl flex justify-center items-center gap-5 font-bold"><FaUsers className="text-5xl rounded text-white"></FaUsers> {payment?.length}</h1>
                <p className="text-xl">Total payment Times </p>
              </div>
             </div>

             <div className="flex justify-center items-center p-12 gap-5 rounded bg-gradient-to-r from-[#09a7a7a6] to-[#a1cfbd7a] ">
              <div className="text-white ">
                <h1 className="text-4xl flex justify-center items-center gap-5 font-bold">  <LuChefHat className="text-5xl rounded text-white"></LuChefHat> {totalCamp}</h1>
                <p className="text-xl">Joined Campaign</p>
              </div>
             </div>

             <div className="flex justify-center items-center p-12 gap-5 rounded bg-gradient-to-r from-sky-500 to-[#f04a6e67] ">
              <div className="text-white ">
                <h1 className="text-4xl flex justify-center items-center gap-5 font-bold"><IoWalletSharp className="text-5xl rounded text-white"></IoWalletSharp> {totalfee} </h1>
                <p className="text-xl">Complete Payment</p>
              </div>
             </div>

             <div className="flex justify-center items-center p-12 gap-5 rounded bg-gradient-to-r from-[#5cf79db9] to-[#d9fa60b6] ">
              <div className="text-white ">
                <h1 className="text-4xl flex justify-center items-center gap-5 font-bold"><FaCaravan className="text-5xl rounded text-white"></FaCaravan> {review?.length}</h1>
                <p className="text-xl">Reviews</p>
              </div>
             </div>

     </div>
 </div>

        <div className="h-full md:flex md:pt-56 pt-80 justify-center border-l-2 border-[#0d8cac] md:px-5 md:w-1/3  bg-[#ffffff]">
           <figure>
               <img className="w-44 flex justify-center mx-auto  h-44 rounded-full p-1 bg-[#0d8cac] " src={user?.photoURL || 'https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_1280.png'} alt="" />
               <h1 className="uppercase text-3xl font-bold py-4 mx-auto text-center">{user?.displayName || 'USER'}</h1>
           </figure>
        </div>


</div>
    );
};

export default ParticipantProfile;