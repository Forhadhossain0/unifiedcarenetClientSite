import { useEffect, useState } from "react";
import useAxiosPublic from "../custoomhooks/useAxiosPublic";
import { Link } from "react-router-dom";
import { FcServices } from "react-icons/fc";
import { FaPeopleArrows } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineAccessTime } from "react-icons/md";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Helmet } from "react-helmet";

const AvailableCamp = () => {


    const axiosPublic = useAxiosPublic()
    const [camp,setCamp] = useState()
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc'); 


    useEffect(()=>{
        axiosPublic.get('/camp')
        .then(res=>{
            setCamp(res.data)
        })
    },[])
    console.log(camp)


    const handleSearch = (e) => {
      setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredAndSortedCamp = camp?.filter((camp) => camp.campname.toLowerCase().includes(searchTerm))
    .sort((a, b) => {
        const nameA = a.campname.toLowerCase();
        const nameB = b.campname.toLowerCase();

        return sortOrder === 'asc' ? nameA?.localeCompare(nameB) : nameB?.localeCompare(nameA);
    });





  const handleSort = () => {
    const sortedCamp = [...camp]?.sort((a, b) => {
        const nameA = a?.campname?.toLowerCase();
        const nameB = b?.campname?.toLowerCase();

        if (sortOrder === 'asc') {
            return nameA.localeCompare(nameB);
        } else {
            return nameB.localeCompare(nameA);
        }
    });

    setCamp(sortedCamp);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
};

  
AOS.init()
    return (
        <>
        <Helmet><title>Unified || AvailableCamp</title></Helmet>

        <div className=" bg-cover bg-center bg-[url('https://img.pikbest.com/backgrounds/20190627/blue-pills-simple-medical-banner-background_1896626.jpg!bw700')] ">
          <div className="bg-[#75cbd69f] pt-24 h-80 w-full flex items-center ">
            <div>
            <h1 className=" md:pl-20 pl-5 my-auto font-bold text-[#1d1d1d] ">Home/Available-Campaign</h1>
             <h1 className="text-2xl md:w-[60%] md:pl-20 pt-4 pl-5 my-auto font-semibold text-white  ">Our all Campaign list and services available here . . . </h1>
           </div>
          </div>
        </div>

             <h2 className="pb-2 pt-20 uppercase font-bold text-center text-3xl text-blue-400  ">Available  Camp</h2>
             <p className="pb-10 text-rose-400 capitalize text-center mx-auto w-1/2">explore more to get and Joined us we are always with around you ⭐</p>

  {/* seerch and sort field and button */}
    <div className="flex px-10 mx-auto">
      <input type="text"  placeholder="Search by Camp Name"  value={searchTerm} onChange={handleSearch} className="border rounded p-2 m-2" />
      <button onClick={handleSort} className="border px-4 hover:text-rose-400 text-teal-500 font-serif py-2 m-2">  sort by campname {sortOrder === 'asc' ? 'a-z' : 'z-a'} </button>
    </div>

    {/* camps */}

       <div className="grid grid-cols-1 md:grid-cols-3 p-10 gap-7">
       {filteredAndSortedCamp?.map(camp=>
            <div data-aos="fade-up" key={camp._id} className="shadow p-2 ">
                <div className="relative ">
                 <img className=" " src={camp.image} alt="" /> 
                 <div className=" bg-[rgba(0,0,0,0.51)] hover:bg-transparent transition-all flex items-center w-full h-full  pl-5  absolute bottom-0">
                      <h3 data-aos="fade-right" className="md:w-[90%] text-4xl font-bold text-white ">{camp.campname}</h3>
                </div>
                 <div data-aos="fade-left"  data-aos-duration='2000' className=" justify-between  font-bold  bg-[rgba(47,119,97,0.6)]  flex items-end w-full h-20   absolute bottom-0">
                      <div className="pl-2 py-3 ">
                       <h3 className="text-sky-400 flex items-center text-sm "><IoLocationOutline></IoLocationOutline> {camp.venuelocation} </h3>
                       <h3 className="underline text-white">Join Us : ${camp.campfee} Camp Fee</h3>
                      </div>
                      <h3 className="bg-cyan-300 rounded-tl-full p-3 text-sm   text-black shadow flex items-center gap-2"><MdOutlineAccessTime></MdOutlineAccessTime>{camp.scheduleddatetime}</h3>
                </div>
                </div>

                <h3 data-aos="zome-in-up" className="text-lg text-justify py-3">{camp.description}</h3>

                <div data-aos="fade-right">
                  <p className="capitalize mt-2 text-xl flex gap-2 items-center font-semibold"><FcServices></FcServices> specialized services :</p>
                 <h3 className="capitalize text-lg"> {camp.specializedservices}</h3>
                </div>

                <div data-aos="fade-left">
                  <p className="capitalize mt-2 text-xl  flex gap-2 items-center font-semibold"><FaUserDoctor></FaUserDoctor>  our healthcare Professionals :</p>
                 <h3 className="capitalize text-lg"> {camp.healthcareProfessionals}({camp?.professionals || 0})</h3>
                </div>

                <div data-aos="fade-right" className="flex  items-start justify-between mt-2">
                  <div className="flex items-center  gap-2">
                  <p className="capitalize underline text-blue-500 font-semibold">Total peticipent:</p>
                  <h3 className="capitalize "> {camp?.participant || 0}</h3>
                  </div>
                  
                <div data-aos="fade-left" className="pr-3">
                  {/* <p className="capitalize flex gap-2 items-center font-semibold"><FaPeopleArrows className="text-blue-500 "></FaPeopleArrows>target audience</p> */}
                 <h3 className="capitalize flex gap-2 items-center text-right font-serif "> <FaPeopleArrows className="text-blue-500 "></FaPeopleArrows> [{camp.targetaudience} years old]</h3>
                </div>

                </div>

              <Link to={`/campdetails/${camp._id}`}><button className="text-center mx-auto btn mt-2 mb-5  hover:bg-transparent hover:border hover:text-accent btn-info text-white rounded uppercase ">KNOW MORE</button></Link>
          
            </div>

        )}
       </div>
    


        </>

    );
};

export default AvailableCamp;