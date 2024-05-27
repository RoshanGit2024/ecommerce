import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getProduct } from '../../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Loader'
import { Carousel, carousel } from 'react-bootstrap'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import MetaData from '../MetaData'
import { addcartItems } from '../../actions/cartActions'


function ProductDetail({ cartItems, setcartitems }) {
    const { loading, product, error } = useSelector((state) => state.prodSingleState);
    const dispatch = useDispatch();
    const [qty, setQty] = useState(1);
    const { id } = useParams();
    useEffect(() => {
        if (id) {
            dispatch(getProduct(id));
        }
    }, [dispatch, id]);

    function handleCart() {
        const itemExist = cartItems.find((item) => item.product._id == product._id)
        if (!itemExist) {
            const newItem = { product, qty }
            setcartitems((state) => [...state, newItem])
            toast.success("cart item added succesfully..")
        }
    }

    function increaseQty() {
        if (product.stock == qty) {
            return;
        }if(product.stock == 0) return;
        setQty((state) => state + 1)
    }

    function decreaseQty() {
        if (qty > 1) {
            setQty((state) => state - 1)
        }
    }
    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <MetaData title={product.name}/>
                    <div className="container container-fluid">
                        <div className="row f-flex justify-content-around">
                            <div className="col-12 col-lg-5 img-fluid" id="product_image">
                                <Carousel pause="hover">
                                    {product.images && product.images.length > 0 && product.images.map(image =>(
                                        <Carousel.Item key={image._id}>
                                            <img className='d-block w-100' src={image.image} alt={product.name} height="500" width="500" />
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            </div>

                            <div className="col-12 col-lg-5 mt-5">
                                <h3>{product.name}</h3>
                                <p id="product_id">Product # {product._id}</p>

                                <hr />

                                <div className="rating-outer">
                                    <div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
                                </div>
                                <span id='no_of_reviews'>{product.numOfReviews}Reviews</span>

                                <hr />

                                <p id="product_price">${product.price}</p>
                                <div className="stockCounter d-inline">
                                    <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>

                                    <input type="number" className="form-control count d-inline" value={qty} readOnly />

                                    <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
                                </div>
                                <button type="button"
                                    id="cart_btn"
                                    className="btn btn-primary d-inline ml-4"
                                    disabled={product.stock ==0 ? true : false}
                                     onClick={()=>dispatch(addcartItems(product._id,qty))}>Add to Cart</button>

                                <hr />

                                <p>Status: <span id="stock_status text-success" className={product.stock > 0 ? 'text-success' : 'text-danger'} >{product.stock > 0 ? 'In stock' : 'out of stock'}</span></p>

                                <hr />

                                <h4 className="mt-2">Description:</h4>
                                <p>{product.description}</p>
                                <hr />
                                <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>
                                <button id="review_btn" type="button" class="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal">
                                    Submit Your Review
                                </button>

                                <div className="rating w-50"></div>

                            </div>

                        </div>
                    </div>
                </Fragment>}
        </Fragment>

    )
}

export default ProductDetail
