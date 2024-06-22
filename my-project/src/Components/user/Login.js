import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../MetaData'
import { clearAuthError, login } from '../../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { syncCartItems } from '../../actions/myCartActions'


function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [attempt, setAttempt] = useState(0)
    const [isLocked, setIsLocked] = useState(false)
    const [lockoutTimer, setLockoutTimer] = useState(0)

    const MAX_ATTEMPT = 18
    const MAX_DURATION = 12

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const { loading, error, isAuthenticated ,user} = useSelector(state => state.authState)
    const redirect = location.search ? '/' + location.search.split('=')[1] : '/';

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(syncCartItems(user._id));
            navigate(redirect)
            setAttempt(0)
        } else {
            setAttempt((prevAttempts) => {
                const newAttempts = prevAttempts + 1;
                if (newAttempts >= MAX_ATTEMPT) {
                    setIsLocked(true);
                    setLockoutTimer(MAX_DURATION);
                }
                return newAttempts;
            });
        }
        if (error) {
            toast(error, {
                type: 'error',
                onOpen: () => { dispatch(clearAuthError) }
            });
            return
        }
    }, [error, isAuthenticated, dispatch]);

    useEffect(() => {
        let timer;
        if (isLocked && lockoutTimer > 0) {
            timer = setInterval(() => {
                setLockoutTimer((prevTime) => prevTime - 1)
            }, 1000)
        }

        if (lockoutTimer === 0 && isLocked) {
            setIsLocked(false)
            setAttempt(0)
        }
        return () => clearInterval(timer)
    }, [isLocked, lockoutTimer])

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    }

    return (
        <Fragment  >
            <MetaData title={'Login'} />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    {isLocked ? (
                        <Fragment>
                            <div class="alert alert-danger" role="alert">Too many incorrect attempts.please try after <b className='text-danger'>{lockoutTimer}</b> seconds</div>
                            <form onSubmit={handleSubmit} className="shadow-lg">
                                <h1 className="mb-3">Login</h1>
                                <div className="form-group">
                                    <label htmlFor="email_field">Email</label>
                                    <input type="email"
                                        id="email_field"
                                        className="form-control"
                                        value={email}
                                        disabled
                                        onChange={e => setEmail(e.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password_field">Password</label>
                                    <input type="password"
                                        id="password_field"
                                        className="form-control"
                                        value={password}
                                        disabled
                                        onChange={e => setPassword(e.target.value)} />
                                </div>

                                <Link className="float-right mb-4">Forgot Password?</Link>

                                <button id="login_button" type="submit" className="btn btn-block py-3" disabled={true}>
                                    LOGIN
                                </button>

                                <Link to={'/register'} className="float-right mt-3">New User?</Link>
                            </form>
                        </Fragment>
                    )
                        : (
                            <form onSubmit={handleSubmit} className="shadow-lg">
                                <h1 className="mb-3">Login</h1>
                                <div className="form-group">
                                    <label htmlFor="email_field">Email</label>
                                    <input type="email"
                                        id="email_field"
                                        className="form-control"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password_field">Password</label>
                                    <input type="password"
                                        id="password_field"
                                        className="form-control"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)} />
                                </div>

                                <Link to={'/password/forgot'} className="float-right mb-4">Forgot Password?</Link>

                                <button id="login_button" type="submit" className="btn btn-block py-3" disabled={loading}>
                                    LOGIN
                                </button>

                                <Link to={'/register'} className="float-right mt-3">New User?</Link>
                            </form>)}
                </div>
            </div>
        </Fragment>
    )
}

export default Login
