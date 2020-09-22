import React from 'react'
import {Link} from 'react-router-dom'

function Header() {
    return (
        <nav>
        <h1 className="pageHeader">Rent My Tech</h1>
        <div className='nav-links'>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/tech-items">Tech2Rent</Link>
          <Link to="/add-tech-item">Add-Tech-Item</Link>
        </div>
      </nav>
    )
};

export default Header
