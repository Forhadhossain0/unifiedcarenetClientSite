
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import useAxiosPublic from "../../../custoomhooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAuth from "../../../custoomhooks/useAuth";

const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"
    
}

const Feedback  = () => {
    const axiosPublic = useAxiosPublic() 
    const {user} = useAuth()
    const userPhoto = user?.photoURL ;
    const userName = user?.displayName ;
    const userEmail = user?.email;

    const [currentValue, setCurrentValue] = useState(1);
    const stars = Array(5).fill(0)
  
    const handleClick = value => {
      setCurrentValue(value)
    }


const handleSubmit = (e) =>{
    e.preventDefault();

    const ratings =  currentValue ;
    const sugggestion = e.target.sugggestion.value;
    const message = e.target.message.value;
    const reviewsInfo = {ratings,sugggestion,message,userPhoto,userName,userEmail}
    console.log(reviewsInfo)

    axiosPublic.post('/reviews',reviewsInfo )
    .then(res=>{
        if(res?.data?.insertedId){
            Swal.fire({
                title:'success',
                text:'Thank you for your Feedback',
                icon: 'success'
            })
        } else{
            Swal.fire({
                title:'error',
                text:'Somthing went wrong!',
                icon: 'error'
            })
        }
     
    })

}
  



  

    return (
        <div>
            <div className="w-[70%]  mx-auto mt-5 py-16 px-32 bg-[#fffdfd]">
            <h1 className="text-3xl  font-bold text-center">Rate US!</h1>

                <form onSubmit={handleSubmit} >

                     <div className='space-x-3 flex justify-center pb-8 pt-5 cursor-pointer'>
    
                        {stars.map((_, index) => {
                          return ( <FaStar  key={index}  size={26} onClick={() => handleClick(index + 1)}
                                        color={(currentValue) > index ? colors.orange : colors.grey}  />
                                 )
                        })}
                    </div>


                    <div>
                        <p className="capitalize text-gray-500 font-semibold px-1 pt-3 pb-1 ">Do you have any suggestion for our campaign</p>
                        <input required type="text" name="sugggestion" id="" placeholder="Please write what want to us " className="border outline-none rounded p-3 w-full "/>
                    </div>
                    <div>
                        <p className="capitalize text-gray-500 font-semibold px-1 pt-3 pb-1 ">Message</p>
                        <input required type="text" name="message" id="" placeholder="Please write express your care in a short way " className="border outline-none rounded h-[160px] p-3 w-full "/>
                    </div>

                    <input type="submit" value={'Submit'} className="mt-5 btn  btn-info text-white rounded px-10" />
                </form>
            </div>
        </div>
    );
};





export default Feedback ;