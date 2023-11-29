import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import useAxiosPublic from '../../custoomhooks/useAxiosPublic';
import { useEffect, useState } from 'react';
import '../../../index.css'
import AOS from 'aos';
import 'aos/dist/aos.css';


const Testiomials = () => {
AOS.init()


const axiosPublic = useAxiosPublic()    

const [reviews,setReviews] = useState()
useEffect(()=>{
    axiosPublic.get('/reviews')
    .then(res=>{
        setReviews(res.data)
    })
},[axiosPublic])

console.log(reviews)



// for star set number to star symbols
const renderStars = (rating) => {
  const filledStars = Math.floor(rating);
  const emptyStars = 5 - filledStars;

  const stars = [];
  for (let i = 0; i < filledStars; i++) {
    stars.push(<span key={i}>&#9733;</span>); // Unicode for a solid star
  }
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<span key={i + filledStars}>&#9734;</span>); // Unicode for an outline star
  }

  return stars;
};



return (

<div className=' w-full h-[90vh] my-20 py-20 md:px-10 '>

    <h1 data-aos="fade-right" className='text-2xl text-center pt-10 border-b-4 border-blue-500 w-80 mx-auto  font-bold font-serif text-red-600'>Perticipent Reviews</h1>
            
<AwesomeSlider className='bg-white h-full  flex justify-center items-center' >

{
  reviews?.map(x=> 
    <div data-aos="flip-right" key={x._id} className='font-semibold p-8 shadow border w-full h-full  bg-white' >

      <img className='w-16 h-16 rounded-full border-2 border-blue-500 bg-blue-500 mx-auto ' src={x.userPhot|| 'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png'} alt="" />  
      <p className=' md:px-40 '>{x.userName}</p>
     
      <p className='md:text-5xl text-3xl rounded-lg mx-auto text-center py-3 flex space-x-3 justify-center text-[#CD9003]'>
        {renderStars(x.ratings)} </p>

       <h2 className='font-bold text-center'>{x.sugggestion}</h2>
       <h2 className='md:w-[60%]  mx-auto text-center'>{x.message}</h2>


   </div> 
   
  )}

</AwesomeSlider>


 </div>
    );
};

export default Testiomials;