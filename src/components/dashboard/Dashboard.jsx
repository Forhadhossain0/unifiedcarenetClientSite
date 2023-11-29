import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { GoHome } from "react-icons/go";
import { FaTachometerAlt } from "react-icons/fa";
import { IoIosWallet } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import { FaCalendarAlt, FaBook} from "react-icons/fa";
import { RiPlayListAddFill } from "react-icons/ri"
import { PiUsersThreeFill } from "react-icons/pi";
import { IoIosListBox } from "react-icons/io";
import { BiBook } from "react-icons/bi";
import { MdFeedback } from "react-icons/md";
import useProfessional from "../custoomhooks/useProfessional";
import useOrganizer from "../custoomhooks/useOrganizer";
import useAuth from "../custoomhooks/useAuth";
import auth from "../firebase/firebase.config";
import Swal from "sweetalert2";




const Dashboard = () => {

  const {logoutUser} = useAuth()
  const navigate = useNavigate()

  const handleLogout=()=>{
    Swal.fire({
      title: "Are you sure?",
      text: "you will  log out from there!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!"
    }).then((result) => {
      if (result.isConfirmed) {
        logoutUser(auth)
       .then(res=> {navigate('/login') ; console.log('user logedout ',res)})
      }
    })
  }



  const [isProfessionals] = useProfessional();
  const [isOrganizer] = useOrganizer();

  // if(isOrganizerLoading || isProfessionalsLoading){
  //   return <div className="my-40 flex justify-center ">
  //           <span  className="loading-dots loading  p-6 text-rose-400  "></span>
  //           <span  className="loading-dots loading  p-6 text-lime-400 "></span>
  //          </div>
  // }

return (

<div className="flex w-[100%] bg-[#f2f2f2] ">

    {/* side bar */}
        <div className=" h-[150vh] md:w-[18%]">
          <ul  className={` menu px-4 pt-10 h-[150vh] md:w-[18%] fixed z-50 text-white text-[16px] capitalize space-y-3  shadow  bg-[#1c6880]    font-semibold `}>
           
          
          { isOrganizer   ? <> 
                        <NavLink to={'/dashboard/orgHome'}><li><a className='  hover:text-[#ffffff]'><FaTachometerAlt />Organizer profile</a></li></NavLink>
                        <NavLink to={'/dashboard/orgAddcamp'}><li><a className='  hover:text-[#ffffff]'><RiPlayListAddFill />Add Camp </a></li></NavLink> 
                        <NavLink to={'/dashboard/orgManagecamp'}><li><a className='  hover:text-[#ffffff]'><BiBook />Manage Camps</a></li></NavLink> 
                        <NavLink to={'/dashboard/orgManageRegisterdCamp'}><li><a className='  hover:text-[#ffffff]'><IoIosListBox />Registered Camps</a></li></NavLink> 
                        <NavLink to={'/dashboard/orgAllusers'}><li><a className='  hover:text-[#ffffff]'><PiUsersThreeFill />All users</a></li></NavLink>
                        </>

        : isProfessionals ? <>
                        <NavLink to={'/dashboard/proHome'}><li><a className='  hover:text-[#ffffff]'><FaTachometerAlt />Professionals Home</a></li></NavLink>
                        <NavLink to={'/dashboard/Reservation'}><li><a className='  hover:text-[#ffffff]'><FaCalendarAlt  />reservation</a></li></NavLink> 
                        <NavLink to={'/dashboard/paymenthistory'}><li><a className='  hover:text-[#ffffff]'><IoIosWallet />payment history</a></li></NavLink> 
                        <NavLink to={'/dashboard/Bookings'}><li><a className=' mb-5 hover:text-[#ffffff]'><FaBook/>my bookings</a></li></NavLink>
                        </>

                      : <>
                        <NavLink to={'/dashboard/userHome'}><li><a className='  hover:text-[#ffffff]'><FaTachometerAlt />participant profile</a></li></NavLink>
                        <NavLink to={'/dashboard/UserRegisterdCamp'}><li><a className='  hover:text-[#ffffff]'><FaCalendarAlt  />Registered Camps</a></li></NavLink> 
                        <NavLink to={'/dashboard/userPaymentHistory'}><li><a className='  hover:text-[#ffffff]'><IoIosWallet />payment history</a></li></NavLink> 
                        <NavLink to={'/dashboard/userFeedback'}><li><a className='  hover:text-[#ffffff]'><MdFeedback/>add review</a></li></NavLink>
                        </>
           }   




             {/* my main nav contenet don't change it  */}
            <span className="border-b  ml-4 pt-2  "></span>
            <NavLink to={'/'}><li><a className=' rounded-none hover:text-[#ffffff]'><GoHome></GoHome>Home</a></li></NavLink>
            <NavLink to={'/availablecamp'}><li><a className='  hover:text-[#ffffff]'><FiMenu/>Available Camps</a></li></NavLink>
            <NavLink to={'/contact'}><li><a className='  hover:text-[#ffffff]'><MdEmail/>CONTACT</a></li></NavLink>
            <button onClick={handleLogout} ><li><a className='  hover:text-[#ffffff]'><MdLogout/>Logout</a></li></button>

          </ul>
        </div>



    {/* content */}
       <div className=" flex-1 w-[82%]  ">
         <Outlet></Outlet>

       </div>


</div>
  );
};

export default Dashboard;

