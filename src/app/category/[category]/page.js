'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { getCategoryProducts } from '@/api/storeapi';
import '../../globals.css';
import Link from 'next/link';
import Image from 'next/image';
import StarRating from '@/components/StarRating';
import { useCart } from '@/app/context/CartContext';

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
  'all-accessories': ['sunglasses', 'sports-accessories'],
  'all-beauty': ['beauty', 'skin-care', 'fragrances'],
  'all-vehicles': ['motorcycle', 'vehicle'],
};

const categoryTitleMap = {
  'womens-fashion': "Women's fashion",
  'mens-fashion': "Men's fashion",
  'all-electronics': 'Electronics',
  'all-furniture': 'Home essentials',
  'all-accessories': 'Accessories',
  'all-beauty': 'Beauty',
  'all-vehicles': 'Vehicles',
};

const categoryEmojiMap = {
  groceries: '🛒',
  beauty: '💄',
  'skin-care': '🧴',
  fragrances: '🌸',
  'all-beauty': '✨',
  'mens-fashion': '👔',
  'womens-fashion': '👗',
  'all-electronics': '💻',
  'all-furniture': '🪑',
  'all-accessories': '🕶️',
  'all-vehicles': '🚗',
};

export default function CategoryPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedProducts, setAddedProducts] = useState({});
  const [sortBy, setSortBy] = useState('default');
  const params = useParams();
  const categoryParam = params.category;
  const { addToCart } = useCart();

  const categories = useMemo(() => {
    return categorySlugMap[categoryParam] || categoryParam.split('_');
  }, [categoryParam]);

  const displayTitle = useMemo(() => {
    return (
      categoryTitleMap[categoryParam] ||
      categoryParam
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
    );
  }, [categoryParam, categories]);

  const emoji = categoryEmojiMap[categoryParam] || '🏷️';

  useEffect(() => {
    async function fetchAllCategoryProducts() {
      try {
        const allProducts = [];
        for (const cat of categories) {
          const data = await getCategoryProducts(cat);
          if (data?.products) allProducts.push(...data.products);
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

  const sortedProducts = useMemo(() => {
    const p = [...products];
    if (sortBy === 'price-asc') return p.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') return p.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') return p.sort((a, b) => b.rating - a.rating);
    return p;
  }, [products, sortBy]);

  const topRated = useMemo(
    () =>
      [...products]
        .filter((i) => i.rating && typeof i.rating === 'number')
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3),
    [products],
  );

  const grouped = useMemo(
    () =>
      sortedProducts.reduce((acc, product) => {
        if (!acc[product.category]) acc[product.category] = [];
        acc[product.category].push(product);
        return acc;
      }, {}),
    [sortedProducts],
  );

  if (loading) return <div className="cat-loading">Loading...</div>;

  const avgRating =
    products.length > 0
      ? (products.reduce((s, p) => s + p.rating, 0) / products.length).toFixed(
          1,
        )
      : '—';

  const inStockCount = products.filter(
    (p) =>
      p.availabilityStatus === 'In Stock' ||
      p.availabilityStatus === 'Low Stock',
  ).length;

  return (
    <div className="cat-page">
      {/* HERO HEADER */}
      <div className="cat-hero">
        <div className="cat-hero-inner">
          <div className="cat-hero-left">
            <div className="cat-hero-emoji">{emoji}</div>
            <div>
              <h1 className="cat-hero-title">{displayTitle}</h1>
              <p className="cat-hero-sub">
                {products.length} products available
              </p>
            </div>
          </div>
          <div className="cat-hero-right">
            <div className="cat-stat">
              <div className="cat-stat-num">{products.length}</div>
              <div className="cat-stat-lbl">Products</div>
            </div>
            <div className="cat-stat">
              <div className="cat-stat-num">
                {avgRating}
                <span className="cat-stat-suffix">★</span>
              </div>
              <div className="cat-stat-lbl">Avg rating</div>
            </div>
            <div className="cat-stat">
              <div className="cat-stat-num">{inStockCount}</div>
              <div className="cat-stat-lbl">In stock</div>
            </div>
          </div>
        </div>
      </div>

      {/* TOP RATED */}
      {topRated.length > 0 && (
        <section className="top-rated-section">
          <div className="section-header">
            <h2 className="section-title">
              Top rated in {displayTitle.toLowerCase()}
            </h2>
          </div>
          <div className="feat-grid">
            {topRated.map((item) => (
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
      )}

      {/* SORT BAR */}
      <div className="cat-sort-bar">
        <div className="cat-sort-inner">
          <span className="cat-sort-label">Sort by</span>
          <div className="cat-sort-pills">
            {[
              { key: 'default', label: 'Featured' },
              { key: 'rating', label: 'Top rated' },
              { key: 'price-asc', label: 'Price: low → high' },
              { key: 'price-desc', label: 'Price: high → low' },
            ].map(({ key, label }) => (
              <button
                key={key}
                className={`cat-sort-pill ${sortBy === key ? 'active' : ''}`}
                onClick={() => setSortBy(key)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* PRODUCTS */}
      {Object.entries(grouped).map(([categoryName, items]) => (
        <section className="category-section" key={categoryName}>
          <div className="section-header">
            <h2 className="section-title">
              {categoryName
                .split('-')
                .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                .join(' ')}
              <span className="cat-sub-count">{items.length}</span>
            </h2>
            <Link href={`/category/${categoryName}`} className="section-more">
              Shop all →
            </Link>
          </div>
          <div className="prod-grid">
            {items.map((item) => (
              <div className="prod-card" key={item.id}>
                <Link href={`/product/${item.id}`}>
                  <div className="prod-img-wrap">
                    <Image
                      src={item.images[0]}
                      alt={item.title}
                      width={400}
                      height={400}
                      style={{ objectFit: 'contain' }}
                      unoptimized
                    />
                    <span
                      className={`stock-dot ${
                        item.availabilityStatus === 'In Stock'
                          ? 'stock-dot--in'
                          : item.availabilityStatus === 'Low Stock'
                            ? 'stock-dot--low'
                            : 'stock-dot--out'
                      }`}
                    />
                  </div>
                </Link>
                <div className="prod-body">
                  <p className="prod-name">{item.title}</p>
                  <p className="prod-price">
                    $
                    {item.price.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                  <div className="prod-meta">
                    <StarRating rating={item.rating} />
                    <span
                      className={`availability-badge ${
                        item.availabilityStatus === 'In Stock'
                          ? 'availability-badge--in'
                          : item.availabilityStatus === 'Low Stock'
                            ? 'availability-badge--low'
                            : 'availability-badge--out'
                      }`}
                    >
                      {item.availabilityStatus}
                    </span>
                  </div>
                  {addedProducts[item.id] ? (
                    <div className="added-confirm">
                      <span className="added-check">✓</span> Added to cart
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="prod-add-btn"
                      disabled={
                        item.availabilityStatus !== 'In Stock' &&
                        item.availabilityStatus !== 'Low Stock'
                      }
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
      ))}
    </div>
  );
}
