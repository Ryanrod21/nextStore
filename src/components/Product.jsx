import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

function ProductCard({ item, addToCart }) {
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 4000);
  };

  return (
    <div className="product">
      <Link href={`/product/${item.id}`}>
        <Image
          src={item.images[0]}
          alt={item.title}
          width={400}
          height={400}
          style={{ objectFit: 'contain' }}
          unoptimized
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

      {added ? (
        <p className="item-added">Item added to cart!</p>
      ) : (
        <button onClick={handleAddToCart}>Add to Cart</button>
      )}
    </div>
  );
}
