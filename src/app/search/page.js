import { getSearch } from '@/api/storeapi';
import Link from 'next/link';
import StarRating from '@/components/StarRating';
import '../globals.css';

export default async function SearchPage({ searchParams }) {
  const query = searchParams.query || '';
  const data = await getSearch(query);
  const results = data.products;

  return (
    <div
      className="product-page"
      style={{ width: '100%', textAlign: 'center' }}
    >
      <img src="/logo.png" style={{ width: '400px' }} />
      <h1 className="text-2xl font-bold mb-4">Search results for "{query}"</h1>
      <div style={{ width: '100%', textAlign: 'center' }}>
        <div className="row">
          {results
            .sort(() => Math.random() - 0.5)
            .map((item) => (
              <div className="product" key={item.id}>
                <Link href={`/product/${item.id}`}>
                  <img src={item.images[0]} alt={item.title} />
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
