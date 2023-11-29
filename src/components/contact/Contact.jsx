import { MdOutlineMail } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Contact = () => {
    AOS.init()
    return (
        <div className="h-auto  w-full   ">


                <div>
                    <div data-aos="fade-up" data-aos-duration='2000' className="flex pt-20 px-20 justify-between bg-no-repeat bg-cover bg-[url('https://img.freepik.com/premium-photo/portrait-beautiful-young-woman-with-blond-hair-medical-uniformgenerative-ai_221128-8819.jpg?w=826')]  items-center">
                        <div className="md:p-20 text-white p-5 space-y-2 md:w-[50%]">
                            <p  data-aos="fade-right"  data-aos-duration='2000'className="font-semibold text-teal-500">Home/Contact</p>
                            <h1 data-aos="fade-right"  data-aos-duration='2000' className="md:text-5xl  md:leading-relaxed font-bold uppercase ">A Great Place to Receive Care</h1>
                            <h4 data-aos="fade-right"  data-aos-duration='2000' className="font-semibold">Get your best looking smile now!</h4>
                            <div data-aos="fade-left"  data-aos-duration='2000' className="flex gap-5">
                                <button className="btn btn-primary border-white text-teal-500 h-12 hover:text-white bg-white rounded px-5 font-semibold">Learn More</button>
                                <button className="btn btn-primary border border-white bg-transparent  rounded text-white h-12 px-5 font-semibold">What New?</button>
                            </div>
                        </div>
                        <div className="w-[40%]">
                         <img  data-aos="fade-left"  data-aos-duration='2000' className="w-[80%]  rounded bg-[#c1cccf56]  h-full" src="https://i.ibb.co/DwYd6wh/contact.png" alt="" />
                         {/* <img className="w-full p-5 rounded bg-[#aae5f746] h-full" src="https://img.freepik.com/premium-photo/male-doctor-light-surface_392895-24691.jpg?w=360" alt="" /> */}
                        </div>
                    </div>
                </div>


        <section className="md:flex bg-right bg-contain  bg-no-repeat  gap-20 justify-between p-20  items-center h-full w-full">

         <div className=" w-full ">

               
              <form className="md:w-[60%] w-full pt-7 mx-auto flex justify-center mb-3" >
                
                  <div className="mx-auto w-full font-semibold space-y-4 ">

                 <div   data-aos="fade-right"  data-aos-duration='2000' className="pb-3 ">
                  <h1 className="font-bold mx-auto text-3xl text-teal-500 py-1  ">Get in touch </h1>
                  <p className="font-semibold text-lg">We are here for you! How can we help?</p>
                 </div>
                    
                 <div  data-aos="fade-right"   >
                  <label htmlFor="">Name</label>
                  <input className="w-full rounded-lg border p-2 mt-1 outline-none " type="text" />
                 </div>
                
                 <div   >
                 <label htmlFor="">Email</label>
                 <input className="w-full rounded-lg border p-2 mt-1 outline-none " type="email"  />
                 </div>
               
                 <div  data-aos="fade-right"  >
                  <label htmlFor="">Message</label>
                  <input className="w-full rounded-lg border px-4 py-5 mt-1 outline-none " type="password"  />
                 </div>

                 <div  data-aos="fade-right"  >
                  <input className="w-full  border-none bg-teal-500 p-3 text-white rounded-lg mt-5 outline-none " type="submit" value={'SUBMIT'} />
                 </div>

               </div>
            </form>
         </div>
   
        <div className=" w-[80%] mx-auto p-5  relative ">
         <img  data-aos="fade-left"  data-aos-duration='2000' className="w-[82%] h-full " src="https://i.ibb.co/McWdy1Z/Contact-us-amico-1.png" alt="" />
         <div  data-aos="fade-left"  data-aos-duration='2000' className="p-5 font-semibold space-y-3">
            <p className="flex items-center gap-2 ">  <CiLocationOn  className="text-[#BA68CB] font-bold" ></CiLocationOn> 1205 Dhaka Bangladesh</p>
            <p className="flex items-center gap-2 ">  <IoCallOutline className="text-[#BA68CB]" ></IoCallOutline> +016 0142 4000</p>
            <p className="flex items-center gap-2 ">  <MdOutlineMail className="text-[#BA68CB]" ></MdOutlineMail>  forhadhossainopc@gmail.com</p>
         </div>
       </div>
   
   
    </section>
    
   </div>
    );
};

export default Contact;