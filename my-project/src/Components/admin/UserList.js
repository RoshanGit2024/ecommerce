import React, { Fragment, useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteUser ,getUsers} from '../../actions/userActions'
import {clearError, clearUserDeleted} from '../../slices/userSlice'
import Sidebar from './Sidebar'
import Loader from '../Loader'
import {MDBDataTable} from 'mdbreact'
import { toast } from 'react-toastify'
import MetaData from '../MetaData'


function UserList() {
    const { users, loading = true, error,isUserDeleted } = useSelector(state => state.userState)
    const[show,setShow]=useState(false)
    const[password,setPassword]=useState('')
    const[confirmPassword,setConfirmPassword]=useState('')
    const dispatch = useDispatch()

    const handleClose =()=> {
        setShow(false)
    }

    const handleShow =()=> {
        setShow(true)
    }

    const handleSubmit =()=> {
        setShow(false)
    }
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
                        <Button className='btn btn-primary py-1 px-2 ml-3' onClick={handleShow}>
                            Reset password
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
                    <Fragment>
                        <MetaData title={'users list'}/>
                       <MDBDataTable 
                           data={setUsers()}
                           bordered
                           striped
                           hover
                           className='px-3'
                       />
                    </Fragment>
                    }
                 </Fragment>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Reset password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' placeholder='enter the password here' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        </Form.Group>
                        <Form.Group controlId='confirmPassword'>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type='password' placeholder='confirm password here' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>close</Button>
                    <Button variant='primary' onClick={handleSubmit}>submit</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default UserList
