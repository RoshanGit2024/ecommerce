import { Switch } from '@material-ui/core';
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MetaData from '../MetaData';
import { clearError } from '../../slices/wishSlice';
import { getWishlist } from '../../actions/wishlistActions';
import { toast } from 'react-toastify';

function UserWishlist() {
    const { wishItems=[], error } = useSelector(state => state.wishState);
    const { user, isAuthenticated } = useSelector(state => state.authState);
    const[checked,setIschecked]=useState(false)
    //const wishlistitems = isAuthenticated ? items.filter((item) => item.userId === user._id) : [];
    const dispatch = useDispatch()

    const filteredProducts = checked ? wishItems.filter(filterd => filterd.stock !== 0):wishItems

    useEffect(() => {
        if (error) {
            toast(error, {
                type: 'error',
                onOpen: () => { dispatch(clearError()) }
            });
            return
        }
        if(isAuthenticated && user){
            dispatch(getWishlist(user._id));
        }
    }, [dispatch, user]);

    const handleChange = (e) =>{
       setIschecked(e.target.checked)
    }
    return (
        <Fragment>
            <MetaData title={'your wish list products'}/>
            <div className='container'>
                <h1 id="products_heading">Your wishlist products</h1>
                <div className='justify-content-between'>
                    <span>Show in stock products only</span>
                    <Switch 
                    value={checked}
                    onChange={handleChange}
                    />
                </div>
                {wishItems.length == 0 ?
                    <div className='d-flex justify-content-center align-items-center flex-column mt-4'>
                        <p className='mb-0 mr-2'>You are having no products wish </p>
                        <span >it's simple! just tap on 🤍 to add any products on your wish list</span>
                        <Link to={'/'} className='btn btn-primary'>view products</Link>
                    </div>:
                <Fragment>
                    <div className='row'>
                        {filteredProducts.map((item) => (
                            <div className="col-md-3 col-sm-6 mb-4 mt-5 p-3" key={item._id}>
                                <div className="card">
                                    <img src={item.image} className="card-img-top" alt={item.name} />
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            <Link to={`/singleproduct/${item.productId}`}>{item.name}</Link>
                                            <span></span>
                                        </h5>
                                        <p>Stocks: {item.stock}</p>
                                        <p className="card-text">${item.price}</p>
                                        <Link to={`/singleproduct/${item.productId}`} id="view_btn" className="btn btn-block">View Details</Link>
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
