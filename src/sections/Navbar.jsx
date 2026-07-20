'use client';

import SearchBar from '../components/SearchBar';
import '../app/nav.css';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef, useEffect } from 'react';
import Cart from './Cart';
import { useCart } from '@/app/context/CartContext';
import { usePathname } from 'next/navigation';
import LogoImage from './LogoImg';
import MobileMenu from '@/components/MobileMenu';
import MobileSearch from '@/components/MobileSearch';

function NavBar() {
  const [showCart, setShowCart] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
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
        (ref) => ref.current && !ref.current.contains(event.target),
      );
      if (clickedOutsideAll) setOpenDropdown(null);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const toggleCart = () => setShowCart((prev) => !prev);
  const handleDropdownToggle = (key) =>
    setOpenDropdown((prev) => (prev === key ? null : key));

  return (
    <nav className="navbar">
      {/* ── BRAND ── */}
      <div className="logo-links">
        <Link href="/" className="nav-brand-link">
          <span className="logo">Simple Supplies</span>
        </Link>

        {/* ── NAV LINKS ── */}
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

            <li ref={beautyRef} className="nav-dropdown-toggle">
              <div
                role="button"
                tabIndex={0}
                className={`nav-drop-trigger ${isActive(['/category/beauty', '/category/skin-care', '/category/fragrances', '/category/all-beauty']) ? 'active' : ''}`}
                onClick={() => handleDropdownToggle('beauty')}
              >
                Beauty{' '}
                <span className="drop-arrow">
                  {openDropdown === 'beauty' ? '▴' : '▾'}
                </span>
              </div>
              {openDropdown === 'beauty' && (
                <ul className="nav-dropdown-menu">
                  <li className="nav-cat-li">
                    <Link
                      href="/category/beauty"
                      onClick={() => setOpenDropdown(null)}
                    >
                      Beauty
                    </Link>
                  </li>
                  <li className="nav-cat-li">
                    <Link
                      href="/category/skin-care"
                      onClick={() => setOpenDropdown(null)}
                    >
                      Skin care
                    </Link>
                  </li>
                  <li className="nav-cat-li">
                    <Link
                      href="/category/fragrances"
                      onClick={() => setOpenDropdown(null)}
                    >
                      Fragrances
                    </Link>
                  </li>
                  <li className="nav-cat-li">
                    <Link
                      href="/category/all-beauty"
                      onClick={() => setOpenDropdown(null)}
                    >
                      All beauty
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li ref={mensFashionRef} className="nav-dropdown-toggle">
              <div
                role="button"
                tabIndex={0}
                className={`nav-drop-trigger ${isActive(['/category/watches', '/category/mens-shirts', '/category/mens-shoes', '/category/all-fashion']) ? 'active' : ''}`}
                onClick={() => handleDropdownToggle('mens-fashion')}
              >
                Men's fashion{' '}
                <span className="drop-arrow">
                  {openDropdown === 'mens-fashion' ? '▴' : '▾'}
                </span>
              </div>
              {openDropdown === 'mens-fashion' && (
                <ul className="nav-dropdown-menu">
                  <li className="nav-cat-li">
                    <Link
                      href="/category/mens-shoes"
                      onClick={() => setOpenDropdown(null)}
                    >
                      Shoes
                    </Link>
                  </li>
                  <li className="nav-cat-li">
                    <Link
                      href="/category/mens-shirts"
                      onClick={() => setOpenDropdown(null)}
                    >
                      Shirts
                    </Link>
                  </li>
                  <li className="nav-cat-li">
                    <Link
                      href="/category/mens-watches"
                      onClick={() => setOpenDropdown(null)}
                    >
                      Watches
                    </Link>
                  </li>
                  <li className="nav-cat-li">
                    <Link
                      href="/category/mens-fashion"
                      onClick={() => setOpenDropdown(null)}
                    >
                      All men's fashion
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li ref={homeEssentialsRef} className="nav-dropdown-toggle">
              <div
                role="button"
                tabIndex={0}
                className={`nav-drop-trigger ${isActive(['/category/furniture', '/category/home-decoration', '/category/kitchen-accessories', '/category/all-furniture']) ? 'active' : ''}`}
                onClick={() => handleDropdownToggle('home-essentials')}
              >
                Home essentials{' '}
                <span className="drop-arrow">
                  {openDropdown === 'home-essentials' ? '▴' : '▾'}
                </span>
              </div>
              {openDropdown === 'home-essentials' && (
                <ul className="nav-dropdown-menu">
                  <li className="nav-cat-li">
                    <Link
                      href="/category/furniture"
                      onClick={() => setOpenDropdown(null)}
                    >
                      Furniture
                    </Link>
                  </li>
                  <li className="nav-cat-li">
                    <Link
                      href="/category/home-decoration"
                      onClick={() => setOpenDropdown(null)}
                    >
                      Home decoration
                    </Link>
                  </li>
                  <li className="nav-cat-li">
                    <Link
                      href="/category/kitchen-accessories"
                      onClick={() => setOpenDropdown(null)}
                    >
                      Kitchen accessories
                    </Link>
                  </li>
                  <li className="nav-cat-li">
                    <Link
                      href="/category/all-furniture"
                      onClick={() => setOpenDropdown(null)}
                    >
                      All home essentials
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li ref={electronicRef} className="nav-dropdown-toggle">
              <div
                role="button"
                tabIndex={0}
                className={`nav-drop-trigger ${isActive(['/category/laptops', '/category/mobile-accessories', '/category/smartphones', '/category/all-electronics']) ? 'active' : ''}`}
                onClick={() => handleDropdownToggle('electronics')}
              >
                Electronics{' '}
                <span className="drop-arrow">
                  {openDropdown === 'electronics' ? '▴' : '▾'}
                </span>
              </div>
              {openDropdown === 'electronics' && (
                <ul className="nav-dropdown-menu">
                  <li className="nav-cat-li">
                    <Link
                      href="/category/laptops"
                      onClick={() => setOpenDropdown(null)}
                    >
                      Laptops
                    </Link>
                  </li>
                  <li className="nav-cat-li">
                    <Link
                      href="/category/mobile-accessories"
                      onClick={() => setOpenDropdown(null)}
                    >
                      Mobile accessories
                    </Link>
                  </li>
                  <li className="nav-cat-li">
                    <Link
                      href="/category/smartphones"
                      onClick={() => setOpenDropdown(null)}
                    >
                      Smartphones
                    </Link>
                  </li>
                  <li className="nav-cat-li">
                    <Link
                      href="/category/all-electronics"
                      onClick={() => setOpenDropdown(null)}
                    >
                      All electronics
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li ref={womensFashionRef} className="nav-dropdown-toggle">
              <div
                role="button"
                tabIndex={0}
                className={`nav-drop-trigger ${isActive(['/category/womens-dresses', '/category/womens-bags', '/category/womens-jewellery', '/category/womens-shoes', '/category/womens-watches', '/category/tops', '/category/womens-fashion']) ? 'active' : ''}`}
                onClick={() => handleDropdownToggle('womens-fashion')}
              >
                Women's fashion{' '}
                <span className="drop-arrow">
                  {openDropdown === 'womens-fashion' ? '▴' : '▾'}
                </span>
              </div>
              {openDropdown === 'womens-fashion' && (
                <ul className="nav-dropdown-menu">
                  <li className="nav-cat-li">
                    <Link
                      href="/category/womens-dresses"
                      onClick={() => setOpenDropdown(null)}
                    >
                      Dresses
                    </Link>
                  </li>
                  <li className="nav-cat-li">
                    <Link
                      href="/category/womens-bags"
                      onClick={() => setOpenDropdown(null)}
                    >
                      Bags
                    </Link>
                  </li>
                  <li className="nav-cat-li">
                    <Link
                      href="/category/womens-jewellery"
                      onClick={() => setOpenDropdown(null)}
                    >
                      Jewellery
                    </Link>
                  </li>
                  <li className="nav-cat-li">
                    <Link
                      href="/category/womens-shoes"
                      onClick={() => setOpenDropdown(null)}
                    >
                      Shoes
                    </Link>
                  </li>
                  <li className="nav-cat-li">
                    <Link
                      href="/category/womens-watches"
                      onClick={() => setOpenDropdown(null)}
                    >
                      Watches
                    </Link>
                  </li>
                  <li className="nav-cat-li">
                    <Link
                      href="/category/tops"
                      onClick={() => setOpenDropdown(null)}
                    >
                      Tops
                    </Link>
                  </li>
                  <li className="nav-cat-li">
                    <Link
                      href="/category/womens-fashion"
                      onClick={() => setOpenDropdown(null)}
                    >
                      All women's fashion
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li ref={vehiclesRef} className="nav-dropdown-toggle">
              <div
                role="button"
                tabIndex={0}
                className={`nav-drop-trigger ${isActive(['/category/motorcycle', '/category/vehicle', '/category/all-vehicle']) ? 'active' : ''}`}
                onClick={() => handleDropdownToggle('vehicles')}
              >
                Vehicles{' '}
                <span className="drop-arrow">
                  {openDropdown === 'vehicles' ? '▴' : '▾'}
                </span>
              </div>
              {openDropdown === 'vehicles' && (
                <ul className="nav-dropdown-menu">
                  <li className="nav-cat-li">
                    <Link
                      href="/category/motorcycle"
                      onClick={() => setOpenDropdown(null)}
                    >
                      Motorcycle
                    </Link>
                  </li>
                  <li className="nav-cat-li">
                    <Link
                      href="/category/vehicle"
                      onClick={() => setOpenDropdown(null)}
                    >
                      Vehicles
                    </Link>
                  </li>
                  <li className="nav-cat-li">
                    <Link
                      href="/category/all-vehicles"
                      onClick={() => setOpenDropdown(null)}
                    >
                      All vehicles
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li ref={accessoriesRef} className="nav-dropdown-toggle">
              <div
                role="button"
                tabIndex={0}
                className={`nav-drop-trigger ${isActive(['/category/sunglasses', '/category/sports-accessories', '/category/sport-accessories_glasses']) ? 'active' : ''}`}
                onClick={() => handleDropdownToggle('accessories')}
              >
                Accessories{' '}
                <span className="drop-arrow">
                  {openDropdown === 'accessories' ? '▴' : '▾'}
                </span>
              </div>
              {openDropdown === 'accessories' && (
                <ul className="nav-dropdown-menu">
                  <li className="nav-cat-li">
                    <Link
                      href="/category/sunglasses"
                      onClick={() => setOpenDropdown(null)}
                    >
                      Sunglasses
                    </Link>
                  </li>
                  <li className="nav-cat-li">
                    <Link
                      href="/category/sports-accessories"
                      onClick={() => setOpenDropdown(null)}
                    >
                      Sports accessories
                    </Link>
                  </li>
                  <li className="nav-cat-li">
                    <Link
                      href="/category/all-accessories"
                      onClick={() => setOpenDropdown(null)}
                    >
                      All accessories
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      </div>

      {/* ── RIGHT SIDE: SEARCH + CART ── */}
      <div className="cart-search">
        <div className="nav-cart">
          <MobileSearch />
          <SearchBar />

          <button className="nav-cart-btn" onClick={toggleCart}>
            <FontAwesomeIcon icon={faCartShopping} />
            Cart
            <span className="nav-cart-badge">{totalItems}</span>
          </button>

          <Cart showCart={showCart} toggleCart={toggleCart} />
          {showCart && <div className="cart-overlay" onClick={toggleCart} />}
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
