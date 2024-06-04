import React, { Fragment, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { clearError } from '../../slices/productSlice'
import { getAdminProducts } from '../../actions/productActions'
import Sidebar from './Sidebar'
import Loader from '../Loader'
import {MDBDataTable} from 'mdbreact'
import { toast } from 'react-toastify'


function ProductList() {
    const { products = [], loading = true, error } = useSelector(state => state.productState)
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
                ,
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
                        <Button className='btn btn-danger py-1 px-2 ml-3'>
                            <i className='fa fa-trash'></i>
                        </Button>
                    </Fragment>
                )
            })
        })
        return data
    }

    useEffect(() => {
        if (error) {
            toast(error, {
                type: 'error',
                onOpen: () => { dispatch(clearError()) }
            });
            return
        }
        dispatch(getAdminProducts)
    }, [dispatch, error])
    return (
        <div className='row'>
            <div className='col-12 col-md-2'>
                <Sidebar />
            </div>
            <div className="col-12 col-md-10">
                <h1 className="my-4">Product list</h1>
                 <Fragment>
                    {loading ? <Loader/>:
                       <MDBDataTable 
                           data={setProducts()}
                           bordered
                           striped
                           hover
                           className='px-3'
                       />
                    }
                 </Fragment>
            </div>
        </div>
    )
}

export default ProductList
