import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile, clearAuthError } from '../../actions/userActions'
import { toast } from 'react-toastify'
import Loader from '../Loader'
import MetaData from '../MetaData'

function UpdateProfile() {
    const { loading, error, isUpdated, user } = useSelector(state => state.authState)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [avatar, setAvatar] = useState("")
    const [avatarPreview, setAvatarPriview] = useState("/images/default_avatar.png")
    const dispatch = useDispatch()

    const onchangeAvatar = (e) => {
        const reader = new FileReader;
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPriview(reader.result)
                setAvatar(e.target.files[0])
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name)
        formData.append('email', email)
        formData.append('avatar', avatar)
        dispatch(updateProfile(formData))
    }

    useEffect(() => {
        if (user) {
            setName(user.name)
            setEmail(user.email)
            if (user.avatar) {
                setAvatarPriview(user.avatar)
            }
        }
        if (isUpdated) {
            toast.success("profile updated successfully")
            return
        }
        if (error) {
            toast(error, {
                type: 'error',
                onOpen: () => { dispatch(clearAuthError) }
            });
            return
        }
    }, [user, isUpdated, error, dispatch])

    return (
        <Fragment>
            {loading ? <Loader/> : 
            <Fragment>
                <MetaData title={'updating profile'}/>
                <div className="row wrapper">
                    <div className="col-10 col-lg-5">
                        <form onSubmit={handleSubmit} className="shadow-lg" encType='multipart/form-data'>
                            <h1 className="mt-2 mb-5">Update Profile</h1>

                            <div className="form-group">
                                <label htmlFor="email_field">Name</label>
                                <input type="name"
                                    id="name_field"
                                    className="form-control"
                                    name='name'
                                    value={name}
                                    onChange={e => setName(e.target.value)} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email_field">Email</label>
                                <input type="email"
                                    id="email_field"
                                    className="form-control"
                                    name='email'
                                    value={email}
                                    onChange={e => setEmail(e.target.value)} />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='avatar_upload'>Avatar</label>
                                <div className='d-flex align-items-center'>
                                    <div>
                                        <figure className='avatar mr-3 item-rtl'>
                                            <img src={avatarPreview} className='rounded-circle' alt='Avatar Preview' />
                                        </figure>
                                    </div>
                                    <div className='custom-file'>
                                        <input type='file'
                                            name='avatar'
                                            className='custom-file-input'
                                            id='customFile'
                                            onChange={onchangeAvatar} />
                                        <label className='custom-file-label' htmlFor='customFile'>
                                            Choose Avatar
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="btn update-btn btn-block mt-4 mb-3">Update</button>
                        </form>
                    </div>
                </div>
            </Fragment>}
        </Fragment>
    )
}

export default UpdateProfile
