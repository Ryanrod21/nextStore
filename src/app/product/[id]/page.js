'use client';

import { getProduct } from '@/api/storeapi';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import './item.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRef } from 'react';
import { useCart } from '@/app/context/CartContext';

function ProductPage() {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const slideRef = useRef(null);

  const params = useParams();
  const id = params.id;

  const { addToCart } = useCart();

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
      <div className="product-img-container">
        <div className="side-img">
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '30px',
              marginLeft: '35px',
              marginTop: '60px',
            }}
          >
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

          <div className="main-img-contain">
            {product.images.length > 1 ? (
              <Slider ref={slideRef} {...settings}>
                {product.images.map((src, index) => (
                  <div key={index}>
                    <img
                      src={src}
                      alt={`Image ${index + 1}`}
                      style={{
                        width: '700px',
                        display: 'block',
                        height: '700px',
                      }}
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
        <div className="product-details">
          <h1>{product.title}</h1>
          <div className="info">
            <h4>About This Item:</h4>
            <p>{product.description}</p>

            <h4>Rating:</h4>
            <p>{product.rating} / 5</p>

            <h4>Price:</h4>
            <p>${product.price}</p>

            <h4>Shipping Information:</h4>
            <p>{product.shippingInformation}</p>

            <h4>Item Dimensions:</h4>
            <div className="item-dimensions">
              <p>Width: {product.dimensions.width}</p>
              <p>Height: {product.dimensions.height}</p>
              <p>Depth: {product.dimensions.depth}</p>
            </div>
            <div className="item-tags">
              <h4>Tags:</h4>
              {product.tags &&
                product.tags.map((tag, index) => (
                  <div key={index}>
                    <p>{tag}</p>
                  </div>
                ))}
            </div>
          </div>

          {/* 2️⃣ Add quantity selector */}
          <div style={{ margin: '20px 0' }}>
            <label htmlFor="quantity" style={{ marginRight: '10px' }}>
              Quantity:
            </label>
            <select
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            >
              {[...Array(10)].map((_, i) => (
                <option value={i + 1} key={i}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>

          {added ? (
            <p className="item-added">Item added to cart!</p>
          ) : (
            <button
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
          )}

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
                <p>{feedback.rating} / 5</p>
                <p>{feedback.comment}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
