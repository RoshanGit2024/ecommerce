import React, { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createReview, getProduct, relatedProducts } from '../../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
//import { deleteOrder, adminOrders as adminOrdersAction } from '../../actions/orderActions'
import Loader from '../Loader';
import { Carousel, Modal } from 'react-bootstrap';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import MetaData from '../MetaData';
import { clearReviewSubmited, clearError, clearProduct } from '../../slices/productSlice';
import ProductReview from './ProductReview';
import { FaHeart } from "react-icons/fa";
import { addWishlist } from '../../actions/wishlistActions'
import { addToCartDatabase } from '../../actions/myCartActions';
import { addToCart } from '../../slices/myCartSlice'
import Errorcomp from '../Errorcomp'
import { clearError as wishlistClearErr } from '../../slices/wishSlice';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FaXmark } from "react-icons/fa6";
import Dialog from '@material-ui/core/Dialog';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronRight } from "react-icons/fa";

function SingleProduct() {
    const { loading, product, error, isReviewSubmited, relatedProduct: suggested } = useSelector((state) => state.prodSingleState);
    const { wishItems, loading: wishlistload, error: wishlisterr } = useSelector(state => state.wishState);
    const { loading: cartLoad, error: cartErr } = useSelector(state => state.myCartState);
    const { user, isAuthenticated } = useSelector((state) => state.authState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const { id } = useParams();
    const [show, setShow] = useState(false);
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState("");
    const [inWishlist, setInWishlist] = useState(false)
    const [images, setImages] = useState([])
    const [activeImg, setActiveImg] = useState("")
    const [open, setOpen] = useState(false)
    const [showAllImg, setShowAllImg] = useState(false)


    const handleImageClose = () => {
        setOpen(false)
    }

    const handleImageOpen = () => {
        setOpen(true)
    }


    useEffect(() => {
        if (product && product.images) {
            const imgUrls = product.images.map(img => img.image)
            setImages(imgUrls)
            console.log(images)
            if (imgUrls.length > 0) {
                setActiveImg(imgUrls[0]);
                console.log(activeImg)
            }
        }
    }, [product])
    useEffect(() => {
        if (product && product._id && user && user._id && wishItems) {
            let wishSts = wishItems.some(item => item.productId === product._id && item.userId === user._id)
            setInWishlist(wishSts)
        }
    }, [wishItems, product, user])


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleWish = () => {
        if (user && user._id) {
            dispatch(addWishlist(user._id, product._id))
        } else {
            navigate('/login')
        }
    }

    useEffect(() => {
        if (wishlisterr) {
            toast(wishlisterr, {
                type: 'error',
                onOpen: () => { dispatch(wishlistClearErr()) }
            });
            return
        }
    }, [wishlisterr,])

    useEffect(() => {
        if (isReviewSubmited) {
            handleClose();
            toast.success("Review submitted successfully", {
                onOpen: () => dispatch(clearReviewSubmited())
            });
        }
        if (!product._id || isReviewSubmited) {
            dispatch(getProduct(id));
        }
        return () => {
            dispatch(clearProduct())
            dispatch(clearError());
        }
    }, [dispatch, id, isReviewSubmited]);

    useEffect(() => {
        dispatch(getProduct(id))
        dispatch(relatedProducts(id))
    }, [dispatch, id])

    const handleCart = () => {
        const cartItem = {
            name: product.name,
            quantity: quantity,
            image: product.images[0].image,
            price: product.price,
            product: product._id,
            stock: product.stock
        };
        if (isAuthenticated) {
            dispatch(addToCartDatabase(user._id, cartItem));
        } else {
            dispatch(addToCart(cartItem));
        }
    };

    const increaseQty = () => {
        const count = document.querySelector('.count');
        if (product.stock == 0 || count.valueAsNumber >= product.stock) return;
        const qty = count.valueAsNumber + 1;
        setQuantity(qty);
    }

    const decreaseQty = () => {
        const count = document.querySelector('.count');
        if (count.valueAsNumber == 1) return;
        const qty = count.valueAsNumber - 1;
        setQuantity(qty);
    }

    const handleReview = () => {
        const formData = new FormData();
        formData.append('rating', rating);
        formData.append('comment', comment);
        formData.append('productId', id);
        dispatch(createReview(formData));
    }
    var settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
      };
    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : error ? (
                <Errorcomp message={error} />
            ) : (
                <Fragment>
                    <MetaData title={product.name} />
                    <div className="container container-fluid">
                        <div className="row f-flex justify-content-around">
                            <div className="col-12 col-lg-5 img-fluid" id="product_image">
                                {activeImg &&
                                    <img
                                        className='d-block w-100'
                                        src={activeImg}
                                        alt={product.name}
                                        height="500"
                                        width="500"
                                        onClick={handleImageOpen}
                                        style={{cursor:'pointer'}}
                                    />}
                                <div className="d-flex justify-content-center mt-2">
                                    {images && images.length > 1 && images.slice(0,3).map((image, index) => (
                                        <img key={index} src={image} alt={product.name}
                                            className='w-16 h-16 rounded-md mx-1'
                                            style={{
                                                width: '65px',
                                                height: '65px',
                                                margin: '2px 8px',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                border: activeImg === image ? '2px solid red' : '1px solid gray'
                                            }}
                                            onClick={() => setActiveImg(image)}
                                        />
                                    ))}
                                    {images.length > 3 && (
                                        <div
                                        className='w-16 h-16 rounded-md mx-1'
                                        style={{
                                            width: '65px',
                                            background:'#D3D3D3',
                                            height: '65px',
                                            margin: '2px 8px',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            padding:'5px',
                                            border:'1px solid black'
                                        }}
                                        onClick={handleImageOpen}
                                    ><span 
                                    data-toggle="tooltip"
                                    data-placement="bottom"
                                    title='view more images'
                                    ><FaChevronRight size={55}/></span></div>
                                    )}
                                </div>
                            </div>

                            <div className="col-12 col-lg-5 mt-5">
                                <div className='d-flex justify-content-between'>
                                    <h3>{product.name}</h3>
                                    {isAuthenticated && <span
                                        data-toggle="tooltip"
                                        data-placement="bottom"
                                        title={`${!inWishlist ? 'add to wishlist' : 'remove from wish list'}`}
                                    >
                                        <FaHeart
                                            style={{
                                                color: inWishlist ? 'red' : '',
                                                cursor: 'pointer',
                                            }}
                                            size={40}
                                            onClick={handleWish}
                                        />
                                    </span>}
                                </div>
                                <p id="product_id">Product # {product._id}</p>
                                <hr />
                                <div className="rating-outer">
                                    <div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
                                </div>
                                <span id='no_of_reviews'>{product.numberOfreviews} Reviews</span>
                                <hr />
                                <p id="product_price">${product.price}</p>
                                <div>
                                    <span className='rounded bg-dark p-1 text-white mb-2'>Stocks: {product.stock}</span>
                                </div>
                                <div className="stockCounter d-inline">
                                    <span className="btn btn-danger minus" onClick={decreaseQty} disabled={quantity == 1 ? true : false}>-</span>
                                    <input type="number" className="form-control count d-inline" value={quantity} readOnly />
                                    <span className="btn btn-primary plus" onClick={increaseQty} disabled={product.stock == 0 ? true : false}>+</span>
                                </div>
                                <button type="button"
                                    id="cart_btn"
                                    className="btn btn-primary d-inline ml-4"
                                    disabled={product.stock == 0 || cartLoad}
                                    onClick={handleCart}>{cartLoad ? "Adding..." : "Add to cart"}</button>
                                <hr />
                                <p>Status: <span id="stock_status text-success" className={product.stock > 0 ? 'text-success' : 'text-danger'} >{product.stock > 0 ? 'In stock' : 'Out of stock'}</span></p>
                                <hr />
                                <h4 className="mt-2">Description:</h4>
                                <p>{product.description}</p>
                                <hr />
                                <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>
                                {user ?
                                    <button onClick={handleShow} id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal">
                                        Submit Your Review
                                    </button> :
                                    <div className='alert alert-danger mt-5'>Login to post Review</div>
                                }
                                <div className="rating w-50">
                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Submit Review</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <ul className="stars" >
                                                {[1, 2, 3, 4, 5].map(star => (
                                                    <li
                                                        key={star}
                                                        value={star}
                                                        onClick={() => setRating(star)}
                                                        className={`star ${star <= rating ? 'orange' : ''}`}
                                                        onMouseOver={(e) => e.target.classList.add('yellow')}
                                                        onMouseOut={(e) => e.target.classList.remove('yellow')}
                                                    ><i className="fa fa-star"></i></li>
                                                ))}
                                            </ul>
                                            <textarea onChange={(e) => setComment(e.target.value)} name="review" id="review" className="form-control mt-3">
                                            </textarea>
                                            <button disabled={loading} onClick={handleReview} aria-label='close' className='btn my-3 float-right review-btn px-4 text-white'>Submit</button>
                                        </Modal.Body>
                                    </Modal>
                                </div>
                            </div>
                        </div>
                    </div>
                    {product.reviews && product.reviews.length > 0 ?
                        <ProductReview reviews={product.reviews} /> : null
                    }
                    {suggested && suggested.length > 0 ? (
                        <div>
                            <h1 className="mx-5">Related products you may like</h1>
                            <div className='row'>
                                {suggested.map(item => (
                                    <div className="col-sm-12 col-md-6 col-lg-3 my-3 mx-5">
                                        <div key={item._id} className="card p-3 rounded">
                                            <img
                                                className="card-img-top mx-auto"
                                                src={item.images[0].image}
                                                alt={item.name}
                                            />
                                            <div className="card-body d-flex flex-column">
                                                <h5 className="card-title">
                                                    <Link to={`/singleproduct/${item._id}`}>{item.name}</Link>
                                                </h5>
                                                <div className="ratings mt-auto">
                                                    <div className="rating-outer">
                                                        <div className="rating-inner" style={{ width: `${(item.ratings / 5) * 100}%` }}></div>
                                                    </div>
                                                    <span id="no_of_reviews">({item.numberOfreviews}Reviews)</span>
                                                </div>
                                                <p className="card-text">${item.price}</p>
                                                <Link to={`/singleproduct/${item._id}`} id="view_btn" className="btn btn-block">View Details</Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>) : (<div></div>)}
                </Fragment>)
            }
            <Dialog open={open} onClose={handleImageClose} maxWidth="md" fullWidth>
                <DialogTitle>
                    <div className='d-flex justify-content-between'>
                    Image preview
                    <FaXmark 
                    onClick={handleImageClose}
                    style={{cursor:'pointer'}}
                    />
                    </div>
                </DialogTitle>
                <DialogContent className='row f-flex justify-content-around'>
                    <div className="d-flex justify-content-between" >
                       <div>
                        {activeImg &&
                            <img
                                //className='d-block '
                                src={activeImg}
                                alt={product.name}
                                height="500"
                                width="500"
                            />}
                        </div>
                        <div className="d-flex justify-content-center mt-2">
                            <div className='ml-4'>
                            <h1>{product.name}</h1>
                            {images && images.length > 1 && images.map((image, index) => (
                                <img key={index} src={image} alt={product.name}
                                    className='w-16 h-16 rounded-md mx-1'
                                    style={{
                                        width: '65px',
                                        height: '65px',
                                        margin: '2px 8px',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        border: activeImg === image ? '2px solid red' : '1px solid black'
                                    }}
                                    onClick={() => setActiveImg(image)}
                                />
                            ))}
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </Fragment>
    )

}

export default SingleProduct;
