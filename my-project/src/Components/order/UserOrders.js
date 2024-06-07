import React, { Fragment, useEffect } from 'react'
import MetaData from '../MetaData'
import {MDBDataTable} from 'mdbreact'
import {userOrders as userOrdersActions} from '../../actions/orderActions'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function UserOrders() {
    const{userOrders=[]}=useSelector(state=>state.orderState)

    const dispatch = useDispatch()

    useEffect(()=>{
      dispatch(userOrdersActions)
    },[])
    const setOrders =()=>{
        const data={
            columns:[
                {
                    label:"order ID",
                    field:'id',
                    sort:"asc"
                },
                {
                    label:"Number of Items",
                    field:'numOfItems',
                    sort:"asc"
                },
                {
                    label:"Amount",
                    field:'amount',
                    sort:"asc"
                },
                {
                    label:"status",
                    field:'status',
                    sort:"asc"
                },
                {
                    label:"Actions",
                    field:'actions',
                    sort:"asc"
                }
            ],
            rows:[]
        }
        userOrders.forEach(userOrder=>{

            const latestUserStatus = userOrder.status && userOrder.status.length > 0 
            ? userOrder.status[userOrder.status.length - 1].userStatus 
            : '';

            let statusDisplay;

            if(latestUserStatus == 'canceled'){
                statusDisplay = <p style={{color:'red'}}>canceled</p>
            }else{
                statusDisplay = userOrder.orderStatus && userOrder.orderStatus.includes('delivered')?
                (<p style={{color:'green'}}>{userOrder.orderStatus}</p>):
                (<p style={{color:'red'}}>{userOrder.orderStatus}</p>)
            }

            data.rows.push({
                id:userOrder._id,
                numOfItems:userOrder.orderItems.length,
                amount:`$${userOrder.totalPrice}`,
                status:statusDisplay,
                actions:<Link to={`/orders/${userOrder._id}`} className='btn btn-primary'>
                    <i className='fa fa-eye'></i>
                </Link>
            })
        })

        return data;
    }
  return (
    <Fragment>
        <MetaData title={'My orders'}/>
        <h1 className='mt-5'>My orders</h1>
        <MDBDataTable
           className='px-3'
           bordered
           striped
           hover
           data={setOrders()}
        />
    </Fragment>
  )
}

export default UserOrders
