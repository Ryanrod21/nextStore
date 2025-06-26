'use client';

import { getProduct } from '@/api/storeapi';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import './item.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRef } from 'react';

function ProductPage() {
  const [product, setProduct] = useState(null);
  const slideRef = useRef(null);

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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="item-page">
      <h1>{product.title}</h1>
      <p>Rating: {product.rating} / 5</p>
      <div className="product-img-container">
        <div>
          {product.images.map((img, index) => (
            <div key={index}>
              <img
                src={img}
                style={{ width: '150px', height: '150px' }}
                onClick={() => slideRef.current?.slickGoTo(index)}
                className="img-side"
              />
            </div>
          ))}
        </div>
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
          {product.images.length > 1 ? (
            <Slider ref={slideRef} {...settings}>
              {product.images.map((src, index) => (
                <div key={index}>
                  <img
                    src={src}
                    alt={`Image ${index + 1}`}
                    style={{ width: '100%', display: 'block' }}
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <img
              src={product.images[0]}
              alt="Single product image"
              style={{ width: '100%', display: 'block' }}
            />
          )}
        </div>
      </div>

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
