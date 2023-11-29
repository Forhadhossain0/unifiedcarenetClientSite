import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { AiFillLike } from "react-icons/ai";
import useAxiosPublic from '../../custoomhooks/useAxiosPublic';
import AOS from 'aos';
import 'aos/dist/aos.css';


const UpcommingCamp = () => {
    AOS.init()

    const axiosPublic = useAxiosPublic()
    const [camp,setCamp] = useState()

    useEffect(()=>{
        axiosPublic.get('/camp')
        .then(res=>{
            setCamp(res.data)
        })
    },[axiosPublic])

    const UpcommingCamps = camp?.filter(x=> x?.camprole === 'upcoming')

    console.log(camp)

 return (
 <>
 <div className='pt-10 mx-[10px] mb-10  md:mx-[10%] h-[100vh]  '> 
        <h1 className='text-rose-600 w-80 border-b-4 font-serif font-bold mb-3 text-2xl mx-auto text-center'>Upcomming Campaign</h1>

  <div className='py-10 h-[100vh]  relative'>
           
   <Swiper data-aos="fade-left" slidesPerView={3} spaceBetween={30}   centeredSlides={false} autoPlay={'true'}
           pagination={{ clickable: true, }}  modules={[Pagination]}    className="mySwiper  " >

           {
            UpcommingCamps?.map(camps => 
                <SwiperSlide  key={camps._id} className='h-[60vh]  w-[600px]'>
                    <img className='relative h-[60vh]  w-full' src={camps?.image} alt="" />
                    <h2 data-aos="fade-down-right"  data-aos-duration="3000" className='absolute w-full h-1/2 hover:h-full transition-all p-10 bottom-0 font-serif  uppercase  bg-[#3b333370]  text-white  '>{camps.campname}</h2>
                </SwiperSlide>
                
           )}
      </Swiper>
    </div>
  </div>


        <section className='h-[80vh] relative flex justify-center mx-auto w-[80%]'>
            <img className='h-full w-full ' src="https://plus.unsplash.com/premium_photo-1661281397737-9b5d75b52beb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fG1lZGljYWwlMjB0ZWFtfGVufDB8fDB8fHww" alt="" />

            <div className='absolute  bg-[#76c3da7e] w-full h-full md:px-36 px-5 text-center items-center z-10 flex justify-center mx-auto'>
                <div className='text-white'>
                  <h2 data-aos="fade-down" className='mx-auto text-xl md:text-5xl font-bold p-5 font-serif'>UNIFIED<span className='text-red-600'>+</span>CARENET</h2>
                  <p data-aos="fade-right" className='mx-auto text-center md:font-bold'>campaign offers invaluable benefits to communities, fostering well-being and healthcare accessibility. By raising awareness and funds, these campaigns empower individuals to receive essential medical services, medications, and treatments. </p>
                  <p data-aos="fade-left"   className='md:text-7xl text-3xl flex hover:text-white text-rose-600 transition-all pt-7 p-5 mt-3 w-24  md:w-32 h-24 md:h-32 mx-auto rounded-full bg-[#41f3dba8]  justify-center'><AiFillLike data-aos="fade-down-right"  data-aos-duration="3000" ></AiFillLike></p>
                </div>
            </div>
        </section>

        </>
    );
};

export default UpcommingCamp;