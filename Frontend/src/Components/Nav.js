import React, { useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa';
import Search from './Search';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import{useDispatch, useSelector} from 'react-redux'
import { logout } from '../actions/userActions';
import Avatar from './user/Avatar'; 
import logo from '../Assets/logo.png'
import { FaHeart } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { RiFileUserLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import {CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CImage} from '@coreui/react'
import { IoIosHelpCircleOutline } from "react-icons/io";
import { GiClawHammer } from "react-icons/gi";
import { MdContactPhone } from "react-icons/md";
import AlertDialog from './alertModals/AlertDialog';

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
    
    <div className="col-12 col-md-3 mt-4 ml-0 mt-md-0 text-center d-flex flex-row align-items-center justify-content-end">
      {isAuthenticated ? (
         <CDropdown className='d-inline '>
             <CDropdownToggle variant='default text-white pr-5' id='dropdown-basic' caret={false}>
              <figure className='avatar avatar-nav'>
                {user.avatar ? (
                 <CImage width={"50px"} src={user.avatar} alt={user.name} className='rounded-circle'/>
                ):(
                  <Avatar name={user.name } size={40} fontSize={16}/>)}
              </figure>
              {/* <span className="username">{user.name}</span> */}
             </CDropdownToggle>
             <CDropdownMenu>
            {user.role === 'admin' && <CDropdownItem 
                                  style={{cursor:'pointer'}}
                                  className={isActive(['/admin/dashboard',
                                                       '/admin/orders',
                                                       '/admin/products',
                                                       '/admin/products/create',
                                                       '/admin/users',
                                                       '/admin/reviews',
                                                       '/admin/product/'
                                                       ])}  
                                  onClick={()=>{navigate('/admin/dashboard')}}>
                                   <span className='mr-1'><RxDashboard/></span>Dashboard
                                  </CDropdownItem>}
                                  {user.role === 'seller' && <CDropdownItem 
                                  style={{cursor:'pointer'}}
                                  className={isActive([])}  
                                  onClick={()=>{navigate('/seller/company-profile/:id')}}>
                                   <span className='mr-1'><RxDashboard/></span>your company
                                  </CDropdownItem>}
                                  {user.role === 'seller' && <CDropdownItem 
                                  style={{cursor:'pointer'}}
                                  className={isActive([])}  
                                  onClick={()=>{navigate('/seller')}}>
                                   <span className='mr-1'><RxDashboard/></span>Seller Dashboard
                                  </CDropdownItem>}
              <CDropdownItem 
              className={isActive(['/myprofile',
                                   '/myprofile/update',
                                   '/orders',
                                   '/myprofile/update/password',
                                   ])} 
              onClick={()=>{navigate('/myprofile')}}  style={{cursor:'pointer'}}>
              <span className='mr-1'><RiFileUserLine /></span>Profile
              </CDropdownItem>
              <CDropdownItem className='text-danger' onClick={handleOpen}  style={{cursor:'pointer'}}><span className='mr-1'><CiLogout/></span>Logout</CDropdownItem>
             </CDropdownMenu>
         </CDropdown>
      )
      : 
    <Link to={'/login'} className="btn" id="login_btn">Login</Link>
    }
         <CDropdown className='d-inline'>
             <CDropdownToggle variant='default text-white pr-5' id='dropdown-basic' caret={false}>
              <IoIosHelpCircleOutline size={30}/>
             </CDropdownToggle>
             <CDropdownMenu>
              <CDropdownItem style={{cursor:'pointer'}}><span className='mr-1'><GiClawHammer/></span> Legal and policies</CDropdownItem>
              <CDropdownItem style={{cursor:'pointer'}}><span className='mr-1'><MdContactPhone/></span> contact</CDropdownItem>
             </CDropdownMenu>
         </CDropdown>
    {isAuthenticated && <Link to={'/wishlist'} data-toggle="tooltip"
                                        data-placement="bottom"
                                        title='wish list' className='ml-3'>
        <FaHeart 
          style={{
            color:'red',
            cursor:'pointer'
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

    <AlertDialog
    open = {open}
    handleClose = {handleClose}
    text = {"are you sure you wants to logout?"}
    handleEvent = {handleLogout}
    />
  </nav>
);
}

export default Nav