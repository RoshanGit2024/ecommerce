import React from 'react'
import { FaShoppingCart } from 'react-icons/fa';
import Search from './Search';
import { Link, useNavigate } from 'react-router-dom';
import{useDispatch, useSelector} from 'react-redux'
import {DropdownButton,Dropdown,Image} from 'react-bootstrap'
import { logout } from '../actions/userActions';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'
import Avatar from './user/Avatar';

function Nav() {
  const {isAuthenticated,user,resmessage}=useSelector(state => state.authState)
  const{items:cartItems}=useSelector(state => state.cartState)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const cart = isAuthenticated ? cartItems.filter((item) => item.userId === user._id) : [];

  const handleLogout=()=>{
    Swal.fire({
      title: "Are you sure you want's to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff0000",
      cancelButtonColor: "#000000",
      confirmButtonText: "yes,logout"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout)
      }
    });
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

    <div className="col-12 col-md-6 ml-0 mt-2 mt-md-0">
      <Search />
    </div>
    
    <div className="col-12 col-md-3 mt-4 ml-0 mt-md-0 text-center">
      {isAuthenticated ? (
         <Dropdown className='d-inline'>
             <Dropdown.Toggle variant='default text-white pr-5' id='dropdown-basic'>
              <figure className='avatar avatar-nav'>
                {user.avatar ? (
                 <Image width={"50px"} src={user.avatar} alt={user.name}/>
                ):(
                  <Avatar name={user.name } size={40} fontSize={16}/>)}
              </figure>
              <span className="username">{user.name}</span>
             </Dropdown.Toggle>
             <Dropdown.Menu>
            {user.role === 'admin' && <Dropdown.Item className='text-dark' onClick={()=>{navigate('/admin/dashboard')}}>Dashboard</Dropdown.Item>}
              <Dropdown.Item className='text-dark' onClick={()=>{navigate('/myprofile')}}>Profile</Dropdown.Item>
              <Dropdown.Item className='text-dark' onClick={()=>{navigate('/orders')}}>orders</Dropdown.Item>
              <Dropdown.Item className='text-danger' onClick={handleLogout}>Logout</Dropdown.Item>
             </Dropdown.Menu>
         </Dropdown>
      )
      : 
    <Link to={'/login'} className="btn" id="login_btn">Login</Link>
    }
      <Link to={'/cart'}>
        <span id="cart" className="ml-3">
          <FaShoppingCart size={40}/> 
        <span className="mt-1" id="cart_count">{cart.length}</span>
        </span>
      </Link>
    </div>
  </nav>
);
}

export default Nav
