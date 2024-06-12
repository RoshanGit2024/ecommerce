import React, { Fragment, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { clearError ,clearProductDeleted} from '../../slices/productSlice'
import { deleteProduct, getAdminProducts } from '../../actions/productActions'
import Sidebar from './Sidebar'
import Loader from '../Loader'
import {MDBDataTable} from 'mdbreact'
import { toast } from 'react-toastify'
import MetaData from '../MetaData'
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';


function ProductList() {
    const { products = [], loading = true, error } = useSelector(state => state.productState)
    const { isProductDeleted,error:productError} = useSelector(state => state.prodSingleState)
    const [open, setOpen] = useState(false)
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    const dispatch = useDispatch()

    const setProducts = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Stock',
                    field: 'stock',
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
        products.forEach(product => {
            data.rows.push({
                id: product._id,
                name: product.name,
                price: `$${product.price}`,
                stock: product.stock,
                actions: (
                    <Fragment>
                        <Link to={`/admin/product/${product._id}`} className='btn btn-primary'><i className='fa fa-pencil'></i></Link>
                        <Button onClick={()=>handleOpen(product._id)} className='btn btn-danger py-1 px-2 ml-3'>
                            <i className='fa fa-trash'></i>
                        </Button>
                    </Fragment>
                )
            })
        })
        return data
    }

    const handleDelete = (e,id) =>{
        setOpen(false)
        e.target.disabled=true
        dispatch(deleteProduct(id))
    } 

    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = (id) => {
        setSelectedOrderId(id)
        setOpen(true)
    }

    useEffect(() => {
        if (error || productError) {
            toast(error || productError, {
                type: 'error',
                onOpen: () => { dispatch(clearError()) }
            });
            return
        }

        if(isProductDeleted){
            toast.success("product deleted successfully",{
              onOpen:()=>dispatch(clearProductDeleted())
            })
            return;
        }
        dispatch(getAdminProducts)
    }, [dispatch, error,isProductDeleted])
    return (
        <div className='row'>
            <div className='col-12 col-md-2'>
                <Sidebar />
            </div>
            <div className="col-12 col-md-10">
                <h1 className="my-4">Product list</h1>
                 <Fragment>
                    {loading ? <Loader/>:
                    <Fragment>
                        <MetaData title={'admin product list'}/>
                       <MDBDataTable 
                           data={setProducts()}
                           bordered
                           striped
                           hover
                           className='px-3'
                       />
                     </Fragment>
                    }
                 </Fragment>
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    Please confirm
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure want to Delete <b >{selectedOrderId}</b>?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                    <Button onClick={e => handleDelete(e,selectedOrderId)} style={{ background: 'red', color: 'white', border: 'none' }} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ProductList
