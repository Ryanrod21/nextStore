'use client';

import { useCart } from '../context/CartContext';

function Checkout() {
  const { cartItems, removeFromCart } = useCart();
  return (
    <div>
      Checkout
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
    </div>
  );
}

export default Checkout;
