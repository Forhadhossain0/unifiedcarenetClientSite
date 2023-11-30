import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import '../../../index.css'
import { FaRegArrowAltCircleRight } from "react-icons/fa"
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';


const Banner = () => {

   AOS.init();
   
    return (

        <div className=' h-[100vh] w-full'>

            <Carousel autoPlay={'true'} >

                <div  className="h-[90vh] ">
                    <img className="h-full" src="https://img.freepik.com/free-photo/african-american-doctor-senior-man-communicating-hospital-waiting-room-while-wearing-face-masks_637285-11252.jpg?w=740&t=st=1700835026~exp=1700835626~hmac=b39cd77ae8c7e7fbf64fb3ce4053ebd30878b2208e7600c0b8ea71538dce4ee0" />
                    <div data-aos="fade-right" className="absolute  bg-[rgb(0,0,0,0.40)] top-0 flex justify-center w-full items-center h-full">
                       <div className="space-y-3 mt-2">
                       <h2 data-aos="fade-left" className=" md:text-6xl text-xl uppercase font-bold text-white">Unified<span className="text-red-500">+</span>CareNet</h2>
                          <p data-aos="fade-right" className="md:text-lg mx-auto pb-5 md:w-1/2 text-white">get help and give us your problems to be a happy life, Our professional team will take care of you, we value your time and health.  </p>
                          <Link data-aos="fade-left"  data-aos-duration="3000" to={'/contact'}> <button className="btn rounded md:h-[53px] md:px-10 text-white capitalize  font-semibold  btn-info md:mx-5 mx-2  gap-1">Get in touch <FaRegArrowAltCircleRight /> </button> </Link>
                          <Link data-aos="fade-right"  data-aos-duration="3000"  to={'/availablecamp'}> <button className="btn rounded md:h-[53px] md:px-10  bg-white border-none  font-semibold capitalize btn-info md:mx-5 mx-2 ">Read more +</button></Link>
                       </div>
                    </div>
                </div>

                <div   data-aos-duration="3000" className="h-[90vh] ">
                    <img  className="h-full" src="https://img.freepik.com/free-photo/pediatrician-doctor-nurse-sitting-desk-medical-office-talking-with-child-healthcare-practitioner-specialist-medicine-providing-professional-radiographic-treatment-hospital-clinic_482257-6769.jpg?w=740&t=st=1700834925~exp=1700835525~hmac=26b8bc69fc153be4190478c502d0284d7ec66cd1dc92c1c1efe4ab0ee98c1558" />
                    <div data-aos="fade-right" className="absolute  bg-[rgb(0,0,0,0.40)] top-0 flex justify-center w-full items-center h-full"> 
                    <div className="space-y-3 mt-2">
                       <h2 className=" text-6xl uppercase font-bold text-white">Unified<span className="text-red-500">+</span>CareNet</h2>
                          <p className="text-lg mx-auto pb-5 md:w-1/2 text-white">get help and give us your problems to be a happy life, Our professional team will take care of you, we value your time and health.  </p>
                          <Link to={'/contact'}> <button className="btn rounded h-[53px] px-10 text-white capitalize  font-semibold  btn-info mx-5 ">  Get in touch <FaRegArrowAltCircleRight /> </button> </Link>
                          <Link to={'/availablecamp'}>  <button className="btn rounded h-[53px] px-10  bg-white border-none  font-semibold capitalize btn-info mx-5 ">Read more +</button></Link>
                       </div>
                    </div>
                </div> 

                <div  data-aos-duration="3000" className="h-[90vh]">
                    <img  className="h-full" src="https://img.freepik.com/free-photo/young-handsome-physician-medical-robe-with-stethoscope_1303-17818.jpg?w=740&t=st=1700834192~exp=1700834792~hmac=52fbaf7fdfbcef1b70153a2276aab6365676e186df837aca9386a9d6bb169db3" />
                    <div data-aos="fade-right"  className="absolute  bg-[rgb(0,0,0,0.40)] top-0 flex justify-center w-full items-center h-full">
                    <div className="space-y-3 mt-2">
                       <h2 className=" text-6xl uppercase font-bold text-white">Unified<span className="text-red-500">+</span>CareNet</h2>
                          <p className="text-lg mx-auto pb-5 md:w-1/2 text-white">get help and give us your problems to be a happy life, Our professional team will take care of you, we value your time and health.  </p>
                          <Link to={'/contact'}><button className="btn rounded h-[53px] px-10 text-white capitalize  font-semibold  btn-info mx-5 ">Get in touch <FaRegArrowAltCircleRight /> </button></Link>
                          <Link to={'/availablecamp'}>  <button className="btn rounded h-[53px] px-10  bg-white border-none  font-semibold capitalize btn-info mx-5 ">Read more +</button></Link>
                       </div>
                    </div>
                </div>

                <div data-aos="fade-right"  data-aos-duration="3000" className="h-[90vh] ">
                    <img  className="h-full" src="https://img.freepik.com/free-photo/group-happy-diverse-volunteers_53876-25121.jpg?w=740&t=st=1700834770~exp=1700835370~hmac=c13051afc3eed873dae5e9b7de394597ff40d71bd635f4ce1c5341f6f4383c9f" />
                    <div data-aos="fade-right"  className="absolute  bg-[rgb(0,0,0,0.40)] top-0 flex justify-center w-full items-center h-full">
                    <div className="space-y-3 mt-2">
                       <h2 className=" text-6xl uppercase font-bold text-white">Unified<span className="text-red-500">+</span>CareNet</h2>
                          <p className="text-lg mx-auto pb-5 md:w-1/2 text-white">get help and give us your problems to be a happy life, Our professional team will take care of you, we value your time and health.  </p>
                          <Link to={'/contact'}> <button className="btn rounded h-[53px] px-10 text-white capitalize  font-semibold  btn-info mx-5 ">Get in touch <FaRegArrowAltCircleRight /> </button> </Link>
                          <Link to={'/availablecamp'}>  <button className="btn rounded h-[53px] px-10  bg-white border-none  font-semibold capitalize btn-info mx-5 ">Read more +</button></Link>
                       </div>
                    </div>
                </div>

                <div  data-aos-duration="3000" className="h-[90vh] relative   w-full">
                    <img data-aos="fade-right"  data-aos-duration="3000" className="h-full" src="https://img.freepik.com/free-photo/team-young-specialist-doctors-standing-corridor-hospital_1303-21199.jpg?w=740&t=st=1700833169~exp=1700833769~hmac=d7d95cfec64727db4ff495d6120d4149fa491dd54a576cf886f4f203363c2018" />
                    <div className="absolute  bg-[rgb(0,0,0,0.40)] top-0 flex justify-center w-full items-center h-full">
                    <div className="space-y-3 mt-2">
                       <h2 className=" text-6xl uppercase font-bold text-white">Unified<span className="text-red-500">+</span>CareNet</h2>
                          <p className="text-lg mx-auto pb-5 md:w-1/2 text-white">get help and give us your problems to be a happy life, Our professional team will take care of you, we value your time and health.  </p>
                          <Link to={'/contact'}>   <button className="btn rounded h-[53px] px-10 text-white capitalize  font-semibold  btn-info mx-5 ">Get in touch  <FaRegArrowAltCircleRight /></button></Link>
                          <Link to={'/availablecamp'}>   <button className="btn rounded h-[53px] px-10  bg-white border-none  font-semibold capitalize btn-info mx-5 ">Read more +</button></Link>
                       </div>
                    </div>
                </div>
            </Carousel>

        </div>
    );
};

export default Banner;