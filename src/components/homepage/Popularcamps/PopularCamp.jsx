import { useEffect, useState } from "react";
import useAxiosPublic from "../../custoomhooks/useAxiosPublic";
import { Link } from "react-router-dom";
import { FcServices } from "react-icons/fc";
import { FaPeopleArrows } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineAccessTime } from "react-icons/md";
import AOS from 'aos';
import 'aos/dist/aos.css';


const PopularCamp = () => {
  AOS.init();


    const axiosPublic = useAxiosPublic()
    const [camp,setCamp] = useState()

    useEffect(()=>{
        axiosPublic.get('/camp')
        .then(res=>{
            setCamp(res?.data)
        })
    },[])

    const popularCamps = camp?.filter(x=> x?.camprole === 'released')

    // console.log(camp)

    // const filterCamps = camp?.filter(x=> console.log(x?.participant))

    return (
        <div className=" "  >
        <div>
             <h2 data-aos="flip-right"   data-aos-duration="3000"  className="pb-5 pt-28 uppercase font-serif font-bold text-center text-2xl text-blue-400  ">OUR MOST Popular camp </h2>
        </div>


       <div className="grid grid-cols-1 w-full md:w-[90%] mx-auto md:grid-cols-2 md:px-10 py-10 md:gap-16 gap-y-10 ">
       {popularCamps?.sort((a, b) => b?.participant - a?.participant).slice(0,6)?.map(camp=>
            <div data-aos="fade-up"    key={camp._id} className="w-full shadow p-10" >
                <div className="relative w-full ">
                 <img className="w-full h-[300px]" src={camp.image} alt="" /> 
                 <div className=" bg-[rgba(0,0,0,0.51)] hover:bg-transparent transition-all flex items-center w-full h-full  pl-10  absolute bottom-0">
                      <h3 data-aos="fade-up-left" className="md:w-[70%] md:text-4xl text-xl font-bold text-white ">{camp.campname}</h3>
                </div>
                 <div data-aos="fade-up-right" className=" justify-between  font-bold  bg-[rgba(47,119,97,0.6)]  flex items-end w-full h-20   absolute bottom-0">
                      <div className="md:px-5 py-3 ">
                       <h3 className="text-sky-400 flex items-center ">Location : <IoLocationOutline></IoLocationOutline> {camp.venuelocation} </h3>
                       <h3 className="underline text-white">Join Us : ${camp.campfee} Camp Fee</h3>
                      </div>
                      <h3 className=" bg-sky-500 px-3 rounded-tl-full absolute bottom-0 right-0  text-black shadow flex items-center gap-2"><MdOutlineAccessTime></MdOutlineAccessTime>{camp.scheduleddatetime}</h3>
                </div>
                </div>

                <h3 data-aos="fade-down" className="md:text-lg text-justify py-3">{camp.description}</h3>

                <div data-aos="fade-left">
                  <p className="capitalize  flex gap-2 items-center font-semibold"><FaPeopleArrows className="text-blue-500 "></FaPeopleArrows>target audience :</p>
                  <h3 className="capitalize"> {camp.targetaudience} years old</h3>
                </div>

                <div data-aos="fade-left">
                  <p className="capitalize mt-2  flex gap-2 items-center font-semibold"><FcServices></FcServices> specialized services :</p>
                 <h3 className="capitalize "> {camp.specializedservices}</h3>
                </div>

                <div data-aos="fade-right">
                  <p className="capitalize mt-2   flex gap-2 items-center font-semibold"><FaUserDoctor></FaUserDoctor>  our healthcare Professionals :</p>
                 <h3 className="capitalize "> {camp.healthcareProfessionals}({camp?.professionals || 0})</h3>
                </div>

                <div  className="flex justify-between items-end ">
                   <div>
                   <div data-aos="fade-down-left" className="flex gap-2  items-center mt-2">
                        <p className="capitalize underline text-blue-500 font-semibold">Total peticipent:</p>
                        <h3 className="capitalize ">{camp?.participant || 0}</h3>
                     </div>
                      <div data-aos="fade-down-left" className="flex gap-2  items-center mt-2">
                        <p className="capitalize underline text-blue-500 font-semibold">Total professionals:</p>
                        <h3 className="capitalize ">{camp?.professionals || 0}</h3>
                     </div>
                   </div>

                   <Link data-aos="fade-down-left" to={`/campdetails/${camp._id}`}><button  className="text-center rounded mx-auto btn mt-3 bg-transparent hover:border text-accent btn-accent hover:text-white  uppercase ">KNOW MORE CAMP</button></Link>
                 </div>

            </div>

        )}
       </div>
    

      <Link to={'/availablecamp'}><button className="text-center mx-auto btn flex justify-center w-40 h-10 text-lg hover:bg-transparent hover:border hover:text-accent btn-accent text-white rounded uppercase ">see all</button></Link>

        </div>
    );
};

export default PopularCamp;


