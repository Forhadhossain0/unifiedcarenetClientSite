import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../custoomhooks/useAxiosPublic";
import useAxiosSecure from "../../../custoomhooks/useAxiosSecure";
import { useState } from "react";


const img_host_key = import.meta.env.VITE_IMAGEBB_HOST_KEY;
const img_host_api = `https://api.imgbb.com/1/upload?key=${img_host_key}`


const AddCamp = () => {
  const { register, handleSubmit } = useForm();
  const axiosPublic  = useAxiosPublic()
  const axiosSecure = useAxiosSecure()
  const [loading, setLoading] = useState(false);


  const onSubmit = async (data) => {
    setLoading(true)

    const imageFile = {image: data.image[0]};
    const res = await axiosPublic.post(img_host_api,imageFile,{  headers:{'content-type':'multipart/form-data'} })

    if(res.data.success){
        const participant = parseFloat(0);
        const professionals = parseFloat(0);
        const menuItems = {
          campname:data.campname,  campfee: parseFloat(data.campfee), venuelocation:data.venuelocation, description:data.description, details:data.details, healthcareProfessionals:data.healthcareProfessionals,
          specializedservices:data.specializedservices,  targetaudience:data.targetaudience, scheduleddatetime:data.scheduleddatetime, image: res.data.data.display_url,
          camprole: data.upcommingcamp ? 'upcoming' : 'released' , participant: participant,professionals:professionals,
        }

      const menuResponse = await axiosSecure.post('/camp',menuItems) 
      console.log(menuResponse?.data)
      if(menuResponse.data.insertedId){
        setLoading(false)
        Swal.fire({
          title: "Added!",
          text: "Your camp has been added.",
          icon: "success"
        });
      } 
      else{
        setLoading(false)
        Swal.fire({
          title: "Somthing Wrong!",
          text: "DB cant post now",
          icon: "error"
        });
      }
    }else{
      setLoading(false)
      Swal.fire({
        title: "Somthing Wrong!",
        text: "Opps can't added Camp.",
        icon: "error"
      });
    }


  };

  return (
    <>



  <div className=" relative p-10 min-h-screen ">
  <div className="  bg-[#ffffff] ">
  <h1 className="text-3xl font-bold mx-auto text-center pt-10">ADD a NEW CAMP HERE</h1>
       
    <div className="card rounded-sm w-full ">

      <form onSubmit={handleSubmit(onSubmit)} className="card-body space-y-2 text-gray-500  mx-auto w-full p-10">
      

        <div className="flex w-full gap-5">
               <div className="form-control w-full">
                <label className="label font-semibold"> Camp Name* </label>
                <input  {...register('campname',{required: true})} type="text" placeholder="Enter Camp Name" className="p-3 w-full border-2 rounded outline-none"  />
               </div>

               <div className="form-control w-full">
                <label className="label font-semibold"> Camp Fee* </label>
                <input  {...register('campfee',{required: true})} type="text" placeholder="Enter Camp Fee" className="p-3 w-full border-2 rounded outline-none"  />
               </div>
        </div>

        <div className="flex w-full gap-5">
               <div className="form-control w-full">
               <label className="label font-semibold">  Specialized Services* </label>
               <input  {...register('specializedservices',{required: true})} type="text"  placeholder="Enter Specialized Services " className="p-3 w-full border-2 rounded outline-none"  />
               </div>

               <div className="form-control w-full">
               <label className="label font-semibold"> Venue Location* </label>
               <input  {...register('venuelocation',{required: true})} type="text"  placeholder="Enter Venue Location" className="p-3 w-full border-2 rounded outline-none"  />
               </div>
           </div>

        <div className="flex w-full gap-5">
               <div className="form-control w-full">
               <label className="label font-semibold"> Healthcare Professionals* </label>
               <input  {...register('healthcareProfessionals',{required: true})} type="text"  placeholder="Enter Healthcare Professionals" className="p-3 w-full border-2 rounded outline-none"  />
               </div>

               <div className="form-control w-full">
                 <label className="label font-semibold">Comprehensive Description *</label>
                 <input  {...register('description',{required: true})} type="text"  placeholder="Enter Healthcare Professionals" className="p-3 w-full  border-2 rounded outline-none"  />
               </div>

          </div>



        <div className="flex w-full gap-5 pt-3">

           <div className="form-control w-full border-2 ">
                  <select defaultValue={'default'} {...register('targetaudience',{required: true})} className="select font-semibold  w-full p-3 border-2 rounded  ">
                      <option disabled value='default'  >Select a Audience Age</option>
                      <option value={'0 - 5'}>   0 - 5 </option>
                      <option value={'6 - 12'}>  6 - 12 </option>
                      <option value={'13 - 18'}> 13 - 18 </option>
                      <option value={'19 - 23'}> 19 - 23 </option>
                      <option value={'24 - 35'}> 24 - 35 </option>
                      <option value={'36 - 45'}> 36 - 45  </option>
                      <option value={'46 - 80'}> 46 - 80  </option>
                   </select>
               </div>

               <div className="form-control w-full">
                <input  {...register('scheduleddatetime',{required: true})} type="datetime-local"  placeholder="Enter scheduledDateTime" className="p-3 w-full border-2 rounded outline-none"  />
               </div>


               <div className="form-control ">
                 <input {...register('image',{required: true})} required type="file" className="file-input  file-input-accent h-[55px]  border rounded bg-teal-100  outline-none " />
              </div>
        </div>


        <div className="form-control">
          <label className="label font-semibold">Camp Details *</label>
          <input  {...register('details',{required: true})} type="text"  className="p-3 h-44 outline-none border-2 rounded "  />
        </div>

        <div className="flex ">
          <input  {...register('upcommingcamp')} type="checkbox"  className="cursor-pointer  outline-none  border-2 rounded "  />
          <label className="label font-semibold cursor-pointer">Upcomming Camp</label>
        </div>


        <div className="form-control w-full pt-5">
          <input  type="submit" value={'ADD or Submit Camp'} className="btn btn-primary uppercase  bg-[#00eccd] border-none rounded-sm text-white"/>
        </div>

      </form>
    </div>

    {loading && (
                  <div className="mx-auto  w-[93%] mt-10 h-[143vh] bg-[#15412b63] top-0  flex absolute items-center justify-center">
                    <span className=" gap-3 flex items-start justify-center">
                      <span className="text-white text-xl">Loading...</span> <span className=" loading loading-spinner text-white p-3 "> </span>
                    </span>
                  </div>
                )}


  </div>
</div> 


    </>
  );
};

export default AddCamp;
