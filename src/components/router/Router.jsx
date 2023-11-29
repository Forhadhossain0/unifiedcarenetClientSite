import {createBrowserRouter  } from "react-router-dom";
import Root from "../root/Root";
import Home from "../homepage/home/Home";
import PopularCamp from "../homepage/Popularcamps/PopularCamp";
import AvailableCamp from "../availableCamp/AvailableCamp";
import Campdetails from "../campdetails/Campdetails";
import Contact from "../contact/Contact";
import Login from "../login/Login";
import Register from "../register/Register";
import Privetroute from "../privetroute/Privetroute";

//  dashboard  //
import Dashboard from "../dashboard/Dashboard";

//organizer
import OrganizerHome from "../dashboard/orginaization/organizerHome/OrganizerHome";
import ManageCamp from "../dashboard/orginaization/managCamp/managCamp/ManageCamp";
import ManageRegisterdCamp from "../dashboard/orginaization/managRegisterdCamp/ManageRegisterdCamp";
import AddCamp from "../dashboard/orginaization/addcamp/AddCamp";
import Allusers from "../dashboard/orginaization/allusers/Allusers";
import UpdateCamp from "../dashboard/orginaization/managCamp/managCamp/updateCamp/UpdateCamp";
import Error404 from "../404errror/Error404";
import RegisteredCamps from "../dashboard/perticipent/registeredCamps/RegisteredCamps";
import ParticipantProfile from "../dashboard/perticipent/participantProfile/ParticipantProfile";
import Feedback from "../dashboard/perticipent/feedback/Feedback ";
import PaymentHistory from "../dashboard/perticipent/paymentHistory/PaymentHistory";
import Payment from "../dashboard/perticipent/perticipentPayment/Payment";
import ProfessionalsProfile from "../dashboard/health-profetionals/professionalsProfile/ProfessionalsProfile";
// import OrganizerRoute from "../dashboard/orginaization/organizerroute/OrganizerRoute";
// professionals



  

const Router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      errorElement: <Error404></Error404>,
      children: [
        {
            path:'/',
            element:<Home></Home>
        },
        {
          path:'/login',
          element:  <Login></Login>
        },
        {
          path:'/register',
          element: <Register></Register>
        },
        {
          path:'/popularcamp',
          element: <PopularCamp></PopularCamp>
        },
        {
          path: '/availablecamp',
          element: <Privetroute> <AvailableCamp></AvailableCamp> </Privetroute>
        },
        {
          path:'/campdetails/:id',
          element: <Privetroute> <Campdetails></Campdetails> </Privetroute>  ,
          loader: ({params}) => fetch(`http://localhost:5000/camp/${params.id}`)
        }
        ,        
        {
          path:'/contact',
          element: <Contact></Contact>
        }
        
      ]
    },


        // Dashboard parts
    {
      path:'dashboard',
      element: <Privetroute><Dashboard></Dashboard></Privetroute>  ,
      children: [

        // perticipent route normal 
        {
           path:'userHome',
           element: <ParticipantProfile></ParticipantProfile>
        },
        {
          path:'userRegisterdCamp',
          element: <RegisteredCamps></RegisteredCamps>
        },
        {
          path:'userPaymentHistory',
          element: <PaymentHistory></PaymentHistory>
        },
        {
          path:'userFeedback',
          element: <Feedback></Feedback>
        },
        {
          path:'userPayment',
          element: <Payment></Payment>
        },

        // ///////////////////////// //

        // organizers route admin like 
        {
          path:'orgHome',
          element: <OrganizerHome></OrganizerHome> 
        },
        {
          path:'orgAllusers',
          element: <Allusers></Allusers> 
        },
        {
          path:'orgAddcamp',
          element:   <AddCamp></AddCamp>   
        },
        {
          path:'orgManagecamp',
          element: <ManageCamp></ManageCamp>
        },
        {
          path:'updatecamp/:id',
          element: <UpdateCamp></UpdateCamp>,
          loader: ({params}) => fetch(`http://localhost:5000/camp/${params.id}`)

        },
        {
          path:'orgManageRegisterdCamp',
          element: <ManageRegisterdCamp></ManageRegisterdCamp>
        },
        // ///////////////////////////// //


        // healthcare propetionals as a expert
       {
        path: 'proHome',
        element: <ProfessionalsProfile></ProfessionalsProfile>
       }

        // ///////////////////////// //



      ]
    }
  ]);
  

export default Router;