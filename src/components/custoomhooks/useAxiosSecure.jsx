import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import useAuth from "./useAuth";



 const axiosSecure = axios.create({
    baseURL: 'https://unifiedcarenet-backend.vercel.app'
 })

const useAxiosSecure = () => {
    
   //  const {logoutUser} = useAuth() ;
   //  const navigate = useNavigate()

    // AXIOS INTERCEPT REQUIEST
    axiosSecure.interceptors.request.use(
        (config)=>{
        const tokenGet = localStorage.getItem('access-token');
        // console.log(tokenGet,'got it from interceptors')
        config.headers.authorization = `${tokenGet}`
        return config;
        },

        (error)=>{
          return Promise.reject(error)
        }
    )


    // AXIOS INTERCEPT RESPONSE for 401 403 errors
    axiosSecure.interceptors.response.use(
             (response)=>{
                 return response;
            },
            async (error)=>{
              const status = error.response.status;
                if(status === 401 || status === 403){
                  //  await logoutUser();
                  //  navigate('/login')
                  // console.log(error.message)
                 }
             return Promise.reject(error)
        }
      )

   return axiosSecure; 
};




export default useAxiosSecure;