import { FaFacebook, FaLinkedinIn,FaTwitter,FaInstagram , FaYoutube,  FaPhoneAlt} from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import AOS from 'aos';
import 'aos/dist/aos.css';
const Shortnavbar = () => {
AOS.init()
    
 return (
  <div className="flex justify-between bg-white items-center md:px-16 px-3 py-3 ">    
  <div data-aos="fade-right" data-aos-duration='3000' className='flex justify-between gap-3 items-center text-blue-400'>
    <FaFacebook></FaFacebook>   <FaInstagram></FaInstagram> <FaTwitter></FaTwitter>  <FaLinkedinIn></FaLinkedinIn>  <FaYoutube></FaYoutube>
  </div>
  <div data-aos="fade-left" data-aos-duration='3000' className='flex justify-between gap-3 items-center text-blue-400'>
     <span className='gap-2 flex items-center'><IoLocationOutline></IoLocationOutline> Dhaka,Bangladesh  </span>
     <span className='gap-2 flex items-center'><FaPhoneAlt ></FaPhoneAlt> 01601424000  </span>
  </div>
</div>
    );
};

export default Shortnavbar;