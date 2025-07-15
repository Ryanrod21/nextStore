'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const categories = {
  groceries: [{ name: 'Groceries', path: '/category/groceries' }],
  beauty: [
    { name: 'Beauty', path: '/category/beauty' },
    { name: 'Skin Care', path: '/category/skin-care' },
    { name: 'Fragrances', path: '/category/fragrances' },
    { name: 'All Beauty', path: '/category/all-beauty' },
  ],
  fashion: [
    { name: 'Shoes', path: '/category/mens-shoes' },
    { name: 'Shirts', path: '/category/mens-shirts' },
    { name: 'Watches', path: '/category/mens-watches' },
    { name: 'All Fashion', path: '/category/mens-fashion' },
  ],
  homeEssentials: [
    { name: 'Furniture', path: '/category/furniture' },
    { name: 'Home Decoration', path: '/category/home-decoration' },
    { name: 'Kitchen Accessories', path: '/category/kitchen-accessories' },
    { name: 'All Furniture', path: '/category/all-furniture' },
  ],
  electronics: [
    { name: 'laptops', path: '/category/laptops' },
    { name: 'Mobile Accessories', path: '/category/mobile-accessories' },
    { name: 'Smartphones', path: '/category/smartphones' },
    { name: 'All Electornics', path: '/category/all-electronics' },
  ],
  womanFashion: [
    { name: 'Dresses', path: '/category/dresses' },
    { name: 'Women Bags', path: '/category/womens-bags' },
    { name: 'Women Jewellery', path: '/category/womens-jewellery' },
    { name: 'Women Shoes', path: '/category/womens-shoes' },
    { name: 'Women Watches', path: '/category/womens-watches' },
    { name: 'Women Tops', path: '/category/tops' },
    { name: 'All Women Fashion', path: '/category/womens-fashion' },
  ],
  vehicles: [
    { name: 'Motorcycle', path: '/category/motorcylce' },
    { name: 'Vehicles', path: '/category/vehicles' },
    { name: 'All Vehicles', path: '/category/all-vehicles' },
  ],
  accessories: [
    { name: 'Sunglasses', path: '/category/sunglasses' },
    { name: 'Sports Accessories', path: '/category/sports-accessories' },
    {
      name: 'All Accessories',
      path: '/category/all-accessories',
    },
  ],
};

export default function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className="mobile-menu-container">
      <FontAwesomeIcon
        icon={faBars}
        size="xl"
        onClick={() => setIsMenuOpen(true)}
        className="mobile-menu-hamburger"
      />

      <div
        className={`mobile-menu-sidebar ${
          isMenuOpen ? 'mobile-menu-open' : 'mobile-menu-closed'
        }`}
      >
        <div className="mobile-menu-header">
          <h2 className="mobile-menu-title">Menu</h2>
          <FontAwesomeIcon
            icon={faTimes}
            size="lg"
            onClick={() => {
              setIsMenuOpen(false);
              setSelectedCategory(null);
            }}
            className="mobile-menu-close-icon"
          />
        </div>

        <ul
          className={`mobile-menu-category-list ${
            selectedCategory ? 'hidden' : ''
          }`}
        >
          {Object.keys(categories).map((catKey) => (
            <li
              key={catKey}
              className="mobile-menu-category-item"
              onClick={() => setSelectedCategory(catKey)}
            >
              {catKey.charAt(0).toUpperCase() + catKey.slice(1)}
            </li>
          ))}
        </ul>

        <div
          className={`mobile-menu-subcategory-list ${
            selectedCategory ? '' : 'hidden'
          }`}
        >
          <button
            className="mobile-menu-back-button"
            onClick={() => setSelectedCategory(null)}
          >
            ← Back to Categories
          </button>
          <ul>
            {selectedCategory &&
              categories[selectedCategory].map((item) => (
                <li key={item.path} className="mobile-menu-subcategory-item">
                  <Link href={item.path} onClick={() => setIsMenuOpen(false)}>
                    {item.name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
