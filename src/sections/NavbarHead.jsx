import '../app/globals.css';

function NavBarHead() {
  return (
    <nav className="navbar-head">
      <div className="nav-head-link">
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
          <li>
            <a href="#">Cart</a>
          </li>
          <li>
            <a href="#">Login</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBarHead;
