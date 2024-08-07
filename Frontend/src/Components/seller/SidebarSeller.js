import React, { useState } from 'react'
import {Link, useNavigate,useLocation} from 'react-router-dom'
import {NavDropdown} from 'react-bootstrap'

function SidebarSeller() {
    const navigate = useNavigate()
    const location = useLocation()

    const isActive = (paths) => {
        return paths.includes(location.pathname ) ? 'active' : '';
    };

    return (
        <div className="sidebar-wrapper">
            <nav id="sidebar">
                <ul className="list-unstyled components">
                    <li>
                        <Link to={'/seller'} className={isActive('/seller')}>
                            <i className="fas fa-tachometer-alt"></i> Seller Dashboard
                        </Link>
                    </li>

                    <li>
                        <Link to={'/seller/company-profile/:id'} className={isActive(['/seller/company-profile/:id'])}>
                            <i className="fa fa-shopping-basket"></i> company
                        </Link>
                    </li>

                    <li>
                        <Link to={''} className={isActive([''])}>
                            <i className="fa fa-shopping-basket"></i> product list
                        </Link>
                    </li>

                    <li>
                        <Link to={''} className={isActive([''])}>
                            <i className="fa fa-shopping-basket"></i> Orders
                        </Link>
                    </li>

                    <li>
                        <Link to={''} className={isActive('')}>
                            <i className="fa fa-users"></i> Reviews
                        </Link>
                    </li>

                    <li>
                        <Link to={'/sellers/chat'} className={isActive('/sellers/chat')}>
                        <i class="fa-solid fa-comments"></i> Chats
                        </Link>
                    </li>
                
                </ul>
            </nav>
        </div>
    )
}

export default SidebarSeller
