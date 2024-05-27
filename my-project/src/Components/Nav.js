import React from 'react'
import { FaShoppingCart } from 'react-icons/fa';
import Search from './Search';
import { Link, useNavigate } from 'react-router-dom';
import{useDispatch, useSelector} from 'react-redux'
import {DropdownButton,Dropdown,Image} from 'react-bootstrap'
import { logout } from '../actions/userActions';
import { toast } from 'react-toastify';

function Nav() {
  const {isAuthenticated,user,resmessage}=useSelector(state => state.authState)
  const{items:cartItems}=useSelector(state => state.cartState)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout=()=>{
    dispatch(logout)
  }
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
      {isAuthenticated ? (
         <Dropdown className='d-inline'>
             <Dropdown.Toggle variant='default text-white pr-5' id='dropdown-basic'>
              <figure className='avatar avatar-nav'>
                 <Image width={"50px"} src={user.avatar ?? './images/default_avatar.png'}/>
              </figure>
              <span>{user.name}</span>
             </Dropdown.Toggle>
             <Dropdown.Menu>
              <Dropdown.Item className='text-dark' onClick={()=>{navigate('/myprofile')}}>Profile</Dropdown.Item>
              <Dropdown.Item className='text-danger' onClick={handleLogout}>Logout</Dropdown.Item>
             </Dropdown.Menu>
         </Dropdown>
      )
      : 
    <Link to={'/login'} className="btn" id="login_btn">Login</Link>
    }
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
