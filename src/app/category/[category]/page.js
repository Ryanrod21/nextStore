'use client';

import { useEffect, useState } from 'react';
import { getCategoryProducts } from '@/api/storeapi';
import { useParams } from 'next/navigation';
import '../../globals.css';
import Link from 'next/link';

export default function CategoryPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const categoryParam = params.category;
  const categories = categoryParam.split('_'); // support /category/groceries-beauty

  useEffect(() => {
    async function fetchAllCategoryProducts() {
      try {
        const allProducts = [];

        for (const cat of categories) {
          const data = await getCategoryProducts(cat);
          if (data && data.products) {
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
  }, [categoryParam]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="product-page">
      <div style={{ width: '100%', textAlign: 'center' }}>
        <img src="/logo.png" style={{ width: '400px' }} />
      </div>
      <h1>
        {categories
          .map((c) => c.charAt(0).toUpperCase() + c.slice(1))
          .join(', ')}
      </h1>
      <div className="row">
        {products.length > 0 ? (
          products
            .sort(() => Math.random() - 0.5)
            .map((item) => (
              <div className="product" key={item.id}>
                <Link href={`/product/${item.id}`}>
                  <img src={item.images[0]} />
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
              </div>
            ))
        ) : (
          <p>No products found for these categories.</p>
        )}
      </div>
    </div>
  );
}
