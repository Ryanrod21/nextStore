import { useCart } from '@/app/context/CartContext';
import '../app/globals.css';

function Cart({ toggleCart, showCart }) {
  const { cartItems, removeFromCart } = useCart(); // ✅ Use from context

  const handleClickInside = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className={`cart-page ${showCart ? 'show' : ''}`}
      onClick={handleClickInside}
    >
      <h1>Your Cart </h1>
      <div className="cart-container">
        {cartItems.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.thumbnail} />
              <p>{item.title}</p>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))
        )}
      </div>
      <button>
        <a href="/checkout">Check out</a>
      </button>
      <button onClick={toggleCart}>Close Cart</button>
    </div>
  );
}

export default Cart;
