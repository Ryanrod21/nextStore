'use client';

import { useEffect, useState } from 'react';
import { getAllCategory, getAllProducts } from '@/api/storeapi';
import '../app/globals.css';
import Link from 'next/link';
import Image from 'next/image';
import StarRating from '@/components/StarRating';
import { useCart } from '@/app/context/CartContext';

const categoryGroups = [
  {
    title: 'Groceries',
    categories: ['groceries'],
    link: 'groceries',
    linkText: 'Look for more Groceries',
  },
  {
    title: 'Beauty',
    categories: ['beauty', 'skin-care', 'fragrances'],
    link: 'all-beauty',
    linkText: 'Look for more Beauty',
  },
  {
    title: 'For Mens!',
    categories: ['mens-shirts', 'mens-shoes', 'mens-watches'],
    link: 'mens-fashion',
    linkText: "Look for more Men's Fashion",
  },
  {
    title: 'For your Home!',
    categories: ['furniture', 'home-decoration', 'kitchen-accessories'],
    link: 'all-furniture',
    linkText: 'Look for more Furniture',
  },
  {
    title: 'Electronics For You!',
    categories: ['laptops', 'mobile-accessories', 'smartphones', 'tablets'],
    link: 'all-electronics',
    linkText: 'Shop All Electronics',
  },
  {
    title: 'Shop all Womens!',
    categories: [
      'womens-bags',
      'womens-dresses',
      'womens-jewellery',
      'womens-shoes',
      'womens-watches',
      'tops',
    ],
    link: 'womens-fashion',
    linkText: "Look for more Women's Fashion",
  },
  {
    title: 'Shop Vehicles!',
    categories: ['motorcycle', 'vehicle'],
    link: 'all-vehicles',
    linkText: 'Look for all Vehicles',
  },
  {
    title: 'Shop Sports Accessories and Glasses!',
    categories: ['sunglasses', 'sports-accessories'],
    link: 'sport-accessories_glasses',
    linkText: 'Look for all Sports Accessories and Glasses',
  },
];

function MainHero() {
  const [product, setProduct] = useState([]);
  const { addToCart } = useCart();
  const [addedProducts, setAddedProducts] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getAllProducts();
        const allCategories = await getAllCategory();
        console.log('All categories available:', allCategories);
        setProduct(data.products);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, []);

  return (
    <div className="main-page">
      {/* ── TOP RATED STRIP ── */}
      <section className="top-rated-section">
        <div className="section-header">
          <h2 className="section-title">Top rated</h2>
          <span className="section-more">View all →</span>
        </div>
        <div className="feat-grid">
          {product
            .filter((item) => item.rating && typeof item.rating === 'number')
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 3)
            .map((item) => (
              <div className="feat-card" key={item.id}>
                <Link href={`/product/${item.id}`}>
                  <div className="feat-img-wrap">
                    <Image
                      src={item.images[0]}
                      alt={item.title}
                      width={72}
                      height={72}
                      style={{ objectFit: 'contain' }}
                      unoptimized
                    />
                  </div>
                </Link>
                <div className="feat-body">
                  <p className="feat-name">{item.title}</p>
                  <StarRating rating={item.rating} />
                </div>
                <span className="feat-badge">Top pick</span>
              </div>
            ))}
        </div>
      </section>

      {/* ── CATEGORY SECTIONS ── */}
      {categoryGroups.map(({ title, categories, link, linkText }) => {
        const isBeauty = title.toLowerCase().includes('beauty');

        return (
          <section
            className={`category-section ${isBeauty ? 'category-section--dark' : ''}`}
            key={link}
          >
            <div className="section-header">
              <h2 className="section-title">{title}</h2>
              <Link href={`category/${link}`} className="section-more">
                {linkText} →
              </Link>
            </div>

            <div className="prod-grid">
              {product
                .filter((item) => categories.includes(item.category))
                .slice(0, 4)
                .map((items) => (
                  <div
                    className={`prod-card ${isBeauty ? 'prod-card--dark' : ''}`}
                    key={items.id}
                  >
                    <Link href={`/product/${items.id}`}>
                      <div className="prod-img-wrap">
                        <Image
                          src={items.images[0]}
                          alt={items.title}
                          width={400}
                          height={400}
                          style={{ objectFit: 'contain' }}
                          unoptimized
                        />
                        <span
                          className={`stock-dot ${
                            items.availabilityStatus === 'In Stock'
                              ? 'stock-dot--in'
                              : items.availabilityStatus === 'Low Stock'
                                ? 'stock-dot--low'
                                : 'stock-dot--out'
                          }`}
                        />
                      </div>
                    </Link>

                    <div className="prod-body">
                      <p className="prod-name">{items.title}</p>
                      <p className="prod-price">
                        $
                        {items.price.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                      <div className="prod-meta">
                        <StarRating rating={items.rating} />
                        <span
                          className={`availability-badge ${
                            items.availabilityStatus === 'In Stock'
                              ? 'availability-badge--in'
                              : items.availabilityStatus === 'Low Stock'
                                ? 'availability-badge--low'
                                : 'availability-badge--out'
                          }`}
                        >
                          {items.availabilityStatus}
                        </span>
                      </div>

                      {addedProducts[items.id] ? (
                        <div className="added-confirm">
                          <span className="added-check">✓</span> Added to cart
                        </div>
                      ) : (
                        <button
                          type="button"
                          className={`prod-add-btn ${isBeauty ? 'prod-add-btn--dark' : ''}`}
                          disabled={
                            items.availabilityStatus !== 'In Stock' &&
                            items.availabilityStatus !== 'Low Stock'
                          }
                          onClick={() => {
                            addToCart(items);
                            setAddedProducts((prev) => ({
                              ...prev,
                              [items.id]: true,
                            }));
                            setTimeout(
                              () =>
                                setAddedProducts((prev) => ({
                                  ...prev,
                                  [items.id]: false,
                                })),
                              4000,
                            );
                          }}
                        >
                          + Add to cart
                        </button>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export default MainHero;
