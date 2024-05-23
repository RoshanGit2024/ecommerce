import React from 'react'
import { FaShoppingCart } from 'react-icons/fa';
import Search from './Search';
import { Link } from 'react-router-dom';

function Nav({cartItems}) {
  return (
    <nav className="navbar row">
    <div className="col-12 col-md-3">
      <div className="navbar-brand">
        <Link to={'/'}>
          <h1 style={{ color: 'white' }}>shop</h1>
        </Link>
      </div>
    </div>

    <div className="col-12 col-md-6 mt-2 mt-md-0">
      <Search />
    </div>
    
    <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
    <Link to={'/login'} className="btn" id="login_btn">Login / Signup</Link>
      <Link to={'/cart'}>
        <span id="cart" className="ml-3">
          <FaShoppingCart /> Cart
        </span>
        <span className="ml-1" id="cart_count">{cartItems.length}</span>
      </Link>
    </div>
  </nav>
);
}

export default Nav
