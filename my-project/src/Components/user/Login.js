import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../MetaData'
import { clearAuthError, login } from '../../actions/userActions'
import {useDispatch, useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import {useNavigate,Link, useLocation} from 'react-router-dom'


function Login({attempts,setAttempts,isLocked,setIsLocked,timer,setTimer}) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const {loading,error,isAuthenticated}=useSelector(state => state.authState)
    const redirect = location.search?'/'+location.search.split('=')[1]:'/';
   

    const handleSubmit =(e)=>{
        e.preventDefault();
        dispatch(login(email,password))
    }

    useEffect(() => {
        if(isAuthenticated){
            navigate(redirect)
        }
        if (error) {
          toast(error,{
            type:'error',
            onOpen:()=>{dispatch(clearAuthError)}
          });
          return
        }
      }, [error,isAuthenticated,dispatch]);

      {/*useEffect(()=>{
        if(attempts > 5){
            setIsLocked(true)
            setTimer(20)

            const countDown = setInterval(()=>{
                setTimer(prevTimer => {
                    if(prevTimer <= 1){
                   clearInterval(countDown);
                   setIsLocked(false);
                   setAttempts(0);
                   return 0;
                    }
                    return prevTimer - 1;
                })
            },1000)
        }
      },[attempts])*/}
    return (
        <Fragment  >
            <MetaData title={'Login'} />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    {isLocked ? (<p>Too many incorrect attempts.please try after {timer}seconds</p>):(
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
