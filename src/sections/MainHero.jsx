'use client';

import { useEffect, useState } from 'react';
import { getAllCategory, getAllProducts } from '@/api/storeapi';
import '../app/globals.css';
import Link from 'next/link';

function MainHero() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getAllProducts();

        console.log(data);

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
      <div style={{ width: '100%', textAlign: 'center' }}>
        <img src="/logo.png" style={{ width: '400px' }} />
      </div>
      <div className="main-page-products">
        <div className="product-sub-box">
          <h1>Groceries</h1>
          <div className="row">
            {product
              .filter((item) => item.category === 'groceries')
              .sort(() => Math.random() - 0.5)
              .slice(0, 3)
              .map((items) => (
                <div className="product" key={items.id}>
                  <Link href={`/product/${items.id}`}>
                    <img src={items.images[0]} />
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
                </div>
              ))}
          </div>
          <Link href={`category/groceries`} className="link-button">
            Look for more Groceries <span className="arrow">→</span>
          </Link>
        </div>

        <div className="product-sub-box">
          <h1>Beuaty</h1>
          <div className="row">
            {product
              .filter((item) => item.category === 'beauty')
              .sort(() => Math.random() - 0.5)
              .slice(0, 3)
              .map((items) => (
                <div className="product" key={items.id}>
                  <Link href={`/product/${items.id}`}>
                    <img src={items.images[0]} />
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
                </div>
              ))}
          </div>
          <Link href={`category/beauty`} className="link-button">
            Look for more Beauty <span className="arrow">→</span>
          </Link>
        </div>

        <div className="product-sub-box">
          <h1>Fragrances</h1>
          <div className="row">
            {product
              .filter((item) => item.category === 'fragrances')
              .sort(() => Math.random() - 0.5)
              .slice(0, 3)
              .map((items) => (
                <div className="product" key={items.id}>
                  <Link href={`/product/${items.id}`}>
                    <img src={items.images[0]} />
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
                </div>
              ))}
          </div>
          <Link href={`category/fragrances`} className="link-button">
            Look for more Fragrances <span className="arrow">→</span>
          </Link>
        </div>

        <div className="product-sub-box">
          <h1>Furniture</h1>
          <div className="row">
            {product
              .filter((item) => item.category === 'furniture')
              .sort(() => Math.random() - 0.5)
              .slice(0, 3)
              .map((items) => (
                <div className="product" key={items.id}>
                  <Link href={`/product/${items.id}`}>
                    <img src={items.images[0]} />
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
                </div>
              ))}
          </div>
          <Link href={`category/furniture`} className="link-button">
            Look for more Furniture <span className="arrow">→</span>
          </Link>
        </div>

        <div className="product-sub-box">
          <h1>Laptops</h1>
          <div className="row">
            {product
              .filter((item) => item.category === 'laptops')
              .sort(() => Math.random() - 0.5)
              .slice(0, 3)
              .map((items) => (
                <div className="product" key={items.id}>
                  <Link href={`/product/${items.id}`}>
                    <img src={items.images[0]} />
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
                </div>
              ))}
          </div>
          <Link href={`category/laptops`} className="link-button">
            Look for more Laptops <span className="arrow">→</span>
          </Link>
        </div>

        <div>
          <h2>Shop Mens Wear</h2>
          <div className="product-sub-box">
            <h1>Mens shoes</h1>
            <Link href={`category/mens-shoes`} className="link-button">
              Look for more Mens Shoes <span className="arrow">→</span>
            </Link>
          </div>
          <div className="product-sub-box">
            <h1>Mens Shirt</h1>
            <Link href={`category/mens-shirts`} className="link-button">
              Look for more Mens Shirts <span className="arrow">→</span>
            </Link>
          </div>
          <div className="product-sub-box">
            <h1>Mens Watches</h1>
            <Link href={`category/mens-watches`} className="link-button">
              Look for more Mens Watches <span className="arrow">→</span>
            </Link>
          </div>
          <div className="product-sub-box">
            <Link
              href={`category/mens-watches_mens-shirts_mens-shoes`}
              className="link-button"
            >
              Look for more Smartphones <span className="arrow">→</span>
            </Link>
          </div>
        </div>

        <div>
          <h2>Electronics</h2>
          <div className="product-sub-box">
            <h1>Mobile Acessories</h1>
            <Link href={`category/mobile-accessories`} className="link-button">
              Look for more Mobile Acessories <span className="arrow">→</span>
            </Link>
          </div>
          <div className="product-sub-box">
            <h1>Smartphones</h1>
            <Link href={`category/smartphones`} className="link-button">
              Look for more Smartphones <span className="arrow">→</span>
            </Link>
          </div>
          <div className="product-sub-box">
            <Link
              href={`category/smartphones_mobile-accessories`}
              className="link-button"
            >
              Look all Electronics <span className="arrow">→</span>
            </Link>
          </div>
        </div>

        <div className="product-sub-box">
          <h1>Home Decoration</h1>
          <Link href={`category/home-decoration`} className="link-button">
            Look for more Home Decoration <span className="arrow">→</span>
          </Link>
        </div>
        <div className="product-sub-box">
          <h1>Sunglasses</h1>
          <Link href={`category/sunglasses`} className="link-button">
            Look for more Sunglasses <span className="arrow">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MainHero;
