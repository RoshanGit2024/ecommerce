import React, { Fragment, useEffect, useState } from 'react'
import { clearAuthError, updatePassword as updatePasswordAction } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../Loader';
import MetaData from '../MetaData';

function UpdatePassword() {
    const [password, setPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("")
    const dispatch = useDispatch()
    const { isUpdated, error, loading } = useSelector(state => state.authState)

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            oldPassword,
            password
        };
        dispatch(updatePasswordAction(formData))
    }

    useEffect(() => {
        if (isUpdated) {
            setOldPassword("")
            setPassword("")
            return
        }

        if (error) {
            toast(error, {
                type: 'error',
                onOpen: () => { dispatch(clearAuthError) }
            });
            return
        }
    }, [isUpdated, error, dispatch])
    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <MetaData title={'Update password'} />
                    <div className="row wrapper">
                        <div className="col-10 col-lg-5">
                            <form onSubmit={handleSubmit} className="shadow-lg">
                                <h1 className="mt-2 mb-5">Update Password</h1>
                                <div className="form-group">
                                    <label htmlFor="old_password_field">Old Password</label>
                                    <input type="password"
                                        id="old_password_field"
                                        className="form-control"
                                        value={oldPassword}
                                        onChange={e => setOldPassword(e.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="new_password_field">New Password</label>
                                    <input type="password"
                                        id="new_password_field"
                                        className="form-control"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)} />
                                </div>

                                <button type="submit" className="btn update-btn btn-block mt-4 mb-3">Update Password</button>
                            </form>
                        </div>
                    </div>
                </Fragment>}
        </Fragment>
    )
}

export default UpdatePassword
