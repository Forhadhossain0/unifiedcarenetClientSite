import { Link } from "react-router-dom";


const Error404 = () => {
    return (
        <div className="w-full h-full flex justify-center items-center gap-5 ">
         <div>
         <img className="w-full " src="https://media0.giphy.com/media/xUOwG3n2WnEIokZ9ew/giphy.gif" alt="" />
         <h1 className="text-5xl text-blue-500 font-bold text-center mx-auto justify-center flex pb-10">404 Error Found</h1>
         <Link to={'/'} className="text-xl text-red-500 w-40 font-bold text-center mx-auto justify-center border-b-2 pb-2 flex">Back Home</Link>
         </div>
        </div>
    );
};

export default Error404;