import {Outlet  } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { useEffect, useState } from "react";

const Root = () => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }, []);
  
    return (
    <> 
    {loading ? <div className="w-full mx-auto mt-40"> 
                <img className="bg-no-repeat w-36 mx-auto flex  justify-center items-center" src="https://cdn.dribbble.com/users/250625/screenshots/2818242/loader-alt.gif" alt="" />
                <h2 className="text-2xl uppercase text-blue-600 font-bold mx-auto text-center">Unified<span  className="text-rose-600 text-4xl font-bold">+</span>CareNet</h2>
               </div>

             :
             <div>
                 <Navbar></Navbar>
                 <Outlet></Outlet>
                 <Footer></Footer> 
             </div>
    }        
    </>
    );
};

export default Root;