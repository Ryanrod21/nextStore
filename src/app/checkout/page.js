'use client';

import { useState } from 'react';
import { useCart } from '../context/CartContext';
import './checkout.css';
import '../globals.css';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

function Checkout() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const [showThankYou, setShowThankYou] = useState(false);

  const router = useRouter();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const delivery = totalPrice >= 30 ? 0 : 4.99;
  const finalTotal = totalPrice + delivery;

  const handleCheckout = () => {
    clearCart();
    setShowThankYou(true);
    router.push('/order-success');
    setTimeout(() => setShowThankYou(false), 3000);
  };

  return (
    <div className="checkout-page">
      {/* ── PAGE HEADER ── */}
      <div className="checkout-header">
        <div className="checkout-header-inner">
          <h1 className="checkout-title">Your cart</h1>
          <span className="checkout-item-count">
            {totalItems} {totalItems === 1 ? 'item' : 'items'}
          </span>
        </div>
      </div>

      <div className="checkout-container">
        {/* ── CART ITEMS ── */}
        <div className="checkout-body">
          {cartItems.length === 0 ? (
            <div className="checkout-empty">
              <div className="checkout-empty-icon">🛒</div>
              <p className="checkout-empty-title">Your cart is empty</p>
              <p className="checkout-empty-sub">
                Add some products to get started.
              </p>
              <Link href="/" className="checkout-empty-btn">
                Browse products
              </Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <div className="checkout-item" key={item.id}>
                <Link
                  href={`/product/${item.id}`}
                  className="checkout-item-img-wrap"
                >
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    width={200}
                    height={200}
                    style={{ objectFit: 'contain' }}
                    unoptimized
                  />
                </Link>

                <div className="checkout-item-info">
                  <p className="checkout-item-name">{item.title}</p>
                  <p className="checkout-item-unit">
                    $
                    {item.price.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}{' '}
                    each
                  </p>
                </div>

                <div className="checkout-item-controls">
                  <div className="checkout-qty">
                    {item.quantity === 1 ? (
                      <button
                        className="checkout-qty-btn checkout-qty-btn--delete"
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Remove item"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    ) : (
                      <button
                        className="checkout-qty-btn"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            Math.max(1, item.quantity - 1),
                          )
                        }
                        aria-label="Decrease quantity"
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                    )}
                    <span className="checkout-qty-num">{item.quantity}</span>
                    <button
                      className="checkout-qty-btn"
                      onClick={() =>
                        updateQuantity(item.id, Math.min(15, item.quantity + 1))
                      }
                      disabled={item.quantity >= 15}
                      aria-label="Increase quantity"
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                  <p className="checkout-item-total">
                    $
                    {(item.price * item.quantity).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ── ORDER SUMMARY (desktop sticky) ── */}
        {cartItems.length > 0 && (
          <div className="checkout-summary">
            <h2 className="checkout-summary-title">Order summary</h2>

            <div className="checkout-summary-rows">
              <div className="checkout-summary-row">
                <span>Subtotal ({totalItems} items)</span>
                <span>
                  $
                  {totalPrice.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="checkout-summary-row">
                <span>Delivery</span>
                <span className={delivery === 0 ? 'checkout-free' : ''}>
                  {delivery === 0 ? 'Free' : `$${delivery.toFixed(2)}`}
                </span>
              </div>
              {delivery === 0 && (
                <div className="checkout-summary-promo">
                  🎉 Free delivery applied
                </div>
              )}
              {delivery > 0 && (
                <div className="checkout-summary-promo checkout-summary-promo--hint">
                  Add ${(30 - totalPrice).toFixed(2)} more for free delivery
                </div>
              )}
            </div>

            <div className="checkout-summary-total">
              <span>Total</span>
              <span>
                $
                {finalTotal.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>

            {showThankYou ? (
              <div className="checkout-thankyou">
                ✓ Order placed! Thank you.
              </div>
            ) : (
              <button
                className="checkout-btn"
                onClick={handleCheckout}
                disabled={cartItems.length === 0}
              >
                Place order
              </button>
            )}

            <p className="checkout-secure">🔒 Secure checkout · Free returns</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Checkout;
