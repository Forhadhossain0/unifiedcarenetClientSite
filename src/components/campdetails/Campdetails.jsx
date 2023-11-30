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
import { useEffect, useState } from "react";

const Campdetails = () => {

  const camp = useLoaderData();
  // console.log(camp)

  const {user} = useAuth()
  const email = user.email;
  const axiosSecure= useAxiosSecure()
 

  const {data:hasAllUsers}  = useQuery({
      queryKey:['hasAllUsers'],
      queryFn: async() =>{
          const res = await useAxiosSecure.get('/users')
          return res.data
      }
    }) 
    const nowUserEmail = hasAllUsers?.filter(x=> (x.email) === user?.email )
    const uRole = nowUserEmail?.find(x => x.role === 'perticipent') !== undefined;
    const pRole = nowUserEmail?.find(x => x.role === 'professionals') !== undefined;  
    
    let upcoming = '';
    if( camp?.camprole === 'upcoming'){ upcoming = 'on upcoming'}
    
    // normal user join button
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
  
  
  const [professionals,setProfessionals] = useState([]);
  useEffect(()=>{
    axiosSecure.get('/professionalsBio')
    .then(res=>{
      // console.log(res)
      setProfessionals(res?.data)
    })
  },[])
 
  const professionalsBio = professionals?.filter(x=> x.primaryEmail === user.email )
  console.log(professionalsBio)



  let interest = 'accept'
  const campData = {
           _id:camp._id, 
           campname:camp.campname, 
           campfee: camp.campfee,
           venuelocation:camp.venuelocation,
           description:camp.description,
           details:camp.details, 
           healthcareProfessionals:camp.healthcareProfessionals,
           specializedservices:camp.specializedservices,  
           targetaudience:camp.targetaudience, 
           scheduleddatetime:camp.scheduleddatetime, 
           image: camp.image,
           camprole: camp.camprole,
           participant: camp.participant,
           interest : interest,        
  }

 

  
// professional interest button
  const handleProfessionalsInterest= (id)=>{
    console.log(id)

    Swal.fire({
      title: "Are you interested on this camp?",
      text: "You won't be able to retrun this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, want to join !"
    }).then( async(result) => {
      if (result.isConfirmed){ 
        
        
        axiosSecure.post('/professionalsInterest',{campData,professionalsBio})
        .then(res=> {
          if(res?.data?.insertedId){
            console.log(res?.data.insertedId, 'posted completed')
          }
          
          // patch to camp collection 
        let professionals = 0;
        axiosSecure.patch(`/camp/professionalsCount/${id}`,  { professionals: parseFloat(professionals) }) 
        .then(res=> {console.log(res?.data, 'professionalsCountPatch')})
        })
         
      }

    })

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
                <div className="flex gap-2  items-center mt-2">
                  <p className="capitalize underline text-blue-500 font-semibold">Total professionals:</p>
                  <h3 className="capitalize "> {camp?.professionals || 0}</h3>
                </div>
            
                { uRole &&   <button onClick={()=>{document.getElementById('my_modal_3').showModal()}} 
                   className={ " w-56 text-center mx-auto btn mt-4  hover:bg-transparent hover:border-2 hover:text-rose-500 btn-info hover:border-rose-500 border-rose-500 bg-rose-500 text-white rounded uppercase "} >
                   JOIN CAMPIGION </button>
                }
                
                { pRole &&   <button onClick={()=>{handleProfessionalsInterest(camp?._id)}} 
                   className={ " w-70 text-center mx-auto btn mt-4  hover:bg-transparent hover:border-2 hover:text-rose-500 btn-info hover:border-rose-500 border-rose-500 bg-rose-500 text-white rounded uppercase "} >
                   interested  {upcoming} camp </button>
                }
          
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