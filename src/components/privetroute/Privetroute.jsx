import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../custoomhooks/useAuth";

const Privetroute = ({children}) => {
 
    const {user,loader} = useAuth()
    const location = useLocation()


    if(loader){
        return <span className="loading   loading-infinity  loading-lg flex justify-center h-[50vh] items-center text-center mx-auto  text-teal-400"></span>
    }

    if(user){
        return children;
    }

    return <Navigate state={{from:location}} to={'/login'} replace ></Navigate>
};

export default Privetroute;