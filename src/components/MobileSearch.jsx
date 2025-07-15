'use client';

import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faTimes } from '@fortawesome/free-solid-svg-icons';
import { getSearch } from '@/api/storeapi';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import StarRating from './StarRating';

export default function MobileSearch() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (query.trim().length < 3) {
      setResults([]);
      return;
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
    } catch (err) {
      setError('Failed to fetch search results.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query.trim())}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <div className="mobile-search-wrapper">
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        size="lg"
        className="mobile-search-icon"
        onClick={() => setIsSearchOpen(true)}
      />

      <div
        ref={dropdownRef}
        className={`mobile-search-panel ${isSearchOpen ? 'open' : ''}`}
      >
        <div className="mobile-search-header">
          <h2 className="mobile-search-title">Search</h2>
          <FontAwesomeIcon
            icon={faTimes}
            size="lg"
            className="mobile-search-close-icon"
            onClick={() => setIsSearchOpen(false)}
          />
        </div>

        <input
          type="text"
          className="mobile-search-input"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />

        {loading && <div className="mobile-search-loading">Loading...</div>}
        {error && <div className="mobile-search-error">{error}</div>}

        {results.length > 0 ? (
          <ul className="mobile-search-dropdown-list">
            {results.map((item) => (
              <Link key={item.id} href={`/product/${item.id}`}>
                <li
                  className="mobile-search-dropdown-item"
                  onClick={() => {
                    setQuery(item.title);
                    setIsSearchOpen(false);
                  }}
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="mobile-search-thumbnail"
                  />
                  <span>{item.title}</span>
                  <p>${item.price}</p>
                  <StarRating rating={item.rating} />
                </li>
              </Link>
            ))}
          </ul>
        ) : (
          !loading &&
          query.length >= 3 && (
            <div className="mobile-search-no-results">No results found.</div>
          )
        )}

        <button
          className="mobile-close-panel-button"
          onClick={() => setIsSearchOpen(false)}
        >
          Close Panel
        </button>
      </div>
    </div>
  );
}
