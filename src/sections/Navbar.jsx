'use client';

import SearchBar from '../components/SearchBar';
import '../app/globals.css';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef, useEffect } from 'react';
import Cart from './Cart';
import { useCart } from '@/app/context/CartContext';
import { usePathname } from 'next/navigation'; // ✅ Correct for App Router

function NavBar() {
  const [showCart, setShowCart] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { cartItems } = useCart();

  const pathname = usePathname();

  const isActive = (paths) => {
    const pathArray = Array.isArray(paths) ? paths : [paths];
    return pathArray.some((path) => pathname.includes(path));
  };

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
              <Link
                href="/category/groceries"
                className={isActive('/category/groceries') ? 'active' : ''}
              >
                Groceries
              </Link>
            </li>
            <li ref={dropdownRef}>
              <div
                role="button"
                tabIndex={0}
                className={
                  isActive([
                    '/category/beauty',
                    '/category/skin-care',
                    '/category/fragrances',
                    '/category/all-beauty',
                  ])
                    ? 'active'
                    : ''
                }
                style={{ cursor: 'pointer' }}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Beauty
              </div>
              {dropdownOpen && (
                <ul className="nav-dropdown-menu">
                  <li>
                    <Link
                      href="/category/beauty"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Beauty
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/category/skin-care"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Skin Care
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/category/fragrances"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Fragrances
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <Link
                href="/category/fragrances"
                className={isActive('/category/fragrances') ? 'active' : ''}
              >
                Fragrances
              </Link>
            </li>
            <li>
              <Link
                href="/category/furniture"
                className={isActive('/category/furniture') ? 'active' : ''}
              >
                Furniture
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="cart-search">
        <div className="nav-cart">
          <SearchBar />

          <div className="all-cart">
            <a className={isActive('/checkout') ? 'active' : ''}>
              <FontAwesomeIcon
                icon={faCartShopping}
                size="lg"
                onClick={toggleCart}
                className="cart-icon"
              />
            </a>
            <p className={isActive('/checkout') ? 'active' : ''}>
              ({totalItems})
            </p>
          </div>

          <Cart showCart={showCart} toggleCart={toggleCart} />
          {showCart && (
            <div className="cart-overlay" onClick={toggleCart}></div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
