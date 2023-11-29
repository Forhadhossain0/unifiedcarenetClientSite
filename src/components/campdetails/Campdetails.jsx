import {  useLoaderData } from "react-router-dom";
import { FcServices } from "react-icons/fc";
import { FaPeopleArrows } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineAccessTime } from "react-icons/md";
import Swal from "sweetalert2";
import useAuth from "../custoomhooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../custoomhooks/useAxiosSecure";

const Campdetails = () => {

  const camp = useLoaderData();
  // console.log(camp)

  const {user} = useAuth()
  const email = user.email;
  const axiosSecure= useAxiosSecure()
 

  
  const {data:hasAllUsers}  = useQuery({
    queryKey:['hasAllUsers'],
    queryFn: async() =>{
        const res = await axiosSecure.get('/users')
        return res.data
    }
  }) 
  const normalUser =  hasAllUsers?.filter(dbuser=> !(dbuser.role) )
  console.log(normalUser)


  const handleInfoPostOnDB = (e) =>{
    e.preventDefault(); 
    const fullName = e.target.name.value;
    const phoneNumber = e.target.number.value;
    
    const perticipentInfo = {fullName,phoneNumber,email}  
    console.log(perticipentInfo,camp)

    axiosSecure.post('/registerdCamp',{perticipentInfo,camp})
    .then(res=>{
      console.log(res?.data)
      if(res?.data?.insertedId){
        axiosSecure.patch(`/camp/perticipentCount/${camp._id}`,  { participant: parseFloat(camp?.participant) }) 
              .then(res=> {console.log(res?.data)})

             Swal.fire({ title: "success!", text: "Your Perticipent request  has been send.",  icon: "success"  }
        );}else{ 
                                   Swal.fire({
                                     title: "error!",
                                     text: "Somthing want wrong! ",
                                     icon: "error"
                                   });}
    })

    const modal = document.getElementById('my_modal_3');
    if (modal) {
      modal.close();
    }
  
  }


    return (
     <>


             <div className="mt-20  border px-10 py-2  ">
             <h1 className=" text-black  font-bold ">Camp/CampDetails </h1>
             <h1 className=" font-bold text-blue-500 "> <span className="text-black">Explore for </span> {camp.campname}</h1>
             </div>



       <div className="  p-10 flex justify-start mt-10 mx-auto gap-20 md:w-[90%] ">

            <img className=" bg-[#f0f7f7] w-[500px] h-[600px]" src={camp.image} alt="" /> 
       
            <div key={camp._id} > 
                <h3 className="text-4xl font-bold text-rose-500 ">{camp.campname} <span className="text-blue-500 text-5xl"> +</span></h3>
                <div className="flex justify-between">
                  <h3 className="text-sky-400 py-2 flex items-center text-sm "><IoLocationOutline></IoLocationOutline> {camp.venuelocation} </h3>
                  <h3 className="py-3 text-sm   text-black  flex items-center gap-2"><MdOutlineAccessTime></MdOutlineAccessTime>{camp.scheduleddatetime}</h3>
                </div>

                <h3 className="py-2 border-b-2 pb-5  font-bold ">Join Us : <span className="text-rose-500 text-3xl">${camp.campfee}</span> Camp Fee</h3>

                <h3 className="text-lg text-justify pt-2">{camp.description}</h3>
                <h3 className="text-lg text-justify py-3">{camp?.details}</h3>

                <div>
                 <p className="capitalize text-xl flex gap-2 items-center font-semibold"><FaPeopleArrows className="text-blue-500 "></FaPeopleArrows>target audience :</p>
                 <h3 className="capitalize  "> {camp.targetaudience} years old</h3>
                </div>

                 <div>
                  <p className="capitalize mt-2 text-xl flex gap-2 items-center font-semibold"><FcServices></FcServices> specialized services :</p>
                  <h3 className="capitalize md:w-[80%] "> {camp.specializedservices}</h3>
                 </div>

                <div>
                  <p className="capitalize mt-2 text-xl  flex gap-2 items-center font-semibold"><FaUserDoctor></FaUserDoctor>  our healthcare Professionals :</p>
                  <h3 className="capitalize md:w-[80%] "> {camp.healthcareProfessionals}</h3>
                </div>

                <div className="flex gap-2  items-center mt-2">
                  <p className="capitalize underline text-blue-500 font-semibold">Total peticipent:</p>
                  <h3 className="capitalize "> {camp?.participant || 0}</h3>
                </div>

            {/* <button onClick={()=>{document.getElementById('my_modal_3').showModal()}} 
                   disabled={ isOrganizer===true || isProfessionals===true }  className={ " w-56 text-center mx-auto btn mt-4  hover:bg-transparent hover:border-2 hover:text-rose-500 btn-info hover:border-rose-500 border-rose-500 bg-rose-500 text-white rounded uppercase "} >
              JOIN CAMPIGION
            </button> */}
            
            <button onClick={()=>{document.getElementById('my_modal_3').showModal()}} 
                disabled={!normalUser}   className={ " w-56 text-center mx-auto btn mt-4  hover:bg-transparent hover:border-2 hover:text-rose-500 btn-info hover:border-rose-500 border-rose-500 bg-rose-500 text-white rounded uppercase "} >
              JOIN CAMPIGION
            </button>

          
        </div>
    </div>
   

    <dialog id="my_modal_3" className="modal w-full mx-auto">
        <div className="modal-box w-[600px] px-16 py-10 ">
          <form method="dialog">
            <button className="text-2xl bg-transparent hover:text-red-700 absolute right-5 font-bold top-3">✕</button>
          </form>
           <form  onSubmit={handleInfoPostOnDB} className="space-y-3 ">
             <h1 className="text-center pb-3 font-serif text-lime-500"> Give Youe Valid Data To Get Awsome Benifits </h1>
            <input className="p-3  w-full rounded outline-none  border" disabled type="email"name="email" placeholder={user?.email}  />
            <input className="p-3  w-full rounded outline-none  border" required type="text" name="name" placeholder="Enter Your Full Name"  />
            <input className="p-3  w-full rounded outline-none  border" required type="text" name="number" placeholder="Enter Your Phone Number"  />
            <input className="p-3  w-full rounded outline-none  border" required type="text" name="age" placeholder="Enter Your Age"  />
            <input className="p-3  w-full rounded outline-none  border" required type="text" name="address" placeholder={'Enter Your Address'}   />
            <div className="flex gap-5  justify-between">
              <select defaultValue={'default'} className="border">
                <option disabled value='default'>Select Your Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <input className="p-2 w-full text-center rounded outline-none  border" required type="text" name="campfee" placeholder={`Camp Fee $ ${camp?.campfee}` }  disabled />
            </div>

            <input  className="p-3 w-full cursor-pointer hover:bg-gray-600 text-white font-bold bg-blue-500 rounded outline-none border"  type="Submit" value={'Participate' }  />
           </form>
        </div>
      </dialog>

</>
    );
};

export default Campdetails;