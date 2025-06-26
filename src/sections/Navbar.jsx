import SearchBar from '../components/SearchBar';
import '../app/globals.css';
import Link from 'next/link';

function NavBar() {
  return (
    <nav className="navbar">
      <div className="logo-links">
        <Link href="/">
          <h2 className="logo">Store</h2>
        </Link>
        <div className="nav-link">
          <ul>
            <li>
              <Link href={`/category/groceries`}>Groceries</Link>
            </li>
            <li>
              <Link href={`/category/beauty`}>Beauty</Link>
            </li>
            <li>
              <Link href={`/category/fragrances`}>Fragrances</Link>
            </li>
            <li>
              <Link href={`/category/furniture`}>Furniture</Link>
            </li>
          </ul>
        </div>
      </div>
      <SearchBar />
    </nav>
  );
}

export default NavBar;
