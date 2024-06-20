import axios from "axios";
import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItemCard from "../components/CartItem";
import {
  addToCart,
  applyDiscount,
  calculatePrice,
  removeCartItem,
} from "../redux/reducer/cartReducer";
import { Rootstate, server } from "../redux/store";
import { CartItemType } from "../types/types";

const Cart = () => {
  const dispatch = useDispatch();

  // tax, (add below)
  const { cartItems, discount, shippingCharges, subtotal, total } = useSelector(
    (state: Rootstate) => state.cartReducer
  );

  const [couponCode, setCouponCode] = useState<string>("");
  const [isValid, setIsValidCoupon] = useState<boolean>(false);

  const incrementCartHandler = (cartItem: CartItemType) => {
    if (cartItem.quantity >= cartItem.stock) return;

    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
  };

  const decrementHandler = (cartItem: CartItemType) => {
    if (cartItem.quantity <= 1) return;

    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
  };

  const removeHandler = (productId: string) => {
    dispatch(removeCartItem(productId));
  };

  useEffect(() => {
    const { token: cancelToken, cancel } = axios.CancelToken.source();

    const timeOutId = setTimeout(() => {
      axios
        .get(`${server}/api/v1/payment/discount?code=${couponCode}`, {
          cancelToken,
        })
        .then((res) => {
          dispatch(applyDiscount(res.data.discount));
          setIsValidCoupon(true);
          dispatch(calculatePrice());
        })
        .catch(() => {
          dispatch(applyDiscount(0));
          setIsValidCoupon(false);
          dispatch(calculatePrice());
        });
    }, 1000);

    return () => {
      clearTimeout(timeOutId);
      cancel();
      setIsValidCoupon(false);
    };
  }, [couponCode]);

  useEffect(() => {
    // if (cartItems.length) {
    dispatch(calculatePrice());
    // }
    // return;
  }, [cartItems]);

  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? (
          cartItems.map((i, idx) => (
            <CartItemCard
              incrementCartHandler={incrementCartHandler}
              decrementHandler={decrementHandler}
              removeHandler={removeHandler}
              key={idx}
              cartItem={i}
            />
          ))
        ) : (
          <h1>No Items Added</h1>
        )}
      </main>
      <aside>
        <p>Subtotal: ₹{subtotal} </p>
        <p>Shipping Charges: ₹{shippingCharges} </p>
        {/* <p>Tax: ₹{tax} </p> */}
        <p>
          Discount: <em className="red">₹{discount}</em>
        </p>
        <p>
          <b>Total: ₹{total}</b>
        </p>

        <input
          type="text"
          placeholder="Coupon Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />

        {couponCode &&
          (isValid ? (
            <span className="green">
              ₹{discount} off using <code>{couponCode}</code>
            </span>
          ) : (
            <span className="red">
              Invalid Coupon Code <VscError />
            </span>
          ))}

        {cartItems.length > 0 && <Link to={"/shipping"}>Checkout</Link>}
      </aside>
    </div>
  );
};

export default Cart;
