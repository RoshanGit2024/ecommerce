import React, { Fragment, useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getUser, updateUser } from '../../actions/userActions'
import { clearError, clearUserUpdated } from '../../slices/userSlice'
import { toast } from 'react-toastify'
import Loader from '../Loader'
import MetaData from '../MetaData'

function UpdateUser() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("")
  const { id: userId } = useParams()

  const { loading, isProductUpdated, error, user } = useSelector(state => state.userState)
  const { user: authUser } = useSelector(state => state.authState)

  const navigate = useNavigate()
  const dispatch = useDispatch()


  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('role', role);
    dispatch(updateUser(userId, formData))
  }

  useEffect(() => {
    if (isProductUpdated) {
      toast.success("product updated successfully", {
        onOpen: () => dispatch(clearUserUpdated())
      })
      return
    }

    if (error) {
      toast.error(error, {
        onOpen: () => { dispatch(clearError()) }
      });
      return
    }
    dispatch(getUser(userId))
  }, [isProductUpdated, error, dispatch])

  useEffect(() => {
    if (user._id) {
      setName(user.name)
      setEmail(user.email)
      setRole(user.role)
    }
  }, [user])
  return (
    <Fragment>
      {loading ? <Loader /> :
        <Fragment>
          <MetaData title={'updating user details'} />
          <div className='row'>
            <div className='col-12 col-md-2'>
              <Sidebar />
            </div>
            <div className="col-12 col-md-10">
              <Fragment>
                <div className="wrapper my-5">
                  <form onSubmit={handleSubmit} className="shadow-lg" encType='multipart/form-data'>
                    <h1 className="mb-4">Update user</h1>

                    <div className="form-group">
                      <label htmlFor="name_field">name</label>
                      <input
                        type="text"
                        id="name_field"
                        className="form-control"
                        onChange={e => setName(e.target.value)}
                        value={name}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email_field">Email</label>
                      <input type="text"
                        id="email_field"
                        className="form-control"
                        onChange={e => setEmail(e.target.value)}
                        value={email} />
                    </div>

                    <div className='form-group'>
                      <label htmlFor="role_field">Role</label>
                      <select disabled={user._id == authUser._id} className='form-control'
                        onChange={e => setRole(e.target.value)}
                        value={role}
                        name='role'
                      >
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                        <option value="seller">seller</option>
                        <option value="customer support">customer support</option>
                      </select>
                    </div>


                    <button
                      id="login_button"
                      type="submit"
                      className="btn btn-block py-3"
                      disabled={loading}
                    >
                      Update
                    </button>

                  </form>
                </div>
              </Fragment>
            </div>
          </div>
        </Fragment>}
    </Fragment>
  )
}

export default UpdateUser
