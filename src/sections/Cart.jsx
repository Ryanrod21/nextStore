import { useCart } from '@/app/context/CartContext';
import '../app/cart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash,
  faMinus,
  faPlus,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

function Cart({ toggleCart, showCart }) {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const handleClickInside = (e) => e.stopPropagation();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const delivery = totalPrice >= 30 ? 0 : 4.99;

  return (
    <div
      className={`cart-page ${showCart ? 'show' : ''}`}
      onClick={handleClickInside}
    >
      {/* ── HEADER ── */}
      <div className="cart-head">
        <div>
          <h2 className="cart-head-title">Your cart</h2>
          <p className="cart-head-sub">
            {totalItems} {totalItems === 1 ? 'item' : 'items'}
          </p>
        </div>
        <button
          className="close-cart"
          onClick={toggleCart}
          aria-label="Close cart"
        >
          ✕
        </button>
      </div>

      {/* ── ITEMS ── */}
      <div className="cart-container">
        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty-icon">🛒</div>
            <p className="cart-empty-title">Your cart is empty</p>
            <p className="cart-empty-sub">Add products to get started.</p>
          </div>
        ) : (
          cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="cart-item-thumb">
                <img src={item.thumbnail} alt={item.title} />
              </div>
              <div className="cart-item-info">
                <p className="cart-item-name">{item.title}</p>
                <p className="cart-item-price">
                  $
                  {(item.price * item.quantity).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div className="cart-item-qty">
                {item.quantity === 1 ? (
                  <button
                    className="cart-qty-btn cart-qty-btn--delete"
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove item"
                  >
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{ fontSize: '11px' }}
                    />
                  </button>
                ) : (
                  <button
                    className="cart-qty-btn"
                    onClick={() =>
                      updateQuantity(item.id, Math.max(1, item.quantity - 1))
                    }
                    aria-label="Decrease quantity"
                  >
                    <FontAwesomeIcon
                      icon={faMinus}
                      style={{ fontSize: '11px' }}
                    />
                  </button>
                )}
                <span className="cart-qty-num">{item.quantity}</span>
                <button
                  className="cart-qty-btn"
                  onClick={() =>
                    updateQuantity(item.id, Math.min(15, item.quantity + 1))
                  }
                  disabled={item.quantity >= 15}
                  aria-label="Increase quantity"
                >
                  <FontAwesomeIcon icon={faPlus} style={{ fontSize: '11px' }} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ── FOOTER ── */}
      {cartItems.length > 0 && (
        <div className="cart-buttons">
          <div className="cart-summary-row">
            <span>Subtotal</span>
            <span>
              $
              {totalPrice.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
          <div className="cart-summary-row">
            <span>Delivery</span>
            <span className={delivery === 0 ? 'cart-free' : ''}>
              {delivery === 0 ? 'Free' : `$${delivery.toFixed(2)}`}
            </span>
          </div>
          {delivery > 0 && (
            <p className="cart-delivery-hint">
              Add ${(30 - totalPrice).toFixed(2)} more for free delivery
            </p>
          )}
          <div className="cart-total-row">
            <span>Total</span>
            <span>
              $
              {(totalPrice + delivery).toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
          <Link href="/checkout" className="checkout" onClick={toggleCart}>
            Check out{' '}
            <FontAwesomeIcon icon={faArrowRight} style={{ fontSize: '13px' }} />
          </Link>
        </div>
      )}
    </div>
  );
}

export default Cart;
