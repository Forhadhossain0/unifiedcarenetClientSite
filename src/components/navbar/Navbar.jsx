import { useEffect, useState } from 'react';
import { MdLogout } from "react-icons/md";
import { Link, NavLink, useLocation, useNavigate,  } from 'react-router-dom';
import { MdOutlineDashboard } from "react-icons/md";
import { FaBandcamp } from "react-icons/fa6";
import { MdContacts } from "react-icons/md";
import { ImHome } from "react-icons/im";
import Shortnavbar from './Shortnavbar';
import useAuth from '../custoomhooks/useAuth';
import auth from '../firebase/firebase.config';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../custoomhooks/useAxiosSecure';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Navbar = () => {
AOS.init();

  const location = useLocation();
  const navigate = useNavigate()
  const {user,logoutUser} = useAuth()
  const axiosSecure = useAxiosSecure()
  

  const handleLogout=()=>{
    logoutUser(auth)
    .then(res=> {navigate('/login') ; console.log('user logedout ',res)})
  }

  const {data:hasAllUsers}  = useQuery({
    queryKey:['hasAllUsers'],
    queryFn: async() =>{
        const res = await axiosSecure.get('/users')
        return res.data
    }
  }) 

  const use = hasAllUsers?.filter(x=> (x.email) === user?.email )
  const uRole = use?.find(x => x.role === 'perticipent') !== undefined;
  const oRole = use?.find(x => x.role === 'organizer') !== undefined;
  const pRole = use?.find(x => x.role === 'professionals') !== undefined;  
  console.log(uRole)



// scroll functionality 
  const [scrolled, setScrolled] = useState(false);
  const handleScroll = () => {
    const scrollY = window.scrollY;
    const scrollhold = 100;

    if (scrollY > scrollhold) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const navbarClass = `navbar h-[70px] font-serif top-0  md:px-10 z-20 text-white    ${
    scrolled ? 'bg-[#25ccffcc]   text-white fixed w-full' : location.pathname === '/' ? ' absolute top-12  h-[85px] bg-[#25ccffcc]  ' : " bg-[#25ccffcc] absolute top-0 py-5  "}
  } `;



const links = <>
{user && <img className=' md:hidden cursor-pointer flex w-12 h-12 p-[2px] rounded-full border-2 border-blue-500  ml-4 ' src={user?.photoURL || 'https://thinksport.com.au/wp-content/uploads/2020/01/avatar-.jpg'} alt="" />}
<NavLink to={'/'}><li><a className='uppercase hover:bg-transparent hover:text-[#25ccff] flex gap-1 items-center'> <ImHome/> Home</a></li></NavLink>
<NavLink to={'/availablecamp'}><li><a className='uppercase hover:bg-transparent  hover:text-[#25ccff] flex gap-1'> <FaBandcamp/> Available Camps</a></li></NavLink>
<NavLink  to={'/contact'}  ><li><a  className='uppercase hover:bg-transparent hover:text-[#25ccff] flex gap-1'> <MdContacts/> Contact Us</a></li></NavLink>

{ uRole && <NavLink to={'/dashboard/userHome'}><li><a className='uppercase hover:bg-transparent hover:text-[#25ccff] flex gap-1'> <MdOutlineDashboard/> Dashboard</a></li></NavLink>
}
{ oRole &&  <NavLink to={'/dashboard/orgHome'}><li><a className='uppercase hover:bg-transparent hover:text-[#25ccff] flex gap-1'> <MdOutlineDashboard/> Dashboard</a></li></NavLink>
 }
{ pRole && <NavLink to={'/dashboard/proHome'}><li><a className='uppercase hover:bg-transparent hover:text-[#25ccff] flex gap-1'> <MdOutlineDashboard/> Dashboard</a></li></NavLink>
}

{user && user ?   <>
                  <Link  onClick={handleLogout}  ><li><a className='uppercase hover:bg-transparent flex gap-2 hover:text-[#25ccff]'>Logout <MdLogout/></a></li></Link>
                  <img className='md:flex hidden  w-8 h-8 rounded-full border-2  border-rose-400 hover:border-black  ' src={user?.photoURL ||'https://thinksport.com.au/wp-content/uploads/2020/01/avatar-.jpg'} alt="" />
                  </>
               : <NavLink to={'/login'}><li><a className='uppercase  hover:bg-transparent  hover:text-[#25ccff]'>Login</a></li></NavLink>
}

</>


return (
<div  >
{location.pathname === '/' && <Shortnavbar />}

{/* main section */}
<div className={navbarClass}>

{/* menubar */}
<div className="drawer navbar-start md:hidden">
  <input id="my-drawer" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    <label htmlFor="my-drawer" className="drawer-button cursor-pointer hover:text-green-400 "> 
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block  w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
    </label>
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu p-4 w-80 min-h-full space-y-4 bg-base-200 text-base-content">
      { links }
    </ul>
  </div>
</div>


{/* logo */}
<div data-aos="fade-left"  data-aos-duration="3000"
    className=" md:navbar-start navbar-end  flex gap-2 cursor-pointer  ">
    <img className=' h-auto lg:w-[40%] w-[160px]  ' src="https://i.ibb.co/DMbjvDg/logou.png" alt="logo" />
</div>

{/* end */}
<div className="navbar-end hidden md:flex   w-full cursor-pointer">
  <ul className="menu  space-x-3   menu-horizontal  ">
    { links  }
  </ul>

</div>  

</div>


</div>
    );
};

export default Navbar;