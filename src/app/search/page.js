import { getSearch } from '@/api/storeapi';
import Link from 'next/link';
import StarRating from '@/components/StarRating';
import '../globals.css';
import Image from 'next/image';

export default async function SearchPage({ searchParams }) {
  const params = await searchParams;
  const query = params.query || '';
  const data = await getSearch(query);
  const results = data.products;

  return (
    <div
      className="product-page"
      style={{ width: '100%', textAlign: 'center' }}
    >
      <h1 className="text-2xl font-bold mb-4">Search results for "{query}"</h1>
      <div style={{ width: '100%', textAlign: 'center' }}>
        <div className="row">
          {results
            .sort(() => Math.random() - 0.5)
            .map((item) => (
              <div className="product" key={item.id}>
                <Link href={`/product/${item.id}`}>
                  <Image
                    src={item.images[0]}
                    alt={item.title}
                    width={400} // set your desired width
                    height={400} // set your desired height
                    style={{ objectFit: 'contain' }} // optional, adjusts how the image fits
                    unoptimized // add if the image is from an external URL and not configured in next.config.js
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
            ))}
        </div>
      </div>
    </div>
  );
}
