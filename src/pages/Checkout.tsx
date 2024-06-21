import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useNewOrderMutation } from "../redux/api/orderAPI";
import { resetCart } from "../redux/reducer/cartReducer";
import { Rootstate } from "../redux/store";
import { NewOrderRequest } from "../types/apiTypes";
import { responseToast } from "../utils/features";
// import { useUpdateProductMutation } from "../redux/api/productAPI";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state: Rootstate) => state.userReducer);

  const {
    shippingInfo,
    cartItems,
    discount,
    shippingCharges,
    subtotal,
    total,
  } = useSelector((state: Rootstate) => state.cartReducer);

  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const [newOrder] = useNewOrderMutation();
  // const [updateProduct] = useUpdateProductMutation();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const orderData: NewOrderRequest = {
      shippingInfo,
      orderItems: cartItems,
      discount,
      shippingCharges,
      subtotal,
      total,
      user: user?._id!,
    };

    const { paymentIntent, error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin,
      },
      redirect: "if_required",
    });

    if (error) {
      setIsProcessing(false);
      return toast.error(error.message || "Something Went Wrong!");
    }

    if (paymentIntent.status === "succeeded") {
      const res = await newOrder(orderData);
      toast.success('Payment successful!!!');
      // cartItems.map(
      //   async (item) =>
      //     await updateProduct({
      //       userId: user?._id!,
      //       productId: item.productId,
      //       stock: item.stock - item.quantity,
      //     })
      // );
      dispatch(resetCart());
      responseToast(res, navigate, "/orders");
    }
    setIsProcessing(false);
  };

  return (
    <div className="checkout-container">
      <form onSubmit={submitHandler}>
        <PaymentElement />
        <button type="submit" disabled={isProcessing}>
          {isProcessing ? "Processing..." : "Pay"}
        </button>
      </form>
    </div>
  );
};
const Checkout = () => {
  const location = useLocation();
  const clientSecret: string | undefined = location.state;

  if (!clientSecret) {
    return <Navigate to={"/shipping"} />;
  }
  return (
    <Elements
      options={{
        clientSecret,
      }}
      stripe={stripePromise}
    >
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout;
