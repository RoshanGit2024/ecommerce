import React, { Fragment, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteUser ,getUsers} from '../../actions/userActions'
import {clearError, clearUserDeleted} from '../../slices/userSlice'
import Sidebar from './Sidebar'
import Loader from '../Loader'
import {MDBDataTable} from 'mdbreact'
import { toast } from 'react-toastify'


function UserList() {
    const { users, loading = true, error,isUserDeleted } = useSelector(state => state.userState)
    const dispatch = useDispatch()

    const setUsers = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Role',
                    field: 'role',
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
        users.forEach(user => {
            data.rows.push({
                id: user._id,
                name: user.name,
                email: user.email,
                role:user.role,
                actions: (
                    <Fragment>
                        <Link to={`/admin/user/${user._id}`} className='btn btn-primary'><i className='fa fa-pencil'></i></Link>
                        <Button onClick={e=>handleDelete(e,user._id)} className='btn btn-danger py-1 px-2 ml-3'>
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
        dispatch(deleteUser(id))
    } 

    useEffect(() => {
        if (error) {
            toast(error, {
                type: 'error',
                onOpen: () => { dispatch(clearError()) }
            });
            return
        }

        if(isUserDeleted){
            toast.success("user deleted successfully",{
              onOpen:()=>dispatch(clearUserDeleted())
            })
            return;
        }
        dispatch(getUsers)
    }, [dispatch, error,isUserDeleted])
    return (
        <div className='row'>
            <div className='col-12 col-md-2'>
                <Sidebar />
            </div>
            <div className="col-12 col-md-10">
                <h1 className="my-4">Users list</h1>
                 <Fragment>
                    {loading ? <Loader/>:
                       <MDBDataTable 
                           data={setUsers()}
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

export default UserList
