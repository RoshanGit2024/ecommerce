//ProductDetail.js
import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createReview, getProduct } from '../../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Loader'
import { Carousel } from 'react-bootstrap'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import MetaData from '../MetaData'
import { addcartItems } from '../../actions/cartActions'
import { Modal } from 'react-bootstrap'
import { clearReviewSubmited,clearError, clearProduct } from '../../slices/productSlice'
import ProductReview from './ProductReview'


function ProductDetail({ cartItems, setcartitems }) {
    const { loading, product={}, error,isReviewSubmited } = useSelector((state) => state.prodSingleState);
    const {loading: cartLoading} = useSelector((state) => state.cartState)
    const {user,isAuthenticated} = useSelector((state) => state.authState)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [qty, setQty] = useState(1);
    const { id } = useParams();

    const [show, setShow] = useState(false);
    const [rating,setRating]=useState(1)
    const[comment,setComment]=useState("")

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        if(isReviewSubmited){
            handleClose()
            toast.success("Review submited successfully",{
                onOpen:()=>dispatch(clearReviewSubmited())
            })
        }
        if (error) {
            toast(error,{
              type:'error',
              onOpen:()=>{dispatch(clearError())}
            });
            return
          }
          if(!product._id || isReviewSubmited){
            dispatch(getProduct(id));
          }
            return ()=>{
                dispatch(clearProduct())
            }
          
    }, [dispatch, id,isReviewSubmited,error,cartLoading]);

    function handleCart() {
        if(isAuthenticated){
            dispatch(addcartItems(user._id,product._id, qty))
        }else{
            navigate('/login')
        }
    }

    function increaseQty() {
        if (product.stock == qty) {
            return;
        } if (product.stock == 0) return;
        setQty((state) => state + 1)
    }

    function decreaseQty() {
        if (qty > 1) {
            setQty((state) => state - 1)
        }
    }

    const handleReview=()=>{
        const formData = new FormData();
        formData.append('rating',rating);
        formData.append('comment',comment);
        formData.append('productId',id);
        dispatch(createReview(formData))
    }

    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <MetaData title={product.name} />
                    <div className="container container-fluid">
                        <div className="row f-flex justify-content-around">
                            <div className="col-12 col-lg-5 img-fluid" id="product_image">
                                <Carousel pause="hover">
                                    {product.images && product.images.length > 0 && product.images.map(image => (
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
                                <p>Stocks: {product.stock}</p>
                                <div className="stockCounter d-inline">
                                    <span className="btn btn-danger minus" onClick={decreaseQty} disabled={qty == 1 ? true : false}>-</span>

                                    <input type="number" className="form-control count d-inline" value={qty} readOnly />

                                    <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
                                </div>
                                <button type="button"
                                    id="cart_btn"
                                    className="btn btn-primary d-inline ml-4"
                                    disabled={product.stock == 0 ? true : false}
                                    onClick={handleCart}>Add to Cart</button>

                                <hr />

                                <p>Status: <span id="stock_status text-success" className={product.stock > 0 ? 'text-success' : 'text-danger'} >{product.stock > 0 ? 'In stock' : 'out of stock'}</span></p>

                                <hr />

                                <h4 className="mt-2">Description:</h4>
                                <p>{product.description}</p>
                                <hr />
                                <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>
                                {user ? 
                                <button onClick={handleShow} id="review_btn" type="button" class="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal">
                                    Submit Your Review
                                </button>:
                                <div className='alert alert-danger mt-5'>Login to post Review</div>
                              }

                                <div className="rating w-50">
                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Submit Review</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <ul className="stars" >
                                                {
                                                    [1,2,3,4,5].map(star=>(
                                                        <li 
                                                        value={star}
                                                        onClick={()=>setRating(star)}
                                                        className={`star ${star<=rating?'orange':''}`}
                                                        onMouseOver={(e)=>e.target.classList.add('yellow')}
                                                        onMouseOut={(e)=>e.target.classList.remove('yellow')}
                                                        ><i class="fa fa-star"></i></li> 
                                                    ))
                                                }
                                            </ul>
                                            <textarea onChange={(e)=>setComment(e.target.value)} name="review" id="review" className="form-control mt-3">
                                            </textarea>
                                            <button disabled={loading} onClick={handleReview} aria-label='close' className='btn my-3 float-right review-btn px-4 text-white'>Submit</button>
                                        </Modal.Body>
                                    </Modal>
                                </div>

                            </div>

                        </div>
                    </div>
                    {product.reviews && product.reviews.length > 0 ?
                       <ProductReview reviews={product.reviews}/>:null
                    }
                </Fragment>}
        </Fragment>

    )
}

export default ProductDetail
