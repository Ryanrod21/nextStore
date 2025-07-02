'use client';

import SearchBar from '../components/SearchBar';
import '../app/globals.css';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Cart from './Cart';
import { useCart } from '@/app/context/CartContext';

function NavBar() {
  const [showCart, setShowCart] = useState(false);
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const toggleCart = () => {
    setShowCart((prev) => !prev);
  };

  return (
    <nav className="navbar">
      <div className="logo-links">
        <Link href="/">
          <h2 className="logo">Simple Supplies</h2>
        </Link>
        <div className="nav-link">
          <ul>
            <li>
              <Link href={`/category/groceries`}>Groceries</Link>
            </li>
            <li>
              <Link href={`/category/beauty`}>Beauty</Link>
            </li>
            <li>
              <Link href={`/category/fragrances`}>Fragrances</Link>
            </li>
            <li>
              <Link href={`/category/furniture`}>Furniture</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="cart-search">
        <div className="nav-cart">
          <FontAwesomeIcon
            icon={faCartShopping}
            size="lg"
            onClick={toggleCart}
            className="cart-icon"
          />
          <p>({totalItems})</p>
        </div>

        <Cart showCart={showCart} toggleCart={toggleCart} />
        {showCart && <div className="cart-overlay" onClick={toggleCart}></div>}

        <SearchBar />
      </div>
    </nav>
  );
}

export default NavBar;
