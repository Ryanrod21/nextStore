// components/Breadcrumbs.js
import Link from 'next/link';

// Capitalize first letter of each word
function capitalizeWords(str) {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

function Breadcrumbs({ pathArray, product }) {
  // Replace "product" and ID in the path if product is loaded
  const cleanedPathArray = pathArray.map((item) => {
    if (item === 'product' && product?.category) {
      return product.category.toLowerCase(); // replace 'product' with category
    }

    // If the item looks like an ID (usually last), replace with product title
    if (product && item === pathArray[pathArray.length - 1]) {
      return product.title.toLowerCase().replace(/\s+/g, '-');
    }

    return item;
  });

  return (
    <nav className="text-sm text-gray-600 mb-4">
      {cleanedPathArray.map((item, index) => {
        const href = '/' + pathArray.slice(0, index + 1).join('/');
        const isLast = index === cleanedPathArray.length - 1;
        const text = capitalizeWords(item.replaceAll('-', ' '));

        return (
          <span key={index}>
            {!isLast ? (
              <>
                <Link
                  href={`/category/${product.category}`}
                  className="hover:underline"
                >
                  {text}
                </Link>
                {' / '}
              </>
            ) : (
              <span style={{ color: 'rgb(185, 185, 185)', fontWeight: 'bold' }}>
                {text}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}

export default Breadcrumbs;
