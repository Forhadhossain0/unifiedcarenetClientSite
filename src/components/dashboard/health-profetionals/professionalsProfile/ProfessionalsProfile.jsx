import  {useEffect, useState } from 'react';
import useAuth from '../../../custoomhooks/useAuth';
import { FaUserEdit } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { BiSolidSave } from "react-icons/bi";
import { LuContact } from "react-icons/lu";
import { IoCallOutline } from "react-icons/io5";
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../custoomhooks/useAxiosPublic';
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../custoomhooks/useAxiosSecure";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Helmet } from 'react-helmet';


const ProfessionalsProfile = () => {
  AOS.init()

  const [profileData, setProfileData] = useState({
    name: '',
    degree: '',
    certification: '',
    location: '',
    number: '',
    email: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const axiosPublic = useAxiosPublic()
  const {user} = useAuth();
  const photo = user?.photoURL;
  const primaryEmail = user?.email;



const axiosSecure = useAxiosSecure();
const {data:professionalsInterest}  = useQuery({
    queryKey:['professionalsInterest'],
    queryFn: async() =>{
        const res = await axiosSecure.get('/professionalsInterest')
        return res.data
    }
})  
console.log(professionalsInterest , 'professionalsInterest')



// sve button
  const handleSave = () => {

    if (checkForPostOrPatch) {
      axiosPublic.patch(`/ProfessionalsBio/${checkUserAuth?._id}`,{  name: profileData.name, degree: profileData.degree, certification: profileData.certification, location: profileData.location,
        number: profileData.number, email: profileData.email, primaryEmail: primaryEmail, photo: photo })
        .then(res => { 
          console.log(res);
          if (res?.data?.modifiedCount > 0) {
            Swal.fire({  icon: 'success', text: 'update your info', title: 'Saved' });
          } 
        })

    } else {
      axiosPublic.post('/ProfessionalsBio', {  name: profileData.name, degree: profileData.degree, certification: profileData.certification, location: profileData.location,
        number: profileData.number, email: profileData.email, primaryEmail: primaryEmail, photo: photo })
        .then(res => {
          console.log(res);
          if (res?.data?.insertedId) {
            Swal.fire({  icon: 'success', text: 'save your info', title: 'Saved' });
          }
        });
      }
      setIsEditing(false);
      window.location.reload();
  };
  

  const [data,setData] = useState([]);
  useEffect(()=>{
    axiosPublic.get('/professionalsBio')
    .then(res=>{
      // console.log(res)
      setData(res?.data)
    })
  },[axiosPublic])
  

  // console.log(data, 'data')  

  const checkUserAuth = data?.find(x=> x?.primaryEmail === user?.email); 
  const checkForPostOrPatch= checkUserAuth?.primaryEmail === user?.email;
  // console.log(checkUserAuth._id, '1')

 

  return (
    <div className=" h-full bg-white ">

    <Helmet><title>Unified || ProfessionalsProfile</title></Helmet>

      <div data-aos="fade-up"  data-aos-duration="3000" className="flex items-center justify-center mx-auto  w-full  p-20  ">
       
       <div>
        <img className='w-[300px]' src="https://img.freepik.com/free-vector/dots-gradient-arrow_78370-3010.jpg?w=740&t=st=1701351877~exp=1701352477~hmac=489b76306f13d7ea3e801ab0fa66dd37995d22c03310a11b82c6530ea264d3ce" alt="" />
       </div>
       
       
        <div className="relative  shadow-lg mx-auto h-[360px] w-[390px] bg-white">
        <div  className='absolute  right-[7rem] top-6'>
          
           {checkForPostOrPatch ? 
                                  isEditing  ?  <button onClick={handleSave} className="text-2xl hover:text-rose-500">  <BiSolidSave />  </button> 
                                             : <button onClick={() => setIsEditing(true)} className="text-2xl hover:text-rose-500"> <FaUserEdit /> </button>
                 
                 : null
            }           

         </div>
          <img  className="absolute left-[120px] rounded-full border-2 border-[#12ffff] h-[130px] w-[130px] -top-[70px]"  src={user?.photoURL || "https://media.istockphoto.com/id/885234758/vector/male-avatar-profile-picture-silhouette-light-shadow.jpg?s=170x170&k=20&c=JicnWZ37HVK1gaRfhacddrkdOlwl0b41SzUNVJYEGjY="}  alt="" />
          <div className="shadow  mx-auto ">
            <div className="mt-16  h-[375px]  font-semibold capitalize w-full">

              {isEditing ? (
                <div>
                    <input type="text"  defaultValue={checkUserAuth?.name } placeholder=' you full name'   required className="text-center capitalize  p-1 w-full"   onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}   />
                    <input type="text"  defaultValue={checkUserAuth?.certification} placeholder=' you certification'  required     className="text-center capitalize border-t-2  p-1 w-full"   onChange={(e) => setProfileData({ ...profileData, certification: e.target.value })}   />
                    <input type="text"  defaultValue={checkUserAuth?.degree }  placeholder=' you degrees'   required            className="text-center capitalize  border-t-2  p-1 w-full"   onChange={(e) => setProfileData({ ...profileData, degree: e.target.value })}   />
                  <div className='mt-5 w-full'>
                    <input type="text"  defaultValue={checkUserAuth?.location} placeholder=' your location'      required       className='p-7 border-t-2 capitalize border w-full'    onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}   />
                    <input type="number"defaultValue={checkUserAuth?.number}   placeholder=' your number'      required    className='p-7 border-t-2 border capitalize w-full'    onChange={(e) => setProfileData({ ...profileData, number: e.target.value })}   />
                  </div>
                    <input type="email" defaultValue={checkUserAuth?.email}    placeholder='business  email'       required     className='px-8 lowercase py-8 w-full  border text-center bg-teal-200'  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}  />
                </div>
              ) 
              
              : (
                <div>
                  <p className="text-center font-normal  pb-1 text-2xl">{checkUserAuth?.name || 'please enter your name' }</p>
                  <p className="text-center text-blue-500">{checkUserAuth?.certification || 'please enter your certification '}</p>
                  <p className="text-center text-amber-500" >{checkUserAuth?.degree ||  'please enter your degree ' }</p>
                  <div className="mt-5">
                    <p className="p-8 text-[16px] flex items-center gap-2 border-t"><CiLocationOn  className='text-2xl' ></CiLocationOn> {checkUserAuth?.location || 'please enter your location '}</p>
                    <p className="p-8 text-[16px] flex items-center gap-2 border-t"><IoCallOutline className='text-2xl' ></IoCallOutline>{checkUserAuth?.number || 'please enter your number' }</p>
                    <button className="px-8 py-9 shadow-2xl border mx-auto  flex w-full items-center gap-3 text-white justify-center lowercase bg-[#0de6a5]"><LuContact className='text-2xl'></LuContact>{checkUserAuth?.email || 'Enter Your@email.com'}  </button>
                  </div>
                </div>
              )}

            </div>
          </div>


        </div>
          <img className='w-[200px] h-[150px]' src="https://www.amgen.com/stories/2018/08/the-shape-of-drugs-to-come/-/media/Themes/Global/Global/Global/images/migration/stories/science/08-14-the-shape-of-drugs-to-come/Small-Molecules_2000x1000_64bit_whtbkgd.gif" alt="" />
          {/* <img className='w-[100px] h-[100px] rounded-full p-5 bg-[#3cffef75]' src="https://i.pinimg.com/originals/3d/ac/6f/3dac6f34d3c5d5451b6736e7a27af315.gif" alt="" /> */}

        </div>


        {/* /////////// */}

        <div className="w-[90%] my-10 mx-auto  border ">
        <div data-aos="fade-right"  data-aos-duration="3000" className=" bg-[white] mx-auto    pb-10">
            

            <div className="overflow-x-auto py-16 px-5">
            <table className="table">
                <thead className=" shadow h-16 text-teal-500 ">
                <tr className="uppercase">
                    <th>   <label>  <input type="checkbox" className="checkbox" /> </label>  </th>
                    <th>camp</th>
                    <th>campname</th>
                    <th>venuelocation</th>
                    <th>healthcareProfessionals</th>
                    <th>specializedservices</th>
                    <th>Professionals interrest</th>
                </tr>
                </thead>
                <tbody>

            {
                professionalsInterest?.map((professionalsInterest,index)=> 
                // console.log(professionalsInterest)
                    <tr key={professionalsInterest._id} className="text-teal-300 "> 
                    {/* {console.log(professionalsInterest.campData)} */}
                    <th> {index + 1}  </th>
                    <td><img className="font-bold" src={professionalsInterest?.campData?.image } /> </td>
                    <td><h1  className="font-bold">{professionalsInterest?.campData?.campname  }</h1> </td>
                    <td><h1  className="font-bold">{professionalsInterest?.campData?.venuelocation }</h1> </td>
                    <td><h1  className="font-bold">{professionalsInterest?.campData?.healthcareProfessionals   }</h1> </td>
                    <td><h1  className="font-bold">{professionalsInterest?.campData?.specializedservices }</h1> </td>
                    <td ><h1 className="font-bold  hover:bg-[#2bffbf] text-white rounded w-1/2 cursor-pointer bg-[#2bffbf] text-center flex justify-center border p-2"> {professionalsInterest.campData.interest} </h1> </td> 
                     
                   
                   
                </tr>
                             
            )}



                </tbody>
            </table>
            </div>


</div>
        </div>


    

   
    </div>
  );
};

export default ProfessionalsProfile;




  