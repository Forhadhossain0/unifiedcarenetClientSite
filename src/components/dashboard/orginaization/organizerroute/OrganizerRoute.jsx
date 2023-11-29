import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../../custoomhooks/useAuth";
import useOrganizer from "../../../custoomhooks/useOrganizer";
import useProfessional from "../../../custoomhooks/useProfessional";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../custoomhooks/useAxiosSecure";


const OrganizerRoute = ({children}) => {
    
    const {data:hasAllUsers}  = useQuery({ 
        queryKey:['hasAllUsers'],
        queryFn: async() =>{
            const res = await useAxiosSecure.get('/users')
            return res.data
        }
      }) 
      const normalUser =  hasAllUsers?.filter(dbuser=> !(dbuser.role) )
    //   console.log(normalUser)

    const [isOrganizer,isOrganizerLoading] = useOrganizer()
    const [isProfessionals,isProfessionalsLoading] = useProfessional()
    const {loader} = useAuth;
    const location = useLocation();
    

    if(loader || isOrganizerLoading || isProfessionalsLoading ){
        return <span className="loading   loading-infinity  loading-lg flex justify-center h-[50vh] items-center text-center mx-auto  text-teal-400"></span>
    }

    if(normalUser && !isProfessionals  && isOrganizer ){
            return children;
    }

    return  <Navigate state={{from:location}}  replace ></Navigate>
};

export default OrganizerRoute;

