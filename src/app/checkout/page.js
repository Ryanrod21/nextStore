'use client';

import { useState } from 'react';
import { useCart } from '../context/CartContext';
import './checkout.css';
import '../globals.css';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

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
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '200px',
        width: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
        }}
      ></div>

      <div className="checkout-container">
        <div className="checkout-body">
          {cartItems.length === 0 ? (
            <p className="cart-noItems">No items in cart</p>
          ) : (
            cartItems.map((item) => (
              <div className="checkout-item" key={item.id}>
                <Link href={`/product/${item.id}`}>
                  <Image
                    src={item.thumbnail}
                    alt={`Thumbnail of product ${item.id}`}
                    width={200} // specify width
                    height={200} // specify height
                    style={{ objectFit: 'cover' }}
                    unoptimized // add if image is external and domain not configured
                  />
                </Link>
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
                  {item.quantity === 1 ? (
                    <button
                      style={{ backgroundColor: 'red' }}
                      id="add-subtract"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        style={{ fontSize: '20px' }}
                      />
                    </button>
                  ) : (
                    <button
                      style={{ backgroundColor: 'white', color: 'black' }}
                      id="add-subtract"
                      onClick={() =>
                        updateQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                    >
                      <FontAwesomeIcon
                        icon={faMinus}
                        style={{ fontSize: '20px' }}
                      />
                    </button>
                  )}
                  <span>{item.quantity}</span>
                  <button
                    id="add-subtract"
                    onClick={() =>
                      updateQuantity(item.id, Math.min(15, item.quantity + 1))
                    }
                    disabled={item.quantity >= 15}
                  >
                    <FontAwesomeIcon
                      icon={faPlus}
                      style={{ fontSize: '20px' }}
                    />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="checkout-price">
          <h1 style={{ marginBottom: '0' }}>Items in Cart:</h1>
          <p style={{ fontSize: '26px', fontWeight: 'bold' }}>{totalItems}</p>
          <h3 style={{ color: 'black' }}>Total Price:</h3>
          <p style={{ fontSize: '18px' }}>
            $
            {totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
          {!showThankYou && (
            <button
              className="checkout-btn"
              onClick={handleCheckout}
              disabled={cartItems.length === 0}
            >
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
