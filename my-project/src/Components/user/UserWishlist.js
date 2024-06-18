import { Switch } from '@material-ui/core';
import React, { Fragment, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MetaData from '../MetaData';

function UserWishlist() {
    const { items } = useSelector(state => state.wishState);
    const { user, isAuthenticated } = useSelector(state => state.authState);
    const[checked,setIschecked]=useState(false)
    const wishlistitems = isAuthenticated ? items.filter((item) => item.userId === user._id) : [];

    const filteredProducts = checked ? wishlistitems.filter(filterd => filterd.stock !== 0):wishlistitems

    const handleChange = (e) =>{
       setIschecked(e.target.checked)
    }
    return (
        <Fragment>
            <MetaData title={'your wish list products'}/>
            <div className='container'>
                <h1 id="products_heading">Your wishlist products</h1>
                {items.length === 0 ?
                    <div className='d-flex justify-content-center align-items-center flex-column mt-4'>
                        <p className='mb-0 mr-2'>You are having no products wish </p>
                        <span >it's simple! just tap on 🤍 to add any products on your wish list</span>
                        <Link to={'/'} className='btn btn-primary'>view products</Link>
                    </div>:
                <Fragment>
                    <div className='justify-content-between'>
                    <span>Show in stock products only</span>
                    <Switch 
                    checked={checked}
                    onChange={handleChange}/>
                    </div>
                    <div className='row'>
                        {filteredProducts.map((item, index) => (
                            <div className="col-md-3 col-sm-6 mb-4 mt-5 p-3" key={index}>
                                <div className="card">
                                    <img src={item.image} className="card-img-top" alt={item.name} />
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            <span></span>
                                        </h5>
                                        <p>Stocks: {item.stock}</p>
                                        <div className="ratings mt-auto">
                                            <div className="rating-outer">
                                                <div className="rating-inner" style={{ width: `${(item.ratings / 5) * 100}%` }}></div>
                                            </div>
                                            <span id="no_of_reviews">({item.numberOfreviews} Reviews)</span>
                                        </div>
                                        <p className="card-text">${item.price}</p>
                                        <Link to={`/product/${item.product}`} id="view_btn" className="btn btn-block">View Details</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    </Fragment>}
            </div>
        </Fragment>
    )
}

export default UserWishlist
