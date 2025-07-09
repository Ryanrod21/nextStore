'use client';

import { useEffect, useState } from 'react';
import { getAllCategory, getAllProducts } from '@/api/storeapi';
import '../app/globals.css';
import Link from 'next/link';
import Image from 'next/image';
import StarRating from '@/components/StarRating';

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
        <div className="product-sub-box">
          <h1>Groceries</h1>
          <div className="row">
            {product
              .filter((item) => item.category === 'groceries')
              .sort(() => Math.random() - 0.5)
              .slice(0, 4)
              .map((items) => (
                <div className="product" key={items.id}>
                  <Link href={`/product/${items.id}`}>
                    <Image
                      src={items.images[0]}
                      alt="Image"
                      width={400} // set desired width
                      height={400} // set desired height
                      style={{ objectFit: 'contain' }}
                      unoptimized // add if external image without domain config
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
              .filter((item) => ['beauty', 'skin-care'].includes(item.category))
              .sort(() => Math.random() - 0.5)
              .slice(0, 4)
              .map((items) => (
                <div className="product" key={items.id}>
                  <Link href={`/product/${items.id}`}>
                    <Image
                      src={items.images[0]}
                      alt="Image"
                      width={400} // set desired width
                      height={400} // set desired height
                      style={{ objectFit: 'contain' }}
                      unoptimized // add if external image without domain config
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
                </div>
              ))}
          </div>
          <Link href={`category/beauty_skin-care`} className="link-button">
            Look for more Beauty <span className="arrow">→</span>
          </Link>
        </div>

        <div className="product-sub-box">
          <h1>For Mens !</h1>
          <div className="row">
            {product
              .filter((item) =>
                ['mens-shirts', 'mens-shoes', 'mens-watches'].includes(
                  item.category
                )
              )
              .sort(() => Math.random() - 0.5)
              .slice(0, 4)
              .map((items) => (
                <div className="product" key={items.id}>
                  <Link href={`/product/${items.id}`}>
                    <Image
                      src={items.images[0]}
                      alt="Image"
                      width={400} // set desired width
                      height={400} // set desired height
                      style={{ objectFit: 'contain' }}
                      unoptimized // add if external image without domain config
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
                </div>
              ))}
          </div>
          <Link href={`category/mens-fashion`} className="link-button">
            Look for more Men's Fasion <span className="arrow">→</span>
          </Link>
        </div>

        <div className="product-sub-box">
          <h1>For your Home !</h1>
          <div className="row">
            {product
              .filter((item) =>
                [
                  'furniture',
                  'home-decoration',
                  'kitchen-accessories',
                ].includes(item.category)
              )
              .sort(() => Math.random() - 0.5)
              .slice(0, 4)
              .map((items) => (
                <div className="product" key={items.id}>
                  <Link href={`/product/${items.id}`}>
                    <Image
                      src={items.images[0]}
                      alt="Image"
                      width={400} // set desired width
                      height={400} // set desired height
                      style={{ objectFit: 'contain' }}
                      unoptimized // add if external image without domain config
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
                </div>
              ))}
          </div>
          <Link href={`category/all-furniture`} className="link-button">
            Look for more Furniture <span className="arrow">→</span>
          </Link>
        </div>

        <div className="product-sub-box">
          <h1>Electonics For You!</h1>
          <div className="row">
            {product
              .filter((item) =>
                [
                  'laptops',
                  'mobile-accessories',
                  'smartphones',
                  'tablets',
                ].includes(item.category)
              )
              .sort(() => Math.random() - 0.5)
              .slice(0, 4)
              .map((items) => (
                <div className="product" key={items.id}>
                  <Link href={`/product/${items.id}`}>
                    <Image
                      src={items.images[0]}
                      alt="Image"
                      width={400} // set desired width
                      height={400} // set desired height
                      style={{ objectFit: 'contain' }}
                      unoptimized // add if external image without domain config
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
                </div>
              ))}
          </div>
          <Link href={`category/all-electronics`} className="link-button">
            Shop All Electronics <span className="arrow">→</span>
          </Link>
        </div>

        <div className="product-sub-box">
          <h1>Shope all womens !</h1>
          <div className="row">
            {product
              .filter((item) =>
                [
                  'womens-bags',
                  'womens-dresses',
                  'womens-jewellery',
                  'womens-shoes',
                  'womens-watches',
                  'tops',
                ].includes(item.category)
              )
              .sort(() => Math.random() - 0.5)
              .slice(0, 4)
              .map((items) => (
                <div className="product" key={items.id}>
                  <Link href={`/product/${items.id}`}>
                    <Image
                      src={items.images[0]}
                      alt="Image"
                      width={400} // set desired width
                      height={400} // set desired height
                      style={{ objectFit: 'contain' }}
                      unoptimized // add if external image without domain config
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
                </div>
              ))}
          </div>
          <Link href={`category/womens-fashion`} className="link-button">
            Look for mor Women's Fasion <span className="arrow">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MainHero;
