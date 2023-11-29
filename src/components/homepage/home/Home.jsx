import { Helmet } from "react-helmet-async";
import Banner from "../herosection/Banner";
import PopularCamp from "../Popularcamps/PopularCamp";
import Testiomials from "../testimonials/Testimonials";
import UpcommingCamp from "../upcoming -camps/UpcommingCamp";

const Home = () => {

  return (
      <>
        <Helmet><title>Unified || Home</title></Helmet>
        <Banner></Banner> 
        <PopularCamp></PopularCamp>
        <Testiomials></Testiomials>
        <UpcommingCamp></UpcommingCamp>
      </>
  );
};

export default Home;
