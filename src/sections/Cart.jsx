import { useCart } from '@/app/context/CartContext';
import '../app/globals.css';

function Cart({ toggleCart, showCart }) {
  const { cartItems, removeFromCart, updateQuantity } = useCart(); // ✅ Use from context

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
              <p>${(item.price * item.quantity).toFixed(2)}</p>

              <div
                style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
              >
                <button
                  id="add-subtract"
                  onClick={() =>
                    updateQuantity(item.id, Math.max(1, item.quantity - 1))
                  }
                  disabled={item.quantity <= 1}
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button
                  id="add-subtract"
                  onClick={() =>
                    updateQuantity(item.id, Math.min(15, item.quantity + 1))
                  }
                  disabled={item.quantity >= 15}
                >
                  +
                </button>
              </div>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))
        )}
      </div>
      <div className="cart-buttons">
        <button className="checkout">
          <a href="/checkout">Check out</a>
        </button>
        <button className="close-cart" onClick={toggleCart}>
          Close Cart
        </button>
      </div>
    </div>
  );
}

export default Cart;
