import React, { useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa';
import Search from './Search';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import{useDispatch, useSelector} from 'react-redux'
import {Dropdown,Image} from 'react-bootstrap'
import { logout } from '../actions/userActions';
import Avatar from './user/Avatar';
import DialogActions from '@material-ui/core/DialogActions'; 
import DialogContent from '@material-ui/core/DialogContent'; 
import DialogTitle from '@material-ui/core/DialogTitle'; 
import DialogContentText from '@material-ui/core/DialogContentText'; 
import Dialog from '@material-ui/core/Dialog'; 
import Button from '@material-ui/core/Button'; 

function Nav() {
  const {isAuthenticated,user,resmessage}=useSelector(state => state.authState)
  const{items:cartItems}=useSelector(state => state.cartState)
  const[open,setOpen]=useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path) => {
      return location.pathname === path ? 'active' : '';
  };
  const cart = isAuthenticated ? cartItems.filter((item) => item.userId === user._id) : [];

  const handleClose =()=>{
    setOpen(false)
  }

  const handleOpen =()=> {
    setOpen(true)
  }
  const handleLogout=()=>{
        setOpen(false)
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
            {user.role === 'admin' && <Dropdown.Item className={isActive('/admin/dashboard')}  onClick={()=>{navigate('/admin/dashboard')}}>Dashboard</Dropdown.Item>}
              <Dropdown.Item className={isActive('/myprofile')} onClick={()=>{navigate('/myprofile')}}>Profile</Dropdown.Item>
              <Dropdown.Item className={isActive('/orders')}  onClick={()=>{navigate('/orders')}}>orders</Dropdown.Item>
              <Dropdown.Item className='text-danger' onClick={handleOpen}>Logout</Dropdown.Item>
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
    <Dialog open={open} onClose={handleClose}>
       <DialogTitle>
         Please confirm
       </DialogTitle>
       <DialogContent> 
          <DialogContentText> 
            Are you sure want to logout? 
          </DialogContentText> 
      </DialogContent> 
      <DialogActions> 
          <Button onClick={handleClose} color="primary"> 
           Close 
          </Button> 
          <Button onClick={handleLogout} style={{background:'red',color:'white',border:'none'}} autoFocus> 
           Yes 
          </Button> 
      </DialogActions> 
    </Dialog>
  </nav>
);
}

export default Nav
