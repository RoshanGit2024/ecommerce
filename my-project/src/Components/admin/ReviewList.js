import React, { Fragment, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { deleteReview ,getReviews} from '../../actions/productActions'
import {clearError, clearReviewDeleted} from '../../slices/productSlice'
import Sidebar from './Sidebar'
import Loader from '../Loader'
import {MDBDataTable} from 'mdbreact'
import { toast } from 'react-toastify'
import MetaData from '../MetaData'


function ReviewList() {
    const { reviews=[], loading = true, error,isReviewDeleted } = useSelector(state => state.prodSingleState)
    const[productId,setProductId]=useState("")
    const dispatch = useDispatch()

    const setReviews = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Rating',
                    field: 'rating',
                    sort: 'asc'
                },
                {
                    label: 'User',
                    field: 'user',
                    sort: 'asc'
                },
                {
                    label: 'Comment',
                    field: 'comment',
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
        reviews.forEach(review => {
            data.rows.push({
                id: review._id,
                rating: review.rating,
                user: review.user.name,
                comment:review.comment,
                actions: (
                    <Fragment>
                        <Button onClick={e=>handleDelete(e,review._id)} className='btn btn-danger py-1 px-2 ml-3'>
                            <i className='fa fa-trash'></i>
                        </Button>
                    </Fragment>
                )
            })
        })
        return data
    }

    const handleDelete = (e,id) =>{
        e.target.disabled=true
        dispatch(deleteReview(productId,id))
    } 

    const handleSubmit =(e)=>{
        e.preventDefault()
        dispatch(getReviews(productId))
    }
    useEffect(() => {

        //if error occured during deleted
        if (error) {
            toast(error, {
                type: 'error',
                onOpen: () => { dispatch(clearError()) }
            });
            return
        }

       //if review has been successfully deleted
        if(isReviewDeleted){
            toast.success("Review deleted successfully",{
              onOpen:()=>dispatch(clearReviewDeleted())
            })
            dispatch(getReviews(productId))
            return;
        }
    }, [dispatch, error,isReviewDeleted])
    return (
        <div className='row'>
            <div className='col-12 col-md-2'>
                <Sidebar />
            </div>
            <div className="col-12 col-md-10">
                <h1 className="my-4">Reviews list</h1>
                <div className='row justify-content-center mt-5'>
                    <div className='col-5'>
                        <form onSubmit={handleSubmit}>
                            <div className='form-group'>
                              <label>Product ID</label>
                              <input
                                 type='text'
                                 onChange={e => setProductId(e.target.value)}
                                 value={productId} 
                                 className='form-control'
                                 placeholder='enter the product Id'
                              />
                              <button type='submit' 
                              disabled={loading}
                              className='btn btn-primary btn-block py-2'>
                                Search
                              </button>
                            </div>
                        </form>
                    </div>
                </div>
                 <Fragment>
                    {loading ? <Loader/>:
                    <Fragment>
                        <MetaData title={'Product Review list'}/>
                       <MDBDataTable 
                           data={setReviews()}
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

export default ReviewList
