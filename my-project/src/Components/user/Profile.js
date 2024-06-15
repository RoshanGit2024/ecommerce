import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Avatar from './Avatar'
import Loader from '../Loader'
import MetaData from '../MetaData'
import { FaHeart } from "react-icons/fa";

function Profile() {
    const { user, loading } = useSelector(state => state.authState)

    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <MetaData title={'my profile'} />
                    <div className="row justify-content-around mt-5 user-info">
                        <div className="col-12 col-md-3">
                            <figure className='avatar avatar-profile'>
                                {user.avatar ? (
                                    <img className="rounded-circle img-fluid" src={user.avatar} alt={user.name} />
                                ) : (
                                    <Avatar name={user.name} size={270} fontSize={150} />
                                )}
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
                            <p>{user.name}</p>

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
        </Fragment>
    )
}

export default Profile
