'use client';

import { getProduct } from '@/api/storeapi';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import './item.css';

function ProductPage() {
  const [product, setProduct] = useState(null);
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await getProduct(id);
        console.log(data);
        setProduct(data);
      } catch (error) {
        console.error('Error loading product:', error);
      }
    }

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="item-page">
      <h1>{product.title}</h1>
      <p>Rating: {product.rating} / 5</p>
      <img src={product.thumbnail} alt={product.title} />
      <p>Description: {product.description}</p>
      <p>${product.price}</p>
      <p>{product.shippingInformation}</p>
      <div className="item-dimensions">
        <p>Width: {product.dimensions.width}</p>
        <p>Height: {product.dimensions.height}</p>
        <p>Depth: {product.dimensions.depth}</p>
      </div>
      <div className="item-tags">
        {product.tags &&
          product.tags.map((tag, index) => (
            <div key={index}>
              <p>{tag}</p>
            </div>
          ))}
      </div>

      <p
        className={
          product.availabilityStatus === 'In Stock'
            ? 'in-stock'
            : product.availabilityStatus === 'Low Stock'
            ? 'low-stock'
            : 'out-of-stock'
        }
      >
        {product.availabilityStatus}
      </p>
      {product.reviews &&
        product.reviews.map((feedback, index) => (
          <div className="item-feedback" key={index}>
            <h3>{feedback.reviewerName}</h3>
            <p>{feedback.rating}</p>
            <p>{feedback.comment}</p>
          </div>
        ))}
    </div>
  );
}

export default ProductPage;
