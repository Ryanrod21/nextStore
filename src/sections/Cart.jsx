function Cart({ toggleCart, showCart }) {
  const handleClickInside = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className={`cart-page ${showCart ? 'show' : ''}`}
      onClick={handleClickInside}
    >
      <h1>Your Cart</h1>
      <button onClick={toggleCart}>Close Cart</button>
    </div>
  );
}

export default Cart;
