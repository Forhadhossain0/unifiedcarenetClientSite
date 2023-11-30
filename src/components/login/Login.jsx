import { Link, useLocation, useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useForm } from "react-hook-form";
import useAuth from "../custoomhooks/useAuth";
import useAxiosPublic from "../custoomhooks/useAxiosPublic";
import auth from "../firebase/firebase.config";
import { FaGoogle} from "react-icons/fa";
import { useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Helmet } from "react-helmet";




const Login = () => {
    const { register, handleSubmit,  formState: { errors } } = useForm();

    const {loginUser} = useAuth();
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/';
    const [error,setError] = useState()
    // console.log('from:', from);

    const onSubmit = data => {

      let perticipent = 'perticipent';
      loginUser(data.email,data.password)
     .then(res=> {
      const user ={displayName: res.user.displayName, email:res.user.email,photoURl:res.user.photoURL,role:perticipent}
      axiosPublic.post(`/users`,user) 
      .then((res)=>{
        navigate(from , {replace : true}) 
        console.log(res.data)
      }).catch(err=>{ setError(err.message) })

    }).catch(err=>{ setError(err.message) })
    };

  
      
const handleGoogle = () =>{
    const gprovider = new GoogleAuthProvider();
    
    signInWithPopup(auth,gprovider)
    .then(res=> {
      const perticipent = perticipent;
      const user ={displayName: res.user.displayName, email:res.user.email, photoURl:res.user.photoURL, role: perticipent}
      axiosPublic.post(`/users`,user)
      .then((res)=>{
        console.log(res)
        navigate(from , {replace : true})
      })
    
     })
  }

  AOS.init()
    return (
        <div className="md:h-[100vh] h-auto  w-full   ">

   <Helmet><title>Unified || Login</title></Helmet>


     <section  data-aos="fade-up"  className="md:flex bg-right bg-contain  bg-no-repeat bg-[url('https://img.freepik.com/free-vector/wave-background_53876-115944.jpg?w=740&t=st=1700853752~exp=1700854352~hmac=a4f74203716459b002b83990d8b339762879053ee47d542999a42d1686aecdba')] gap-20 justify-between p-20  items-center h-full w-full">
     {/* <section className="md:flex  gap-20 justify-between p-20  items-center h-full w-full"> */}
               
          

     <div  data-aos="fade-right"   className=" w-full ">
            <h1 className="font-bold mx-auto text-xl text-center ">!Wellcome to here </h1>
            <p className="text-center">help us to provide a valid information.</p>
        
         <form  onSubmit={handleSubmit(onSubmit)} className="md:w-[60%] w-full pt-7 mx-auto flex justify-center mb-3" >
             <div className="mx-auto w-full  ">
                 <div className="space-y-5">
                    <div>
                       <p className="text-red-500">{error}</p>
                       <input {...register('email',{required:true})} className="w-full rounded border p-4 outline-none " type="email" placeholder="Enter your Email " />
                       {errors.email?.type === 'required' && <p className='text-red-500 text-[12px] w-full '>please enter your email </p>}
                   </div>
                                
                   <div>
                      <input {...register('password', {required:true})} className="w-full rounded border p-4 outline-none " type="password" placeholder="Enter your password " />
                      {errors.password?.type === 'required' && <p className='text-red-500  text-[12px] w-full '>please enter your password </p>}
                 </div>
                   
       
                     <input className="w-full mt-4 outline-none  rounded border-none bg-[#002b86] btn-primary btn text-white " type="submit" value={'Login'} placeholder="Enter your password " />
                </div>
            </div>
        </form>
        <Link to={'/register'} className=" mx-auto text-center w-full "> <p>don't have account ? <span className="underline">please register</span></p> </Link>
        <button onClick={handleGoogle} className="btn btn-outline outline-yellow-500 mx-auto text-[15px] mt-3 font-bold rounded flex justify-center md:w-[60%] w-full"><FaGoogle className="text-yellow-500"></FaGoogle> Continue With Google</button>
    </div>

     <div  data-aos="fade-left" data-aos-duration='2000'   className=" w-[90%] mx-auto py-10 pr-20  relative ">
     <img className="md:w-[80%] h-full" src="https://img.freepik.com/free-vector/user-verification-unauthorized-access-prevention-private-account-authentication-cyber-security-people-entering-login-password-safety-measures_335657-3530.jpg?w=740&t=st=1700853389~exp=1700853989~hmac=03d45dde513d47b12f4e7aa4eca521d6683f717f0a7713fc3398246d75f822aa" alt="" />
    </div>


 </section>
</div>
    );
};

export default Login;