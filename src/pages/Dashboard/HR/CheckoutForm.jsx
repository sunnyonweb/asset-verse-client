import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  // প্যাকেজ প্রাইস (আপাতত ফিক্সড $10 ধরছি, অথবা প্রপস দিয়ে আনা যাবে)
  const price = 10;
  const packageLimit = 10; // নতুন লিমিট কত হবে (উদাহরণ: ৫ থেকে বেড়ে ১০ হবে)

  useEffect(() => {
    if (price > 0) {
      axiosSecure.post("/create-payment-intent", { price }).then((res) => {
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [axiosSecure, price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("");
    }

    // Confirm Payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("confirm error", confirmError);
    } else {
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);

        // Save Payment Info to Database
        const payment = {
          hrEmail: user.email,
          price: price,
          transactionId: paymentIntent.id,
          date: new Date(), // Convert to UTC in real app
          packageName: "Standard", // Example
          newLimit: packageLimit,
          status: "success",
        };

        const res = await axiosSecure.post("/payments", payment);
        if (res.data?.paymentResult?.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Payment Successful!",
            text: `Your limit has been increased to ${packageLimit} employees.`,
            showConfirmButton: false,
            timer: 2000,
          });
          navigate("/dashboard/home");
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="border p-4 rounded-lg bg-gray-50 mb-4">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>

      <p className="text-red-600 text-sm mb-4">{error}</p>
      {transactionId && (
        <p className="text-green-600 text-sm mb-4">
          Transaction ID: {transactionId}
        </p>
      )}

      <button
        className="btn btn-primary w-full text-white"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay ${price}
      </button>
    </form>
  );
};

export default CheckoutForm;
