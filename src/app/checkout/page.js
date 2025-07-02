'use client';

import { useCart } from '../context/CartContext';

function Checkout() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      {cartItems.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        cartItems.map((item) => (
          <div className="checkout-item" key={item.id}>
            <img src={item.thumbnail} />
            <p>{item.title}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                onClick={() =>
                  updateQuantity(item.id, Math.max(1, item.quantity - 1))
                }
                disabled={item.quantity <= 1}
              >
                −
              </button>
              <span>{item.quantity}</span>
              <button
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
  );
}

export default Checkout;
