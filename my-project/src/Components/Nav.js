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
import logo from '../Assets/logo.png'
import { FaHeart } from "react-icons/fa";

function Nav() {
  const {isAuthenticated,user,resmessage}=useSelector(state => state.authState)
  const{items:cartItems}=useSelector(state => state.myCartState)
  const[open,setOpen]=useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (paths) => {
      return paths.includes(location.pathname ) ? 'active' : '';
  };

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
          <img src={logo} alt='logo' width="100px" height="70px"/>
        </Link>
      </div>
    </div>

    <div className="col-12 col-md-6 ml-0 mt-2 mt-md-0">
      <Search />
    </div>
    
    <div className="col-12 col-md-3 mt-4 ml-0 mt-md-0 text-center d-flex flex-row align-items-center justify-content-around">
      {isAuthenticated ? (
         <Dropdown className='d-inline '>
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
            {user.role === 'admin' && <Dropdown.Item 
                                  className={isActive(['/admin/dashboard',
                                                       '/admin/orders',
                                                       '/admin/products',
                                                       '/admin/products/create',
                                                       '/admin/users',
                                                       '/admin/reviews',
                                                       '/admin/product/'
                                                       ])}  
                                  onClick={()=>{navigate('/admin/dashboard')}}>
                                    Dashboard
                                  </Dropdown.Item>}
              <Dropdown.Item 
              className={isActive(['/myprofile',
                                   '/myprofile/update',
                                   '/orders',
                                   '/myprofile/update/password',
                                   ])} 
              onClick={()=>{navigate('/myprofile')}}>
                Profile
              </Dropdown.Item>
              <Dropdown.Item className='text-danger' onClick={handleOpen}>Logout</Dropdown.Item>
             </Dropdown.Menu>
         </Dropdown>
      )
      : 
    <Link to={'/login'} className="btn" id="login_btn">Login</Link>
    }
    {isAuthenticated && <Link to={"/wishlist"} >
        <FaHeart 
          style={{
            color:'red',
            cursor:'pointer',
            marginTop:'11px'
        }}
        size={25}
        />
    </Link> }
      <Link to={'/mycart'}>
        <span id="cart" className="ml-4">
          <FaShoppingCart size={30}/> 
        <span className="mt-1" id="cart_count">{cartItems.length}</span>
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