'use client';

import { useEffect, useState } from 'react';
import { getCategoryProducts } from '@/api/storeapi';
import { useParams } from 'next/navigation';
import '../../globals.css';
import Link from 'next/link';
import Image from 'next/image';
import StarRating from '@/components/StarRating';
import { useMemo } from 'react';

export default function CategoryPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const categoryParam = params.category;
  const categories = useMemo(() => categoryParam.split('_'), [categoryParam]);

  const categoryTitleMap = {
    'mens-watches_mens-shirts_mens-shoes': "All Men's",
  };

  const displayTitle =
    categoryTitleMap[categoryParam] ||
    categories.map((c) => c.charAt(0).toUpperCase() + c.slice(1)).join(', ');

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
  }, [categories]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="product-page">
      <h1>{displayTitle}</h1>
      <div className="row">
        {products.length > 0 ? (
          products
            .sort(() => Math.random() - 0.5)
            .map((item) => (
              <div className="product" key={item.id}>
                <Link href={`/product/${item.id}`}>
                  <Image
                    src={item.images[0]}
                    alt="Product Image"
                    width={400} // set appropriate width
                    height={400} // set appropriate height
                    style={{ objectFit: 'contain' }} // optional styling
                    unoptimized // add if image is external and not configured in next.config.js
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
              </div>
            ))
        ) : (
          <p>No products found for these categories.</p>
        )}
      </div>
    </div>
  );
}
