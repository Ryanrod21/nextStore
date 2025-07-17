'use client';

import { getProduct } from '@/api/storeapi';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import './item.css';
import { useCart } from '@/app/context/CartContext';
import Breadcrumbs from '@/components/Breadcrumbs';
import StarRating from '@/components/StarRating';
import Image from 'next/image';

function ProductPage() {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const [transformOrigin, setTransformOrigin] = useState('center center');
  const [isZoomed, setIsZoomed] = useState(false);

  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);

  const router = useRouter();

  const params = useParams();
  const id = params.id;

  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await getProduct(id);
        setProduct(data);
      } catch (error) {
        console.error('Error loading product:', error);
      }
    }

    if (id) {
      fetchProduct();
    }
  }, [id]);

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();

    // Calculate cursor position as percentage inside container
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setTransformOrigin(`${x}% ${y}%`);
  }

  function handleMouseLeave() {
    setIsZoomed(false);
    setTransformOrigin('center center');
  }

  function handleMouseEnter() {
    setIsZoomed(true);
  }

  const breadcrumbSegments = [...pathSegments];
  if (product) {
    breadcrumbSegments[breadcrumbSegments.length - 1] = product.title
      .toLowerCase()
      .replace(/\s+/g, '-');
  }

  if (!product) return <p>Loading...</p>;

  return (
    <div className="item-page">
      <div className="breadcrumbs">
        <Breadcrumbs pathArray={breadcrumbSegments} product={product} />
      </div>
      <div className="product-img-container">
        <div className="side-img">
          <div className="main-img-contain">
            <div
              className="main-img-contain zoom-container"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onMouseEnter={handleMouseEnter}
            >
              <Image
                className="zoom-image"
                src={product.images[activeImageIndex]}
                alt={`Image ${activeImageIndex + 1}`}
                width={600}
                height={600}
                style={{
                  transformOrigin,
                  transform: isZoomed ? 'scale(1.5)' : 'scale(1)',
                }}
                unoptimized={true} // optional, if src is external and not in next.config.js domains
              />
            </div>
          </div>

          <div className="small-img-container">
            {product.images.map((src, index) => (
              <div
                className="small-imgs"
                key={index}
                onClick={() => setActiveImageIndex(index)}
                style={{
                  border:
                    activeImageIndex === index
                      ? '2px solid black'
                      : '1px solid #ccc',
                }}
              >
                <Image
                  src={src}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  unoptimized // add this if the images are from external URLs and you don't want to configure domains
                  sizes="100px"
                  priority={activeImageIndex === index} // prioritize loading active thumbnail
                />
              </div>
            ))}
          </div>
        </div>
        <div className="product-details">
          <div className="product-head">
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <StarRating rating={product.rating} />
            <span style={{ fontWeight: '600' }}>
              {product.rating.toFixed(2)} / 5
            </span>
          </div>
          <div className="info">
            <p className="price">
              $
              {product.price.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>

          {/* 2️⃣ Add quantity selector */}
          <div
            className="add-sub-container"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              margin: '20px 0',
            }}
          >
            <label htmlFor="quantity" style={{ marginRight: '10px' }}>
              Quantity:
            </label>

            <button
              id="add-subtract"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              −
            </button>

            <span>{quantity}</span>

            <button
              id="add-subtract"
              onClick={() => setQuantity(Math.min(15, quantity + 1))}
              disabled={quantity >= 15}
            >
              +
            </button>
          </div>

          {added ? (
            <>
              <p className="item-added">Item added to cart!</p>
            </>
          ) : (
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                disabled={
                  product.availabilityStatus !== 'In Stock' &&
                  product.availabilityStatus !== 'Low Stock'
                }
                className="add-cart-btn"
                onClick={() => {
                  addToCart(product, quantity);
                  setQuantity(1);
                  setAdded(true);
                  setTimeout(() => setAdded(false), 4000);
                }}
              >
                Add to Cart
              </button>

              <button
                className="buy-now-btn"
                disabled={
                  product.availabilityStatus !== 'In Stock' &&
                  product.availabilityStatus !== 'Low Stock'
                }
                onClick={() => {
                  addToCart(product, quantity);
                  router.push('/checkout');
                }}
              >
                Buy Now
              </button>
            </div>
          )}

          <h4>Shipping Information:</h4>
          <p>{product.shippingInformation}</p>

          <div className="item-tags">
            <h4>Tags:</h4>
            <div style={{ display: 'flex', gap: '5px' }}>
              {product.tags &&
                product.tags.map((tag, index) => (
                  <div key={index}>
                    <p>
                      {tag
                        .split(' ')
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(' ')}
                      {index < product.tags.length - 1 ? ',' : ''}
                    </p>
                  </div>
                ))}
            </div>
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
        </div>
      </div>
      <div className="review-container">
        <h2>Reviews:</h2>
        <div className="reviews">
          {product.reviews &&
            product.reviews.map((feedback, index) => (
              <div className="item-feedback" key={index}>
                <h3>{feedback.reviewerName}</h3>
                <p>{feedback.comment}</p>
                <p>{feedback.rating} / 5</p>
                <StarRating rating={feedback.rating} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
