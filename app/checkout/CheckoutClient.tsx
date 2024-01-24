"use client"

import { v4 as uuidv4 } from 'uuid';
import { useCart } from "@/hooks/useCart";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import CheckoutForm from "./CheckoutForm";
import Button from "../components/button";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

const CheckoutClient = () => {
  const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const router = useRouter();
  
  useEffect(() => {
    const fetchPaymentIntent = async () => {
      if (cartProducts) {
        setLoading(true);
        setError(false);
        const idempotencyKey = uuidv4();
        
        try {
          const response = await fetch("/api/create-payment-intent", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Idempotency-Key": idempotencyKey,
            },
            body: JSON.stringify({
              items: cartProducts,
              payment_intent_id: paymentIntent,
            }),
          });

          setLoading(false);

          if (response.status === 401) {
            return router.push("/login");
          }

          const data = await response.json();
          setClientSecret(data.paymentIntent.client_secret);
          handleSetPaymentIntent(data.paymentIntent.id);
        } catch (error) {
          setError(true);
          console.error("Error", error);
          toast.error("Something went wrong");
        }
      }
    };

    fetchPaymentIntent();
  }, [cartProducts, paymentIntent, handleSetPaymentIntent, router]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
      labels: "floating",
    },
  };

  const handleSetPaymentSuccess = useCallback((value: boolean) => {
    setPaymentSuccess(value);
  }, []);

  return (
    <div className="w-full">
      {clientSecret && cartProducts && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm
            clientSecret={clientSecret}
            handleSetPaymentSuccess={handleSetPaymentSuccess}
          />
        </Elements>
      )}
      {loading && <div className="text-center">Loading Checkout...</div>}
      {error && <div className="text-center text-rose-500">Something Went Wrong</div>}
      {paymentSuccess && (
        <div className="flex items-center flex-col gap-4">
          <div className="text-teal-500 text-center">Payment Success</div>
          <div className="max-w-[200px] w-full">
            <Button label="View Your Orders" onClick={() => router.push('/order')} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutClient;
