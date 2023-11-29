import AOS from 'aos';
import 'aos/dist/aos.css';

const Footer = () => {
AOS.init()

    return (
<div  className="w-full  mt-20 bg-no-repeat bg-cover bg-[url('https://wallpapercrafter.com/desktop1/506643-simple-simple-background-minimalism-blueprints.jpg')] " >
{/* <footer className="footer mt-10  bottom-0 p-10 bg-neutral text-neutral-content"> */}
<footer data-aos="fade-up" className="  h-auto md:flex justify-between gap-7 w-full px-5 md:px-20 pb-10 pt-20 bg-[#2d419b7a] cursor-pointer items-center text-neutral-content">
  
  <div className="-mt-10">
        <img className="w-[190px] " src="https://i.ibb.co/DMbjvDg/logou.png" alt="" />
        <p className="w-[360px] -mt-10">
        UnifiedCareNet: Revolutionizing healthcare collaboration. Connect with ease, prioritize wellness. Join us for a healthier, unified future.
        </p>
  </div> 

  <ul className="space-y-3">
    <header className="footer-title">Services</header> 
    <a className="block hover:text-rose-400 hover:underline">Branding</a>
    <a className="block hover:text-rose-400 hover:underline">Design</a>
    <a className="block hover:text-rose-400 hover:underline">Marketing</a>
    <a className="block hover:text-rose-400 hover:underline">Advertisement</a>
  </ul> 

  <ul className="space-y-3">
    <header className="footer-title">Company</header> 
    <a className="block hover:text-rose-400 hover:underline">About us</a>
    <a className="block hover:text-rose-400 hover:underline">Contact</a>
    <a className="block hover:text-rose-400 hover:underline">Jobs</a>
    <a className="block hover:text-rose-400 hover:underline">Press kit</a>
  </ul> 

   <ul className="space-y-3">
      <header className="footer-title">Legal</header> 
      <a className="block hover:text-rose-400 hover:underline">Terms of use</a>
      <a className="block hover:text-rose-400 hover:underline">Privacy policy</a>
      <a className="block hover:text-rose-400 hover:underline">Cookie policy</a>
    </ul>

</footer>
</div>
    );
};

export default Footer;