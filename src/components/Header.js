import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <nav>
        <h1 className="pageHeader">Rent My Tech</h1>
        <div className='nav-links'>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/auctions">Tech2Rent</Link>
          <Link to="/createAuction">Add-Tech-Item</Link>
        </div>
      </nav>
    )
};

export default Header;