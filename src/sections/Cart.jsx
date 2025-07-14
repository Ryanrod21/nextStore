import { useCart } from '@/app/context/CartContext';
import '../app/globals.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

function Cart({ toggleCart, showCart }) {
  const { cartItems, removeFromCart, updateQuantity } = useCart(); // ✅ Use from context

  const handleClickInside = (e) => {
    e.stopPropagation();
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div
      className={`cart-page ${showCart ? 'show' : ''}`}
      onClick={handleClickInside}
    >
      <div style={{ width: '100%', backgroundColor: 'black' }}>
        <img src="/logo.png" style={{ width: '168px' }} />
      </div>
      <h1>Your Cart ({totalItems}) </h1>
      <div className="cart-container">
        {cartItems.length === 0 ? (
          <p className="no-items-small-cart">No items in cart</p>
        ) : (
          cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
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
                {item.quantity === 1 ? (
                  <button
                    id="add-subtract"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{ fontSize: '15px' }}
                    />
                  </button>
                ) : (
                  <button
                    id="add-subtract"
                    onClick={() =>
                      updateQuantity(item.id, Math.max(1, item.quantity - 1))
                    }
                  >
                    <FontAwesomeIcon icon={faMinus} />
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
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="cart-buttons">
        <p style={{ color: 'black' }}>
          Total: $
          {totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </p>
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
