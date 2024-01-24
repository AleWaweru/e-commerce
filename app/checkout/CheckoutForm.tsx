import { useCart } from "@/hooks/useCart";
import formatPrice from "@/utils/formatPrice";
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Heading from "../components/Products/Heading";
import Button from "../components/button";

interface CheckoutFormProps {
  clientSecret: string;
  handleSetPaymentSuccess: (value: boolean) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  clientSecret,
  handleSetPaymentSuccess,
}) => {
  const { cartTotalAmount, handleClearCart, handleSetPaymentIntent } = useCart();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const formattedPrice = formatPrice(cartTotalAmount);

  useEffect(() => {
    const handleStripeInitialized = () => {
      if (!clientSecret) {
        return;
      }
      handleSetPaymentSuccess(false);
    };

    handleStripeInitialized();
  }, [clientSecret, handleSetPaymentSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      });

      if (!result.error) {
        toast.success("Checkout Success");

        handleClearCart();
        handleSetPaymentSuccess(true);
        handleSetPaymentIntent(null);
      }
    } catch (error) {
      console.error("Error confirming payment:", error);
      toast.error("Something went wrong during payment confirmation");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} id="payment-form">
      <div className="mb-6">
        <Heading title="Enter your details to complete" />
        <h2 className="font-semibold mb-2">Address Information</h2>
        <AddressElement
          options={{
            mode: "shipping",
            allowedCountries: ["US", "KE"],
          }}
        />
        <h2 className="font-semibold mt-4 mb-2">Payment Information</h2>
        <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
        <div
          className="py-4 text-center text-slate-700
        text-xl font-bold
        "
        >
          Total: {formattedPrice}
        </div>
        <Button
          label={isLoading ? "Processing" : "Pay Now"}
          disabled={isLoading || !stripe || !elements}
          onClick={() => {}}
        />
      </div>
    </form>
  );
};

export default CheckoutForm;
