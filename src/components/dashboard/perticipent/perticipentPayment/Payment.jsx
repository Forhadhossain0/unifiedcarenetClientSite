import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Helmet } from "react-helmet";


const Payment = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API_KEY);
    // console.log(import.meta.env.VITE_STRIPE_API_KEY);

return (
    <div className="h-full w-full bg-[#f2f2f2]">

<Helmet><title>Unified || Payment</title></Helmet>

      <h1 className="text-3xl font-bold mx-auto text-center  text-rose-400 py-10">PAYMENT</h1>
       <Elements stripe={stripePromise} >
          <CheckoutForm></CheckoutForm>
        </Elements>
    </div>
    );
};

export default Payment;