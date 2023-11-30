import { Link, useLocation, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { useForm } from "react-hook-form";
import useAuth from "../custoomhooks/useAuth";
import useAxiosPublic from "../custoomhooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useState } from "react";
import { Helmet } from "react-helmet";




const Register = () => {
    const { register, handleSubmit,reset,  formState: { errors } } = useForm();
    const {createUser} = useAuth();
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/';

    const [error,setError] = useState([])

    const onSubmit = data => {
        const email = data.email.toLowerCase();
        createUser( email,data.password)
        .then(res=> {
            const perticipent = 'perticipent';
            const userInfo = {displayName:data.name, email:email,photoURL: data.photo ,role:perticipent}

            updateProfile(res.user,{displayName:data.name, photoURL:data.photo })
            .then(()=>{
                axiosPublic.post('/users',userInfo)
                .then(res=>{
                    console.log(res);
                    if(res.data.insertedId){
                        reset()
                        navigate(from,{replace:true});
                        Swal.fire({
                            icon: "success",
                            title: "successfull acount created",
                            showConfirmButton: false,
                            timer: 1500
                          });
                       }
                }).catch(err=>{ setError(err.message) })
            })
        }).catch(err=>{ setError(err.message) })
    };

  
      

    return (
        <div className="md:h-[100vh] h-auto  w-full   ">

   <Helmet><title>Unified || Register</title></Helmet>

     <section className="md:flex bg-right bg-contain  bg-no-repeat bg-[url('https://img.freepik.com/free-vector/wave-background_53876-115944.jpg?w=740&t=st=1700853752~exp=1700854352~hmac=a4f74203716459b002b83990d8b339762879053ee47d542999a42d1686aecdba')] gap-20 justify-between p-20  items-center h-full w-full">
     {/* <section className="md:flex  gap-20 justify-between p-20  items-center h-full w-full"> */}
               
          

     <div className=" w-full ">
            <h1  data-aos="fade-right" className="font-bold mx-auto text-xl text-center pb-10">Create a New Account</h1>
        
         <form  data-aos="fade-left"    onSubmit={handleSubmit(onSubmit)} className="md:w-[60%] w-full mx-auto flex justify-center mb-3" >
             <div className="mx-auto w-full  ">
                 <div className="space-y-1">
                        <p className="text-red-500">{error}</p>
                    <div>
                      <input {...register('name',{required:true})} className="w-full rounded border p-4 outline-none " type="text" placeholder="Enter your Name " />
                      {errors.name?.type === 'required' && <p className='text-red-500 text-[12px] w-full '>please enter your name </p>}
                    </div>

                    <div>
                       <input {...register('email',{required:true, pattern:/@/})} className="w-full rounded border p-4 outline-none " type="email" placeholder="Enter your Email " />
                       {errors.email?.type === 'required' && <p className='text-red-500 text-[12px] w-full '>please enter your email </p>}
                       {errors.email?.type === 'pattern' && <p className='text-red-500  text-[12px] w-full '>invalid email type </p>}
                    </div>
                                
                   <div>
                      <input {...register('password', {required:true, minLength:6, pattern: /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])./})} className="w-full rounded border p-4 outline-none " type="password" placeholder="Enter your password " />
                      {errors.password?.type === 'required' && <p className='text-red-500  text-[12px] w-full '>please enter your password </p>}
                      {errors.password?.type === 'minLength' && <p className='text-red-500  text-[12px] w-full '>password must be 6 char or longer  </p>}
                      {errors.password?.type === 'pattern' && <p className='text-red-500  text-[12px] w-full '> password must be atleast one uppercase lowercase,number & special char. </p>}
                   </div>
                   
                    <div>
                       <input {...register('photo',{required:true})} className="w-full rounded border p-4 outline-none " type="text" placeholder="Enter your photoURL " />
                       {errors.photo?.type === 'required' && <p className='text-red-500 text-[12px] w-full '>please enter your photo url  </p>}
                    </div>
                               
                     <input className="w-full mt-4 outline-none  rounded border-none bg-[#002b86] btn-primary btn text-white " type="submit" value={'Create Account'} placeholder="Enter your password " />
                </div>
            </div>
        </form>
        <Link to={'/login'} data-aos="fade-right" className=" mx-auto text-center w-full "> <p>already registered ? <span className="underline">please singin</span></p> </Link>
    </div>

     <div className=" w-[90%] mx-auto  py-10 pr-20   relative ">
     <img  data-aos="fade-right"  data-aos-duration='2000' className="md:w-[80%] h-full " src="https://img.freepik.com/free-vector/user-verification-unauthorized-access-prevention-private-account-authentication-cyber-security-people-entering-login-password-safety-measures_335657-3530.jpg?w=740&t=st=1700853389~exp=1700853989~hmac=03d45dde513d47b12f4e7aa4eca521d6683f717f0a7713fc3398246d75f822aa" alt="" />
    </div>


 </section>
</div>
    );
};

export default Register;