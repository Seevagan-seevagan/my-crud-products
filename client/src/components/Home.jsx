import React from "react";
import { Link } from "react-router-dom";
import '../App.css';

const Home = () => {
  return (
    <div className="landing">
      <div className="overlay"></div>
      <div className="landing-content text-center">
        <h1>MyStore</h1>
        <p className="lead">Welcome to MyStore — Our products landing page</p>
        <div className="cta">
          <Link to="/products" className="btn btn-success me-2">
            Add Product
          </Link>
          <Link to="/product-list" className="btn btn-primary">
            View Products
          </Link>
        </div>
      </div> 
    </div>
  );
};

export default Home;
