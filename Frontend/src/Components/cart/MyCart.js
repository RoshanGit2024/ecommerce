import React, { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCartDeleted, clearError, decreaseCartItemQty, increaseCartItemQty, removeItemFromCart } from '../../slices/myCartSlice';
import MetaData from '../MetaData';
import { deleteCartItem, getCartItems } from '../../actions/myCartActions';
import { BiError } from "react-icons/bi";
import { toast } from 'react-toastify';

function MyCart({userId}) {
    const { items:cartItems, loading ,isCartDeleted,error} = useSelector(state => state.myCartState);
    const { user, isAuthenticated } = useSelector(state => state.authState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const[cartError,setCarterror]=useState("")

   const cartLength = cartItems.length;

   
    useEffect(() => {
        if (error) {
            toast(error, {
                type: 'error',
                onOpen: () => { dispatch(clearError()) }
            });
            return
        }
        if(isAuthenticated && user){
            dispatch(getCartItems(user._id));
        }
    }, [dispatch, user]);
    
    const increaseQty = (item) => {
        const count = item.quantity;
        if(item.stock == 0 || count >= item.stock) return;
        dispatch(increaseCartItemQty(item.product));
    }

    const decreaseQty = (item) => {
        const count = item.quantity;
        if(count == 1) return;
        dispatch(decreaseCartItemQty(item.product));
    }

    const checkoutHandler = () => {
        const outOfStockItems = cartItems.filter(item => item.stock === 0);
        if(outOfStockItems.length > 0){
            setCarterror("some items from your cart is out of stock, please remove them to proceed")
            return;
        }
        navigate('/login?redirect=shipping');
        setCarterror("")
    }

    const handleCartDelete =(productId)=> {
     if(isAuthenticated && user){
         dispatch(deleteCartItem(user._id,productId))
     }else{
         dispatch(removeItemFromCart(productId))
         toast.success("cart item removed successfully!")
     }
    }

    return (
        <Fragment>
            <MetaData title={'Cart Items'} />
            {cartItems.length == 0 ? 
                <h2 className="mt-5">Your Cart is Empty</h2> :
                <Fragment>
                    {cartError && (
                        <div className='alert alert-danger text-white bg-danger justify-content-center alert-medium mt-3 mx-auto' role='alert'>
                            <BiError size={20}/> {cartError}<b>!</b>
                        </div>
                    )}
                    <h2 className="mt-5">Your Cart: <b>{cartLength} items</b></h2>
                    <div className="row d-flex justify-content-between">
                        <div className="col-12 col-lg-8">
                            {cartItems.map(item => (
                                <Fragment key={item.product}>
                                    <hr />
                                    <div className="cart-item">
                                        <div className="row">
                                            <div className="col-4 col-lg-3">
                                                <img src={item.image} alt={item.name} height="90" width="115" />
                                            </div>
                                            <div className="col-5 col-lg-3">
                                                <Link to={`/singleproduct/${item.product}`}>{item.name}</Link>
                                            </div>
                                            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                <p id="card_item_price">${item.price}</p>
                                            </div>
                                            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                <div className="stockCounter d-inline">
                                                {item.stock === 0 ? 
                                                  (<span className='text-danger font-bold'>product out of stock</span>) :(
                                                    <>
                                                    <span 
                                                       className="btn btn-danger minus" 
                                                       onClick={()=>decreaseQty(item)}>
                                                        -
                                                    </span>
                                                    <input 
                                                       type="number" 
                                                       className="form-control count d-inline" 
                                                       value={item.quantity} 
                                                       readOnly 
                                                    />
                                                    <span 
                                                      className="btn btn-primary plus" 
                                                      onClick={()=>increaseQty(item)}>
                                                        +
                                                    </span>
                                                    </>)}
                                                </div>
                                            </div>
                                            <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                                <i id="delete_cart_item" 
                                                   onClick={()=>handleCartDelete(item.product)} 
                                                   className="fa fa-trash btn btn-danger">
                                                </i>
                                            </div>
                                        </div>
                                    </div>
                                </Fragment>
                            ))}
                            <hr />
                        </div>
                        <div className="col-12 col-lg-3 my-4">
                            <div id="order_summary">
                                <h4>Order Summary</h4>
                                <hr />
                                <p>Subtotal: <span className="order-summary-values">{cartItems.reduce((acc, item) => acc + item.quantity, 0)} (Units)</span></p>
                                <p>Est. total: <span className="order-summary-values">${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}</span></p>
                                <hr />
                                <button id="checkout_btn" 
                                        onClick={checkoutHandler}   
                                        className="btn btn-primary btn-block">
                                    Check out
                                </button>
                            </div>
                        </div>
                    </div>
                </Fragment>
            }
        </Fragment>
    )
}

export default MyCart;