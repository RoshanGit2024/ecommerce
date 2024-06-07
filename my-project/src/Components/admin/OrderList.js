import React, { Fragment, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteOrder, adminOrders as adminOrdersAction } from '../../actions/orderActions'
import { clearError, clearOrderDeleted } from '../../slices/orderSlice'
import Sidebar from './Sidebar'
import Loader from '../Loader'
import { MDBDataTable } from 'mdbreact'
import { toast } from 'react-toastify'
import MetaData from '../MetaData'


function OrderList() {
    const { adminOrders = [], loading = true, error, isOrderDeleted } = useSelector(state => state.orderState)
    const dispatch = useDispatch()

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Number Of Items',
                    field: 'noOfItems',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Action',
                    field: 'actions',
                    sort: 'asc'
                }
            ],
            rows: []
        }
        adminOrders.forEach(order => {

            const latestUserStatus = order.status && order.status.length > 0
                ? order.status[order.status.length - 1].userStatus
                : '';

            let statusDisplay;
            if (latestUserStatus === 'canceled') {
                statusDisplay = <p style={{ color: 'red' }}>Canceled</p>;
            } else {
                statusDisplay = order.orderStatus && order.orderStatus.includes('delivered')
                    ? <p style={{ color: 'green' }}>{order.orderStatus}</p>
                    : <p style={{ color: 'red' }}>{order.orderStatus}</p>;
            }

            data.rows.push({
                id: order._id,
                noOfItems: order.orderItems.length,
                amount: `$${order.totalPrice}`,
                status:statusDisplay,
                actions: (
                    <Fragment>
                        <Link to={`/admin/order/${order._id}`} className='btn btn-primary'><i className='fa fa-pencil'></i></Link>
                        <Button onClick={e => handleDelete(e, order._id)} className='btn btn-danger py-1 px-2 ml-3'>
                            <i className='fa fa-trash'></i>
                        </Button>
                    </Fragment>
                )
            })
        })
        return data
    }

    const handleDelete = (e, id) => {
        e.target.disabled = true
        dispatch(deleteOrder(id))
    }

    useEffect(() => {
        if (error) {
            toast(error, {
                type: 'error',
                onOpen: () => { dispatch(clearError()) }
            });
            return
        }

        if (isOrderDeleted) {
            toast.success("order deleted successfully", {
                onOpen: () => dispatch(clearOrderDeleted())
            })
            return;
        }
        dispatch(adminOrdersAction)
    }, [dispatch, error, isOrderDeleted])
    return (
        <div className='row'>
            <div className='col-12 col-md-2'>
                <Sidebar />
            </div>
            <div className="col-12 col-md-10">
                <h1 className="my-4">Order list</h1>
                <Fragment>
                    {loading ? <Loader /> :
                    <Fragment>
                        <MetaData title={'orders list'}/>
                        <MDBDataTable
                            data={setOrders()}
                            bordered
                            striped
                            hover
                            className='px-3'
                        />
                     </Fragment>   
                    }
                </Fragment>
            </div>
        </div>
    )
}

export default OrderList
