import { useState, useEffect, useRef } from 'react';
import '../app/globals.css';
import { getSearch } from '@/api/storeapi';
import Link from 'next/link';
import StarRating from './StarRating';
import { useRouter } from 'next/navigation';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const dropdownRef = useRef(null);

  const router = useRouter();

  // Fetch search results as user types (debounced)
  useEffect(() => {
    if (query.trim().length < 3) {
      setResults([]);
      setShowDropdown(false);
      return; // stop if fewer than 3 chars
    }

    const delayDebounce = setTimeout(() => {
      fetchResults(query);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  async function fetchResults(searchTerm) {
    setLoading(true);
    setError(null);
    try {
      const data = await getSearch(searchTerm);
      const filtered = (data.products || []).filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setResults(filtered);
      setShowDropdown(true);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch search results.');
      setShowDropdown(false);
    } finally {
      setLoading(false);
    }
  }

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div
      className="search-container"
      ref={dropdownRef}
      style={{ position: 'relative' }}
    >
      <input
        type="text"
        className="search-input"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => query && setShowDropdown(true)}
      />

      {loading && <div className="loading-indicator">Loading...</div>}

      {showDropdown && results.length > 0 && (
        <ul className="dropdown-list">
          {results.map((item) => (
            <Link key={item.id} href={`/product/${item.id}`}>
              <li
                className="dropdown-item"
                onClick={() => {
                  setQuery(item.title);
                  setShowDropdown(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  style={{
                    width: '40px',
                    height: '40px',
                    objectFit: 'cover',
                    borderRadius: '4px',
                  }}
                />
                <span>{item.title}</span>
                <p>${item.price}</p>
                <StarRating rating={item.rating} />
              </li>
            </Link>
          ))}
        </ul>
      )}

      {showDropdown && !loading && results.length === 0 && (
        <div className="dropdown-no-results">No results found.</div>
      )}

      {error && <div className="dropdown-error">{error}</div>}
    </div>
  );
}

export default SearchBar;
