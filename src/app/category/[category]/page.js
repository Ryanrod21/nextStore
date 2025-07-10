'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { getCategoryProducts } from '@/api/storeapi';
import '../../globals.css';
import Link from 'next/link';
import Image from 'next/image';
import StarRating from '@/components/StarRating';
import { useCart } from '@/app/context/CartContext';

// 1. Slug-to-categories map
const categorySlugMap = {
  'womens-fashion': [
    'womens-dresses',
    'womens-bags',
    'womens-jewellery',
    'womens-shoes',
    'womens-watches',
    'tops',
  ],
  'mens-fashion': ['mens-watches', 'mens-shirts', 'mens-shoes'],
  'all-electronics': [
    'laptops',
    'mobile-accessories',
    'smartphones',
    'tablets',
  ],
  'all-furniture': ['furniture', 'home-decoration', 'kitchen-accessories'],
  'sport-accessories_glasses': ['sunglasses', 'sports-accessories'],
  'all-beauty': ['beauty', 'skin-care', 'fragrances'],
};

// 2. Optional display title map
const categoryTitleMap = {
  'womens-fashion': "Women's Fashion",
  'mens-fashion': "Men's Fashion",
  'all-electronics': 'All Electronics',
  'all-furniture': 'All Furntiure',
  'sport-accessories_glasses': 'All Accessories',
  'all-beauty': 'All Beauty',
};

export default function CategoryPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedProducts, setAddedProducts] = useState({}); // track added state per product
  const params = useParams();
  const categoryParam = params.category;

  const { addToCart } = useCart();

  // 3. Determine real categories based on slug
  const categories = useMemo(() => {
    return categorySlugMap[categoryParam] || categoryParam.split('_');
  }, [categoryParam]);

  // 4. Optional display title (fallback to joined version)
  const displayTitle = useMemo(() => {
    return (
      categoryTitleMap[categoryParam] ||
      categories
        .map((c) =>
          c
            .split('-')
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' ')
        )
        .join(', ')
    );
  }, [categoryParam, categories]);

  useEffect(() => {
    async function fetchAllCategoryProducts() {
      try {
        const allProducts = [];

        for (const cat of categories) {
          const data = await getCategoryProducts(cat);
          if (data?.products) {
            allProducts.push(...data.products);
          }
        }

        setProducts(allProducts);
      } catch (error) {
        console.error('Error loading category:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchAllCategoryProducts();
  }, [categories]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="product-page">
      <h1>{displayTitle}</h1>

      {/* FEATURED SECTION */}
      <div className="featured-container">
        <div className="featured-item">
          <h2>Highly Rated Items:</h2>
          {products
            .filter((item) => item.rating && typeof item.rating === 'number')
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 3)
            .map((item) => (
              <div className="product" key={item.id}>
                <Link href={`/product/${item.id}`}>
                  <Image
                    src={item.images[0]}
                    alt="Product Image"
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

      {/* GROUPED PRODUCTS BY SUBCATEGORY */}
      <div className="product-group-section">
        {Object.entries(
          products.reduce((acc, product) => {
            if (!acc[product.category]) acc[product.category] = [];
            acc[product.category].push(product);
            return acc;
          }, {})
        ).map(([categoryName, items]) => (
          <div key={categoryName} className="subcategory-section">
            <div className="row">
              {items.map((item) => (
                <div className="product" key={item.id}>
                  <Link href={`/product/${item.id}`}>
                    <Image
                      src={item.images[0]}
                      alt="Product Image"
                      width={400}
                      height={400}
                      style={{ objectFit: 'contain' }}
                      unoptimized
                    />
                  </Link>
                  <p>{item.title}</p>
                  <p>
                    $
                    {item.price.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                  <p
                    className={
                      item.availabilityStatus === 'In Stock'
                        ? 'in-stock'
                        : item.availabilityStatus === 'Low Stock'
                        ? 'low-stock'
                        : 'out-of-stock'
                    }
                  >
                    {item.availabilityStatus}
                  </p>

                  <StarRating rating={item.rating} />

                  {addedProducts[item.id] ? (
                    <p className="item-added">Item added to cart!</p>
                  ) : (
                    <div>
                      <button
                        type="button"
                        onClick={() => {
                          addToCart(item);
                          setAddedProducts((prev) => ({
                            ...prev,
                            [item.id]: true,
                          }));
                          setTimeout(
                            () =>
                              setAddedProducts((prev) => ({
                                ...prev,
                                [item.id]: false,
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
            <Link href={`/category/${categoryName}`} className="link-button">
              Shop All{' '}
              {categoryName
                .split('-')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')}{' '}
              <span className="arrow">→</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
