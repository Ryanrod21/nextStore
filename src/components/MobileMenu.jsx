'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const categories = {
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
        {/* Header */}
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
