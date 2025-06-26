import '../app/globals.css';

function SearchBar() {
  return (
    <div className="search-container">
      <input type="text" className="search-input" placeholder="Search..." />
      <button className="search-button"></button>
    </div>
  );
}

export default SearchBar;
