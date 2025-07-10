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
  const [openDropdown, setOpenDropdown] = useState(null); // null or a key like 'beauty', 'fashion', etc.
  const { cartItems } = useCart();
  const pathname = usePathname();

  const isActive = (paths) => {
    const pathArray = Array.isArray(paths) ? paths : [paths];
    return pathArray.some((path) => pathname.includes(path));
  };

  const beautyRef = useRef(null);
  const mensFashionRef = useRef(null);
  const homeEssentialsRef = useRef(null);
  const electronicRef = useRef(null);
  const womensFashionRef = useRef(null);
  const vehiclesRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const refs = [
        beautyRef,
        mensFashionRef,
        homeEssentialsRef,
        electronicRef,
        womensFashionRef,
        vehiclesRef,
      ];

      const clickedOutsideAll = refs.every(
        (ref) => ref.current && !ref.current.contains(event.target)
      );

      if (clickedOutsideAll) {
        setOpenDropdown(null);
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

  const handleDropdownToggle = (key) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
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

            <li ref={beautyRef}>
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
                onClick={() => handleDropdownToggle('beauty')}
              >
                Beauty
              </div>
              {openDropdown == 'beauty' && (
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

            <li ref={mensFashionRef}>
              <div
                role="button"
                tabIndex={0}
                className={
                  isActive([
                    '/category/watches',
                    '/category/mens-shirts',
                    '/category/mens-shoes',
                    '/category/all-fashion',
                  ])
                    ? 'active'
                    : ''
                }
                style={{ cursor: 'pointer' }}
                onClick={() => handleDropdownToggle('mens-fashion')}
              >
                Men's Fashion
              </div>
              {openDropdown === 'mens-fashion' && (
                <ul className="nav-dropdown-menu">
                  <li>
                    <Link href="/category/mens-shoes">Shoes </Link>
                  </li>
                  <li>
                    <Link href="/category/mens-shirts">Mens Shirts</Link>
                  </li>
                  <li>
                    <Link href="/category/mens-watches">Mens Watches</Link>
                  </li>
                  <li>
                    <Link href="/category/mens-fashion">All Mens Fashion</Link>
                  </li>
                </ul>
              )}
            </li>

            <li ref={homeEssentialsRef}>
              <div
                role="button"
                tabIndex={0}
                className={
                  isActive([
                    '/category/watches',
                    '/category/mens-shirts',
                    '/category/mens-shoes',
                    '/category/all-fashion',
                  ])
                    ? 'active'
                    : ''
                }
                style={{ cursor: 'pointer' }}
                onClick={() => handleDropdownToggle('home-essentials')}
              >
                Home Essentials
              </div>
              {openDropdown === 'home-essentials' && (
                <ul className="nav-dropdown-menu">
                  <li>
                    <Link href="/category/furniture">Furniture </Link>
                  </li>
                  <li>
                    <Link href="/category/home-decoration">
                      Home Decoration
                    </Link>
                  </li>
                  <li>
                    <Link href="/category/kitchen-accessories">
                      Kitchen Accessories
                    </Link>
                  </li>
                  <li>
                    <Link href="/category/all-furniture">All Furniture</Link>
                  </li>
                </ul>
              )}
            </li>

            <li ref={electronicRef}>
              <div
                role="button"
                tabIndex={0}
                className={
                  isActive([
                    '/category/watches',
                    '/category/mens-shirts',
                    '/category/mens-shoes',
                    '/category/all-fashion',
                  ])
                    ? 'active'
                    : ''
                }
                style={{ cursor: 'pointer' }}
                onClick={() => handleDropdownToggle('electronics')}
              >
                Electronics
              </div>
              {openDropdown === 'electronics' && (
                <ul className="nav-dropdown-menu">
                  <li>
                    <Link href="/category/laptops">Laptops</Link>
                  </li>
                  <li>
                    <Link href="/category/mobile-accessories">
                      Mobile Accessories
                    </Link>
                  </li>
                  <li>
                    <Link href="/category/smartphones">Smartphones</Link>
                  </li>
                  <li>
                    <Link href="/category/all-electronics">
                      All Electronics
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li ref={womensFashionRef}>
              <div
                role="button"
                tabIndex={0}
                className={
                  isActive([
                    '/category/watches',
                    '/category/mens-shirts',
                    '/category/mens-shoes',
                    '/category/all-fashion',
                  ])
                    ? 'active'
                    : ''
                }
                style={{ cursor: 'pointer' }}
                onClick={() => handleDropdownToggle('womens-fashion')}
              >
                Womens Fashion
              </div>
              {openDropdown === 'womens-fashion' && (
                <ul className="nav-dropdown-menu">
                  <li>
                    <Link href="/category/womens-dresses">Womens Dresses</Link>
                  </li>
                  <li>
                    <Link href="/category/womens-bags">Womens Bags</Link>
                  </li>
                  <li>
                    <Link href="/category/womens-jewellery">
                      Womens Jewellery
                    </Link>
                  </li>
                  <li>
                    <Link href="/category/womens-shoes">Womens Shoes</Link>
                  </li>
                  <li>
                    <Link href="/category/womens-watches">Womens Watches</Link>
                  </li>
                  <li>
                    <Link href="/category/tops">Womens Tops</Link>
                  </li>
                  <li>
                    <Link href="/category/womens-fashion">
                      All Womens Fashion
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li ref={vehiclesRef}>
              <div
                role="button"
                tabIndex={0}
                className={
                  isActive([
                    '/category/watches',
                    '/category/mens-shirts',
                    '/category/mens-shoes',
                    '/category/all-fashion',
                  ])
                    ? 'active'
                    : ''
                }
                style={{ cursor: 'pointer' }}
                onClick={() => handleDropdownToggle('vehicles')}
              >
                Vehicles
              </div>
              {openDropdown === 'vehicles' && (
                <ul className="nav-dropdown-menu">
                  <li>
                    <Link href="/category/womens-watches">Motorcycle</Link>
                  </li>
                  <li>
                    <Link href="/category/tops">Vehicles</Link>
                  </li>
                  <li>
                    <Link href="/category/womens-fashion">
                      All Womens Fashion
                    </Link>
                  </li>
                </ul>
              )}
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
