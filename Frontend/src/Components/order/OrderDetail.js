import React, { Fragment, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { cancelOrder, orderDetail as orderDetailAction } from '../../actions/orderActions'
import Loader from '../Loader'
import OrderSteps from './OrderSteps'
import { Modal,Button,Form  } from 'react-bootstrap'
import { clearOrderCanceled ,clearError} from '../../slices/orderSlice'
import { toast } from 'react-toastify'

function OrderDetail() {
    const { orderDetail={}, loading, isOrderCanceled,error } = useSelector(state => state.orderState)
    const { shippingInfo = {}, user = {}, orderStatus = "processing", orderItems = [], totalPrice = 0, paymentInfo = {} ,createdAt,deliveredAt} = orderDetail
    const isPaid = paymentInfo && paymentInfo.status === "succeeded" ? true : false
    const dispatch = useDispatch()
    const { id } = useParams()
    const [show, setShow] = useState(false)
    const [selectOrderId, setSelectOrderId] = useState(null)
    const [reason, setReason] = useState('')
    const[orderCaceled,setOrderCanceled]=useState(false)

    useEffect(() => {
        dispatch(orderDetailAction(id))
    }, [id])

    useEffect(()=>{
        if(isOrderCanceled){
          toast.success("order canceled successfully",{
            onOpen:()=>dispatch(clearOrderCanceled())
          })
          return
      }
    
      if (error) {
        toast.error(error,{
          onOpen:()=>{dispatch(clearError())}
        });
        return
      }
      dispatch(orderDetailAction(id))
      },[isOrderCanceled,error,dispatch,id])


    const handleCancelOrder = () => {
        dispatch(cancelOrder(selectOrderId,reason))
        setShow(false)
        setOrderCanceled(true)
    }
    const handleClose =()=>setShow(false)
    const handleShow = (orderId) => {
        setSelectOrderId(orderId)
        setShow(true)
    }

    const latestUserStatus =orderDetail.status && orderDetail.status.length > 0 ? orderDetail.status[orderDetail.status.length - 1].userStatus : '';
    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <div className="row d-flex justify-content-between">
                        <div className="col-12 col-lg-8 mt-5 order-details">

                            <h1 className="my-5">Order # {orderDetail._id}</h1>

                            <h4 className="mb-4">Shipping Info</h4>
                            <p><b>Name:</b> {user.name}</p>
                            <p><b>Phone:</b> {shippingInfo.phoneNumber}</p>
                            <p className="mb-4"><b>Address:</b>{shippingInfo.address}, {shippingInfo.city}, {shippingInfo.postalCode}, {shippingInfo.state},{shippingInfo.country}</p>
                            <p><b>Amount:</b> ${totalPrice}</p>

                            <hr />

                            <h4 className="my-4">Payment</h4>
                            <p className={isPaid ? 'greenColor' : 'redColor'}><b>{isPaid ? 'PAID' : 'NOT PAID'}</b></p>


                            <h4 className="my-4">Order Status:</h4>
                        {latestUserStatus !== 'canceled'  ? (<div className={orderStatus && orderStatus.includes('delivered') ? 'greenColor' : 'redColor'}>
                               <OrderSteps status={orderStatus} createdAt={createdAt} deliveredAt={deliveredAt}/>
                               {orderStatus !== 'delivered' && orderStatus !== 'delivered' && <button className='btn btn-danger' 
                                disabled={loading}
                                onClick={()=>handleShow(orderDetail._id)}>
                                    cancel order
                                </button>}
                            </div>) :(
                            <div>
                            <p >Status:<span className='redColor'>you have {latestUserStatus} the order</span> </p>
                          </div>
                            )}


                            <h4 className="my-4">Order Items:</h4>

                            <hr />
                            <div className="cart-item my-1">
                                {orderItems && orderItems.map(item => (
                                    <div className="row my-5">
                                        <div className="col-4 col-lg-2">
                                            <img src={item.image} alt={item.name} height="45" width="65" />
                                        </div>

                                        <div className="col-5 col-lg-5">
                                            <Link to={`/singleproduct/${item.product}`}>{item.name}</Link>
                                        </div>


                                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                            <p>${item.price}</p>
                                        </div>

                                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                            <p>{item.quantity} Piece(s)</p>
                                        </div>
                                    </div>

                                ))}
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Cancel Order</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form>
                                            <Form.Group controlId="cancelReason">
                                                <Form.Label>Reason for cancellation</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    value={reason}
                                                    onChange={(e) => setReason(e.target.value)}
                                                />
                                            </Form.Group>
                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                        <Button variant="primary" onClick={handleCancelOrder}>
                                            Cancel Order
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                            <hr />
                        </div>
                    </div>
                </Fragment>
            }
        </Fragment>
    )
}

export default OrderDetail
