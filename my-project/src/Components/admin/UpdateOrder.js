import React, { Fragment, useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { orderDetail as orderDetailAction, updateOrder } from '../../actions/orderActions'
import { toast } from 'react-toastify'
import { clearOrderUpdated, clearError } from '../../slices/orderSlice'
import Loader from '../Loader'
import MetaData from '../MetaData'

function UpdateOrder() {
  const { id: orderId } = useParams()

  const { loading, isOrderUpdated, error, orderDetail } = useSelector(state => state.orderState)
  const { user = {}, orderItems = [], shippingInfo = {}, totalPrice = 0, paymentInfo = {}, status = [] } = orderDetail
  const isPaid = paymentInfo.status === 'succeeded' ? true : false;
  const [orderStatus, setOrderStatus] = useState('')

  const categories = [
    'Electronics',
    'Mobile phones',
    'Laptops',
    'Food',
    'Books',
    'cloths/shoes',
    'Sports',
    'Outdoor',
    'Home',
    'Accessories'
  ];

  const navigate = useNavigate()
  const dispatch = useDispatch()


  const handleSubmit = (e) => {
    e.preventDefault();
    const orderData = {}

    orderData.orderStatus = orderStatus;
    const formData = new FormData();

    dispatch(updateOrder(orderId, orderData))
  }


  useEffect(() => {
    if (isOrderUpdated) {
      toast.success("order updated successfully", {
        onOpen: () => dispatch(clearOrderUpdated())
      })
      return
    }

    if (error) {
      toast.error(error, {
        onOpen: () => { dispatch(clearError()) }
      });
      return
    }
    dispatch(orderDetailAction(orderId))
  }, [isOrderUpdated, error, dispatch])

  useEffect(() => {
    if (orderDetail._id) {
      setOrderStatus(orderDetail.orderStatus)
    }
  }, [orderDetail])

  const latestUserStatus = status && status.length > 0
    ? status[status.length - 1].userStatus
    : '';

  let reason = status && status.length > 0 ? status[status.length - 1].reason : '';
  return (
    <Fragment>
      {loading ? <Loader/> : 
      <Fragment>
        <MetaData title={'updating order detail'}/>
        <div className='row'>
          <div className='col-12 col-md-2'>
            <Sidebar />
          </div>
          <div className="col-12 col-md-10">
            <Fragment>
              <div className="row d-flex justify-content-around">
                <div className="col-12 col-lg-8 mt-5 order-details">

                  <h1 className="my-5">Order # {orderDetail._id}</h1>

                  <h4 className="mb-4">Shipping Info</h4>
                  <p><b>Name:</b> {user.name && user.name}</p>
                  <p><b>Phone:</b> {shippingInfo.phoneNumber}</p>
                  <p className="mb-4"><b>Address:</b>{shippingInfo.address}, {shippingInfo.city}, {shippingInfo.postalCode}, {shippingInfo.state},{shippingInfo.country}</p>
                  <p><b>Amount:</b> ${totalPrice}</p>

                  <hr />

                  <h4 className="my-4">Payment</h4>
                  <p className={isPaid ? 'greenColor' : 'redColor'}><b>{isPaid ? 'PAID' : 'NOT PAID'}</b></p>


                  <h4 className="my-4">Order Status:</h4>
                  {latestUserStatus !== 'canceled' ? (<p className={orderStatus && orderStatus.includes('delivered') ? 'greenColor' : 'redColor'}><b>{orderStatus}</b></p>) : (
                    <div>
                      <p className='redColor'><b>{latestUserStatus}</b></p>
                     {reason && <p>Reason: <b>{reason}</b></p>}
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
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </div>


                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                          <p>${item.price}</p>
                        </div>

                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                          <p>{item.quantity} Piece(s)</p>
                        </div>
                      </div>

                    ))}
                  </div>
                  <hr />
                </div>
                <div className="col-12 col-lg-3 mt-5">
                  <h4 className='my-4'>Order Status</h4>
                  <div className='form-group'>
                    <select className='form-control'
                      onChange={e => setOrderStatus(e.target.value)}
                      value={orderStatus}
                      name='status'
                      disabled={latestUserStatus == 'canceled'}
                    >
                      <option value="processing">processing</option>
                      <option value="shipped">shipped</option>
                      <option value="delivered">delivered</option>
                    </select>
                  </div>
                  <button
                    onClick={handleSubmit}
                    className='btn btn-primary btn-block'
                    disabled={loading}>
                    update status
                  </button>
                </div>
              </div>
            </Fragment>
          </div>
        </div>
      </Fragment>}
    </Fragment>
  )
}

export default UpdateOrder
