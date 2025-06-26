'use client';

import { useEffect, useState } from 'react';
import { getAllProducts } from '@/api/storeapi';
import '../app/globals.css';
import Link from 'next/link';

function MainHero() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getAllProducts();

        console.log('prod', data.products);
        setProduct(data.products);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, []);

  return (
    <div className="main-page">
      main page
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
                  <p>${items.price}</p>
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
        </div>

        <div className="product-sub-box">
          <h1>Beuaty</h1>
          <div className="row">
            {product
              .filter((item) => item.category === 'beauty')
              .slice(0, 3)
              .map((items) => (
                <div className="product" key={items.id}>
                  <Link href={`/product/${items.id}`}>
                    <img src={items.images[0]} />
                  </Link>
                  <p>{items.title}</p>
                  <p>${items.price}</p>
                  <p
                    className={
                      items.availabilityStatus === 'In Stock'
                        ? 'in-stock'
                        : 'out-of-stock'
                    }
                  >
                    {items.availabilityStatus}
                  </p>
                </div>
              ))}
          </div>
        </div>

        <div className="product-sub-box">
          <h1>Fragrances</h1>
          <div className="row">
            {product
              .filter((item) => item.category === 'fragrances')
              .slice(0, 3)
              .map((items) => (
                <div className="product" key={items.id}>
                  <Link href={`/product/${items.id}`}>
                    <img src={items.images[0]} />
                  </Link>
                  <p>{items.title}</p>
                  <p>${items.price}</p>
                  <p
                    className={
                      items.availabilityStatus === 'In Stock'
                        ? 'in-stock'
                        : 'out-of-stock'
                    }
                  >
                    {items.availabilityStatus}
                  </p>
                </div>
              ))}
          </div>
        </div>

        <div className="product-sub-box">
          <h1>Furniture</h1>
          <div className="row">
            {product
              .filter((item) => item.category === 'furniture')
              .slice(0, 3)
              .map((items) => (
                <div className="product" key={items.id}>
                  <Link href={`/product/${items.id}`}>
                    <img src={items.images[0]} />
                  </Link>
                  <p>{items.title}</p>
                  <p>${items.price}</p>
                  <p
                    className={
                      items.availabilityStatus === 'In Stock'
                        ? 'in-stock'
                        : 'out-of-stock'
                    }
                  >
                    {items.availabilityStatus}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainHero;
