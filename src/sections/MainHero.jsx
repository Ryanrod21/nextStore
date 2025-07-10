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
  const [addedProducts, setAddedProducts] = useState({}); // track added state per product

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
      <div className="main-page-products">
        <div className="featured-container">
          <div className="featured-item">
            <h2>Highly Rated Items:</h2>
            {product
              .filter((item) => item.rating && typeof item.rating === 'number')
              .sort((a, b) => b.rating - a.rating)
              .slice(0, 3)
              .map((item) => (
                <div className="product" key={item.id}>
                  <Link href={`/product/${item.id}`}>
                    <Image
                      src={item.images[0]}
                      alt={item.title}
                      width={400}
                      height={400}
                      style={{ objectFit: 'contain' }}
                      unoptimized
                    />
                  </Link>
                  <p>{item.title}</p>
                  <StarRating rating={item.rating} />
                </div>
              ))}
          </div>
        </div>

        {categoryGroups.map(({ title, categories, link, linkText }) => (
          <div className="product-sub-box" key={link}>
            <h1>{title}</h1>
            <div className="row">
              {product
                .filter((item) => categories.includes(item.category))
                .slice(0, 4)
                .map((items) => (
                  <div className="product" key={items.id}>
                    <Link href={`/product/${items.id}`}>
                      <Image
                        src={items.images[0]}
                        alt={items.title}
                        width={400}
                        height={400}
                        style={{ objectFit: 'contain' }}
                        unoptimized
                      />
                    </Link>
                    <p>{items.title}</p>
                    <p>
                      $
                      {items.price.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                    <p
                      className={
                        items.availabilityStatus === 'In Stock'
                          ? 'in-stock'
                          : items.availabilityStatus === 'Low Stock'
                          ? 'low-stock'
                          : 'out-of-stock'
                      }
                    >
                      {items.availabilityStatus}
                    </p>

                    <StarRating rating={items.rating} />

                    {addedProducts[items.id] ? (
                      <p className="item-added">Item added to cart!</p>
                    ) : (
                      <div>
                        <button
                          type="button"
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
                              4000
                            );
                          }}
                        >
                          Add to Cart
                        </button>
                      </div>
                    )}
                  </div>
                ))}
            </div>
            <Link href={`category/${link}`} className="link-button">
              {linkText} <span className="arrow">→</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainHero;
