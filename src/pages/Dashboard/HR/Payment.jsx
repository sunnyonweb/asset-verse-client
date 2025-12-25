import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {
  return (
    <div className="max-w-md mx-auto bg-white p-10 rounded-xl shadow-2xl mt-10">
      <h2 className="text-3xl font-bold text-center mb-2">Upgrade Package</h2>
      <p className="text-gray-500 text-center mb-8">
        Increase your employee limit to 10.
      </p>

      <div className="mb-6">
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
