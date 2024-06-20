import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { server } from "../redux/store";
import { CartItemType } from "../types/types";

type cartItemProps = {
  cartItem: CartItemType;
  incrementCartHandler: (cartItem: CartItemType) => void;
  decrementHandler: (cartItem: CartItemType) => void;
  removeHandler: (id: string) => void;
};
const CartItem = ({
  cartItem,
  incrementCartHandler,
  decrementHandler,
  removeHandler,
}: cartItemProps) => {
  
  const { productId, photo, name, price, quantity } = cartItem;
  return (
    <div className="cart-item">
      <img src={`${server}/${photo}`} alt={name} />
      <article>
        <Link to={`/product/${productId}`}>{name}</Link>
        <span>₹{price}</span>
      </article>

      <div>
        <button onClick={() => decrementHandler(cartItem)}>-</button>
        <p>{quantity}</p>
        <button onClick={() => incrementCartHandler(cartItem)}>+</button>
      </div>
      <button onClick={()=>removeHandler(productId)}>
        <FaTrash />
      </button>
    </div>
  );
};

export default CartItem;
