import React, { useState } from 'react'
import {Link, useNavigate,useLocation} from 'react-router-dom'
import {NavDropdown} from 'react-bootstrap'

function Sidebar() {
    const navigate = useNavigate()
    const location = useLocation()

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
      };

    return (
        <div className="sidebar-wrapper">
            <nav id="sidebar">
                <ul className="list-unstyled components">
                    <li>
                        <Link to={'/admin/dashboard'} className={isActive('/admin/dashboard')}>
                            <i className="fas fa-tachometer-alt"></i> Dashboard
                        </Link>
                    </li>

                    <li className={isActive('/admin/products')}>
                        <NavDropdown title={
                            <i className='fa fa-product-hunt'> Product</i>
                        }>
                           <NavDropdown.Item onClick={()=>navigate('/admin/products')} className={isActive('/admin/products')}>
                             <i className='fa fa-shopping-basket'>All</i>
                            </NavDropdown.Item>
                           <NavDropdown.Item onClick={()=>navigate('/admin/products/create')} className={isActive('/admin/products')}>
                            <i className='fa fa-plus'>Create</i>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </li>

                    <li>
                        <Link to={'/admin/orders'} className={isActive('/admin/orders')}>
                            <i className="fa fa-shopping-basket"></i> Orders
                        </Link>
                    </li>

                    <li>
                        <Link to={'/admin/users'} className={isActive('/admin/users') }>
                            <i className="fa fa-users"></i> Users
                        </Link>
                    </li>

                    <li>
                        <Link to={'/admin/reviews'} className={isActive('/admin/reviews')}>
                            <i className="fa fa-users"></i> Reviews
                        </Link>
                    </li>

                </ul>
            </nav>
        </div>
    )
}

export default Sidebar
