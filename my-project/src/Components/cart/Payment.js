import { useElements, useStripe } from '@stripe/react-stripe-js'
import { CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { validateShipping } from './Shipping';
import { createOrder } from '../../actions/orderActions'
import axios from 'axios'
import { toast } from 'react-toastify';
import { orderCompleted } from '../../slices/cartSlice';
import Steps from './Steps';
import { clearError as clearOrderError } from '../../slices/orderSlice'
import Loader from '../Loader';
import MetaData from '../MetaData';

function Payment() {
    const stripe = useStripe();
    const elements = useElements()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))
    const { user, isAuthenticated} = useSelector(state => state.authState)
    const { items: cartItem, shippingInfo } = useSelector(state => state.myCartState)
    const { error: orderError, loading} = useSelector(state => state.orderState)
    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100), //send the payment data in cents type 100 cents make 1 dollor
        shipping: {
            name: user.name,
            address: {
                city: shippingInfo.city,
                postal_code: shippingInfo.postalCode,
                country: shippingInfo.country,
                state: shippingInfo.state,
                line1: shippingInfo.address
            },
            phone: shippingInfo.phoneNumber
        }
    }

    const order = {
        orderItems: cartItem,
        shippingInfo
    }

    if (orderInfo) {
        order.itemsPrice = orderInfo.itemsPrice
        order.shippingPrice = orderInfo.shippingPrice
        order.taxPrice = orderInfo.taxPrice
        order.totalPrice = orderInfo.totalPrice
    }

    useEffect(() => {
        validateShipping(shippingInfo, navigate)

        if (orderError) {
            toast(orderError, {
                type: 'error',
                onOpen: () => { dispatch(clearOrderError) }
            });
            return
        }
    }, [shippingInfo])

    const handleSubmit = async (e) => {
        e.preventDefault();
        document.querySelector('#pay_btn').disabled = true;
        try {
            const { data } = await axios.post('http://localhost:8000/api/v1/payment/process', paymentData)
            const clientSecret = data.client_secret
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email
                    }
                }
            })

            if (result.error) {
                toast.error(result.error.message)
                document.querySelector('#pay_btn').disabled = false;
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    toast.success('Payment Success!')
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status
                    }
                    dispatch(orderCompleted(user._id))
                    dispatch(createOrder(order))
                    //console.log(order)
                    navigate('/order/success')
                } else {
                    toast.warning('Please Try again!')
                }
            }


        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Fragment>
            <MetaData title={'payment proccess'}/>
            <Steps shipping confirmOrder payment />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form onSubmit={handleSubmit} className="shadow-lg" >
                        <h1 className="mb-4">Card Info</h1>
                        <div className="form-group">
                            <label htmlFor="card_num_field">Card Number</label>
                            <CardNumberElement
                                type="text"
                                id="card_num_field"
                                className="form-control" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="card_exp_field">Card Expiry</label>
                            <CardExpiryElement
                                type="text"
                                id="card_exp_field"
                                className="form-control" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="card_cvc_field">Card CVC</label>
                            <CardCvcElement
                                type="text"
                                id="card_cvc_field"
                                className="form-control"
                            />
                        </div>

                        <button id="pay_btn" type="submit" className="btn btn-block py-3">
                            {loading && <Loader />} {/* Show loader when loading */}
                            {!loading && `Pay-$${orderInfo && orderInfo.totalPrice}`}
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default Payment
