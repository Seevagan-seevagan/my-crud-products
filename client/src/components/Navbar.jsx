import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import '../App.css'

const Navbar = ({ onSearch, onLogout }) => {
  const [query, setQuery] = useState("");
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  const isActive = (path) => (location.pathname === path ? "active" : "");

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm nav-bar fw-bold">
      <div className="container">
        
        {/* Logo */}
        <Link className="navbar-brand text-danger " to="/">
          MyStore
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Items */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            {/* <li className="nav-item">
              <Link className={`nav-link ${isActive("/product-list")}`} to="/">
                
              </Link>
            </li> */}

            <li className="nav-item">
              <Link className={`nav-link ${isActive("/")} text-light`} to="/product-list">
                Home
              </Link>
            </li>

          </ul>

          {/* Search Bar */}
          {/* <form className="d-flex me-3" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn btn-outline-light" type="submit">
              Search
            </button>
          </form> */}

          {/* Dynamic Add/Go Button */}
          {location.pathname === "/products" ? (
            <Link className="btn btn-primary" to="/product-list">
              Go to Products
            </Link>
          ) : (
            <Link className="btn btn-success" to="/products">
              Add Product
            </Link>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
