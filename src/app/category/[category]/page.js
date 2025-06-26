'use client';

import { useEffect, useState } from 'react';
import { getCategoryProducts } from '@/api/storeapi';
import { useParams } from 'next/navigation';
import '../../globals.css';
import Link from 'next/link';

export default function CategoryPage() {
  const [product, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const category = params.category;

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCategoryProducts(category);
        setProducts(data.products);
      } catch (error) {
        console.error('Error loading category:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [category]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="product-page">
      <h1>{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
      <div className="row">
        {product
          .filter((item) => item.category === category)
          .sort(() => Math.random() - 0.5)
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
  );
}
