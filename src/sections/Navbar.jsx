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
import LogoImage from './LogoImg';
import MobileMenu from '@/components/MobileMenu';
import MobileSearch from '@/components/MobileSearch';

function NavBar() {
  const [showCart, setShowCart] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // null or a key like 'beauty', 'fashion', etc.
  const { cartItems } = useCart();
  const pathname = usePathname();

  const isActive = (paths) => paths.some((path) => pathname.startsWith(path));

  const beautyRef = useRef(null);
  const mensFashionRef = useRef(null);
  const homeEssentialsRef = useRef(null);
  const electronicRef = useRef(null);
  const womensFashionRef = useRef(null);
  const vehiclesRef = useRef(null);
  const accessoriesRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const refs = [
        beautyRef,
        mensFashionRef,
        homeEssentialsRef,
        electronicRef,
        womensFashionRef,
        vehiclesRef,
        accessoriesRef,
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
      <MobileMenu />
      <div className="logo-links">
        <Link href="/">
          <LogoImage sizes="100px" />
        </Link>
        <div className="nav-link">
          <ul>
            <li>
              <Link
                href="/category/groceries"
                className={isActive(['/category/groceries']) ? 'active' : ''}
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
                  <li>
                    <Link
                      href="/category/all-beauty"
                      onClick={() => setDropdownOpen(false)}
                    >
                      All Beauty
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
                    <Link
                      href="/category/mens-shoes"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Shoes{' '}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/category/mens-shirts"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Mens Shirts
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/category/mens-watches"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Mens Watches
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/category/mens-fashion"
                      onClick={() => setDropdownOpen(false)}
                    >
                      All Mens Fashion
                    </Link>
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
                    '/category/furniture',
                    '/category/home-decoration',
                    '/category/kitchen-accessories',
                    '/category/all-furniture',
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
                    <Link
                      href="/category/furniture"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Furniture{' '}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/category/home-decoration"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Home Decoration
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/category/kitchen-accessories"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Kitchen Accessories
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/category/all-furniture"
                      onClick={() => setDropdownOpen(false)}
                    >
                      All Furniture
                    </Link>
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
                    '/category/laptops',
                    '/category/mobile-accessories',
                    '/category/smartphones',
                    '/category/all-electornics',
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
                    <Link
                      href="/category/laptops"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Laptops
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/category/mobile-accessories"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Mobile Accessories
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/category/smartphones"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Smartphones
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/category/all-electronics"
                      onClick={() => setDropdownOpen(false)}
                    >
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
                    '/category/womens-dresses',
                    '/category/womens-bags',
                    '/category/womens-jewellery',
                    '/category/womens-shoes',
                    '/category/womens-watches',
                    '/category/tops',
                    '/category/womens-fashion',
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
                    <Link
                      href="/category/womens-dresses"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Womens Dresses
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/category/womens-bags"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Womens Bags
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/category/womens-jewellery"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Womens Jewellery
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/category/womens-shoes"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Womens Shoes
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/category/womens-watches"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Womens Watches
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/category/tops"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Womens Tops
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/category/womens-fashion"
                      onClick={() => setDropdownOpen(false)}
                    >
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
                    '/category/motorcycle',
                    '/category/vehicle',
                    '/category/all-vehicle',
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
                    <Link
                      href="/category/motorcycle"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Motorcycle
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/category/vehicle"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Vehicles
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/category/all-vehicles"
                      onClick={() => setDropdownOpen(false)}
                    >
                      All Vehicles
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li ref={accessoriesRef}>
              <div
                role="button"
                tabIndex={0}
                className={
                  isActive([
                    '/category/sunglasses',
                    '/category/sports-accessories',
                    '/category/sport-accessories_glasses',
                  ])
                    ? 'active'
                    : ''
                }
                style={{ cursor: 'pointer' }}
                onClick={() => handleDropdownToggle('accessories')}
              >
                Accessories
              </div>
              {openDropdown === 'accessories' && (
                <ul className="nav-dropdown-menu">
                  <li>
                    <Link
                      href="/category/sunglasses"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Sunglasses
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/category/sports-accessories"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Sports Accessories
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/category/sport-accessories_glasses"
                      onClick={() => setDropdownOpen(false)}
                    >
                      All Accessories
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
          <MobileSearch />
          <SearchBar />

          <div className="all-cart">
            <a className={isActive(['/checkout']) ? 'active' : ''}>
              <FontAwesomeIcon
                icon={faCartShopping}
                size="lg"
                onClick={toggleCart}
                className="cart-icon"
              />
            </a>
            <p className={isActive(['/checkout']) ? 'active' : ''}>
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
