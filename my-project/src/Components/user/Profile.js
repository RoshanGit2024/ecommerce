import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Avatar from './Avatar'
import Loader from '../Loader'
import MetaData from '../MetaData'
import { FaHeart } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { clearAuthError, loaduser, updateUserImage } from '../../actions/userActions'
import { toast } from 'react-toastify'
import { FaXmark } from "react-icons/fa6";
import axios from 'axios'

function Profile() {
    const { user, loading, isImageUpdated, error } = useSelector(state => state.authState)
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [file, setFile] = useState(null)
    const [avatarPreview, setAvatarPriview] = useState(user.avatar ? user.avatar : '/images/default_avatar.png')

    const onchangeAvatar = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPriview(reader.result)
                setFile(e.target.files[0])
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    const handleProfileDelete = async() =>{
       try {
        const response =await axios.delete(`${process.env.REACT_APP_API_URL}/deleteimage`)
        if(response.status === 200){
            toast.success("image deleted successfully")
            dispatch(loaduser)
        }else{
            toast.error("error occurd during deletion")
        }  
       } catch (error) {
           if(error.response.status === 404){
            toast.error("user not found")
           }else{
            toast.error("an error occurd")
           }
       }
    }

    const handleProfileUpdate = (e) => {
        e.preventDefault();
        if (!file) {
            toast.error("please upload any file to proceed")
            return;
        }
        const formData = new FormData();
        formData.append('avatar', file)
        dispatch(updateUserImage(formData))
        setOpen(false)
    }

    useEffect(() => {
        if (isImageUpdated) {
            toast.success("your image updated successfully")
            return
        }
        if (error) {
            toast(error, {
                type: 'error',
                onOpen: () => { dispatch(clearAuthError) }
            });
            return
        }
    }, [user, isImageUpdated, error, dispatch])
    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <MetaData title={'my profile'} />
                    <div className="row justify-content-around mt-5 user-info">
                        <div className="col-12 col-md-3">
                            <figure className='avatar avatar-profile avatar-container'>
                                {user.avatar ? (
                                    <img className="rounded-circle img-fluid mt-4 ml-4" src={user.avatar} alt={user.name} />
                                ) : (
                                    <Avatar name={user.name} size={270} fontSize={150} className="mt-5" />
                                )}
                                <div className='edit-button ml-0'><MdEdit size={25} onClick={() => setOpen(true)} /></div>
                            </figure>
                            <Link to={'/myprofile/update'} id="edit_profile" className="btn btn-primary btn-block my-5">
                                Edit Profile
                            </Link>
                            <hr className='my-2' />
                            <div className='mt-3'>
                                <h3 className='mb-3'>My activity</h3>
                                <ul className="your-activity">
                                    <li style={{
                                        cursor: 'pointer',
                                        listStyleType: 'none',
                                    }}>
                                        <FaHeart style={{ color: 'red' }} />
                                        <b className="ml-1">
                                            <Link to="/wishlist">Your wishlist</Link>
                                        </b>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-12 col-md-5">
                            <h4>Full Name</h4>
                            <p>{user.name} ({user.role === "admin" && (user.role)})</p>

                            <h4>Email Address</h4>
                            <p>{user.email}</p>

                            <h4>Joined</h4>
                            <p>{String(user.createdAt).substring(0, 10)}</p>

                            <Link to={'/orders'} className="btn btn-danger btn-block mt-5">
                                My Orders
                            </Link>

                            <Link to={'/myprofile/update/password'} className="btn btn-primary btn-block mt-3">
                                Change Password
                            </Link>
                        </div>
                    </div>
                </Fragment>}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>
                    <div className='d-flex justify-content-between'>
                        Update Profile
                        <FaXmark
                            onClick={() => setOpen(false)}
                            style={{ cursor: 'pointer' }}
                        />
                    </div>
                </DialogTitle>
                <DialogContent>
                    <div>
                        <figure className='avatar avatar-profile avatar-container mb-5'>
                            <img className="rounded-circle img-fluid mt-4 " src={avatarPreview} alt='avatar' />
                        </figure>
                    </div>
                    <div className='custom-file'>
                        <input type='file'
                            name='avatar'
                            className='custom-file-input'
                            id='customFile'
                            onChange={onchangeAvatar}
                        />
                        <label className='custom-file-label' htmlFor='customFile'>
                            Choose Avatar
                        </label>
                    </div>
                </DialogContent>
                <DialogActions>
                    <div className='d-flex justify-content-between'>
                    {user.avatar && <button 
                            onClick={handleProfileDelete}
                            style={{ background: 'white', 
                                     color: 'red',
                                     padding:'5px',
                                     border:'1px solid red',
                                     marginRight:'5px' }}
                                     >
                                        Remove picture
                                     </button>}
                        {file && (
                            <button 
                            onClick={handleProfileUpdate} 
                            style={{ background: 'red', color: 'white', border: 'none',padding:'5px 10px' }} autoFocus>
                                Update
                            </button>
                        )}
                    </div>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default Profile
