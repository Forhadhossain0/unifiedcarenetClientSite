import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import useAxiosPublic from "../../../../../custoomhooks/useAxiosPublic";
import useAxiosSecure from "../../../../../custoomhooks/useAxiosSecure";


const img_host_key = import.meta.env.VITE_IMAGEBB_HOST_KEY;
const img_host_api = `https://api.imgbb.com/1/upload?key=${img_host_key}`


const UpdateCamp = () => {
  const {  register, handleSubmit } = useForm();
  const axiosPublic  = useAxiosPublic()
  const axiosSecure = useAxiosSecure()


  const {_id,campname, campfee, venuelocation, description, details, healthcareProfessionals,
         specializedservices,  targetaudience, scheduleddatetime, image, camprole} =   useLoaderData();
//   console.log(campname, campfee, venuelocation, description, details, healthcareProfessionals,
//             specializedservices,  targetaudience, scheduleddatetime, image, upcommingcamp)


  const onSubmit = async (data) => {

    const imageFile = {image: data.image[0]};
    const res = await axiosPublic.post(img_host_api,imageFile,{  headers:{'content-type':'multipart/form-data'} })

    if(res.data.success){
        const menuItems = {
          campname:data.campname,  campfee: parseFloat(data.campfee), venuelocation:data.venuelocation, description:data.description, details:data.details, healthcareProfessionals:data.healthcareProfessionals,
          specializedservices:data.specializedservices,  targetaudience:data.targetaudience, scheduleddatetime:data.scheduleddatetime, image: res.data.data.display_url || image,
          camprole: camprole
        };

      const menuResponse = await axiosSecure.patch(`/camp/${_id}`,menuItems) 
      console.log(menuResponse?.data)
      if(menuResponse?.data?.modifiedCount > 0){
        Swal.fire({  title: "updated!", text: "Your camp has been updated successfully.",  icon: "success"});

      }  else{ Swal.fire({title: "Somthing Wrong!",  text: "DB cant post now",   icon: "error" });}
      
    }else{  Swal.fire({ title: "Somthing Wrong!", text: "Opps can't added Camp.", icon: "error"  });}


  };

  return (
    <>



  <div className=" p-10 min-h-screen ">
  <div className="  bg-[#ffffff] ">
  <h1 className="text-2xl font-bold mx-auto text-center pt-10 text-rose-400 border-b-rose-400 border-b-2 w-80 pb-3">Update Or Add New Info </h1>
       
    <div className="card rounded-sm w-full ">

      <form onSubmit={handleSubmit(onSubmit)} className="card-body space-y-2 text-gray-500  mx-auto w-full p-10">
      

        <div className="flex w-full gap-5">
               <div className="form-control w-full">
                <label className="label font-semibold"> Camp Name* </label>
                <input  {...register('campname',{required: true})} defaultValue={campname} type="text" placeholder="Enter Camp Name" className="p-3 w-full border-2 rounded outline-none"  />
               </div>

               <div className="form-control w-full">
                <label className="label font-semibold"> Camp Fee* </label>
                <input  {...register('campfee',{required: true})} defaultValue={campfee} type="text" placeholder="Enter Camp Fee" className="p-3 w-full border-2 rounded outline-none"  />
               </div>
        </div>

        <div className="flex w-full gap-5">
               <div className="form-control w-full">
               <label className="label font-semibold">  Specialized Services* </label>
               <input  {...register('specializedservices',{required: true})} defaultValue={specializedservices} type="text"  placeholder="Enter Specialized Services " className="p-3 w-full border-2 rounded outline-none"  />
               </div>

               <div className="form-control w-full">
               <label className="label font-semibold"> Venue Location* </label>
               <input  {...register('venuelocation',{required: true})} defaultValue={venuelocation} type="text"  placeholder="Enter Venue Location" className="p-3 w-full border-2 rounded outline-none"  />
               </div>
           </div>

        <div className="flex w-full gap-5">
               <div className="form-control w-full">
               <label className="label font-semibold"> Healthcare Professionals* </label>
               <input  {...register('healthcareProfessionals',{required: true})} defaultValue={healthcareProfessionals} type="text"  placeholder="Enter Healthcare Professionals" className="p-3 w-full border-2 rounded outline-none"  />
               </div>

               <div className="form-control w-full">
                 <label className="label font-semibold">Comprehensive Description *</label>
                 <input  {...register('description',{required: true})} defaultValue={description} type="text"  placeholder="Enter Healthcare Professionals" className="p-3 w-full  border-2 rounded outline-none"  />
               </div>

          </div>



        <div className="flex w-full gap-5 pt-3">

           <div className="form-control w-full border-2 h-full ">
                  <select defaultValue={targetaudience}  {...register('targetaudience',{required: true})} className="select font-semibold  w-full p-3 border-2 rounded  ">
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
                <input  {...register('scheduleddatetime',{required: true})} defaultValue={scheduleddatetime} type="datetime-local"  placeholder="Enter scheduledDateTime" className="p-3 w-full border-2 rounded outline-none"  />
               </div>


               <div className="form-control  ">
                 <input {...register('image',)}  type="file" className="file-input  file-input-accent h-[55px]  border rounded bg-teal-100  outline-none " />
                 {/* {errors.image?.type === 'required' && <span className="text-rose-500">please select a new image  </span>}  */}
                 {/* span just for raed */}
                 <span  className="  bg-gray-400 px-2   cursor-pointer flex items-center  "> {image} </span>
              </div> 
        </div>


        <div className="form-control">
          <label className="label font-semibold">Camp Details *</label>
          <input  {...register('details',{required: true})} defaultValue={details} type="text"  className="p-3 h-44 outline-none border-2 rounded "  />
        </div>

        <div className="flex">
          <input {...register('camprole')} checked={camprole === 'upcoming'} type="checkbox" className="outline-none border-2 rounded" />
          <label className="label font-semibold">Upcomming Camp</label>
        </div>


        <div className="form-control w-full pt-5">
          <input  type="submit" value={'ADD or Submit Camp'} className="btn btn-primary uppercase  bg-[#00eccd] border-none rounded-sm text-white"/>
        </div>

      </form>
    </div>




  </div>
</div> 


    </>
  );
};

export default UpdateCamp;
