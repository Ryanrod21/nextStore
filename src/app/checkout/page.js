'use client';

import { useState } from 'react';
import { useCart } from '../context/CartContext';
import './checkout.css';

function Checkout() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const [showThankYou, setShowThankYou] = useState(false);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    clearCart();
    setShowThankYou(true);
    setTimeout(() => setShowThankYou(false), 3000);
  };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <img src="/logo.png" style={{ width: '400px' }} />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
        }}
      >
        <h1>Items in Cart:</h1>
        <p style={{ fontSize: '22px' }}>{totalItems}</p>
      </div>

      <div className="checkout-container">
        <div className="checkout-body">
          {cartItems.length === 0 ? (
            <p>No items in cart</p>
          ) : (
            cartItems.map((item) => (
              <div className="checkout-item" key={item.id}>
                <img src={item.thumbnail} />
                <p>{item.title}</p>
                <p>
                  {' '}
                  $
                  {(item.price * item.quantity).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
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
        <div className="checkout-price">
          <h3 style={{ color: 'black' }}>Total Price:</h3>
          <p>
            $
            {totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
          {!showThankYou && (
            <button onClick={handleCheckout} disabled={cartItems.length === 0}>
              Checkout
            </button>
          )}
          {showThankYou && <div>Thank you for your purchase! </div>}
        </div>
      </div>
    </div>
  );
}

export default Checkout;
