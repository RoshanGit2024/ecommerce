import React, { useEffect, useState ,Fragment} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../actions/userActions'
import { clearError } from '../../slices/authSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import MetaData from '../MetaData'

function Register() {
    const[userData,setuserData]=useState({
        name:"",
        email:"",
        password:""
    })

    const[avatar,setAvatar]=useState("")
    const[avatarPreview,setavatarPreview]=useState("/images/default_avatar.png")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const{loading,error,isAuthenticated}=useSelector(state => state.authState)

    const handleChange=(e)=>{
        if(e.target.name === 'avatar'){
            const reader=new FileReader;
            reader.onload=()=>{
                if(reader.readyState === 2){
                    setavatarPreview(reader.result)
                    setAvatar(e.target.files[0])
                }
            }
            reader.readAsDataURL(e.target.files[0])
        }else{
            setuserData({...userData,[e.target.name]:e.target.value})
        }
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('name',userData.name)
        formData.append('email',userData.email)
        formData.append('password',userData.password)
        formData.append('avatar',avatar)
        dispatch(register(formData)) 
    }

    useEffect(()=>{
        if(isAuthenticated){
            navigate('/login')
        }
        if (error) {
            toast(error,{
              type:'error',
              onOpen:()=>{dispatch(clearError)}
            });
            return
          }
    },[isAuthenticated, error, navigate, dispatch])
    return (
        <Fragment>
            <MetaData title={'Register'}/>
        <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form onSubmit={handleSubmit} className="shadow-lg" encType='multipart/form-data'>
                    <h1 className="mb-3">Register</h1>

                    <div className="form-group">
                        <label htmlFor="email_field">Name</label>
                        <input name='name' onChange={handleChange} type="name" id="name_field" className="form-control"  />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email_field">Email</label>
                        <input type="email" id="email_field" name='email' onChange={handleChange} className="form-control"  />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password_field">Password</label>
                        <input type="password" id="password_field" name='password' onChange={handleChange} className="form-control"  />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='avatar_upload'>Avatar</label>
                        <div className='d-flex align-items-center'>
                            <div>
                                <figure className='avatar mr-3 item-rtl'>
                                    <img src={avatarPreview} className='rounded-circle' alt='image' />
                                </figure>
                            </div>
                            <div className='custom-file'>
                                <input type='file' name='avatar' className='custom-file-input' id='customFile' onChange={handleChange}/>
                                <label className='custom-file-label' htmlFor='customFile'>
                                    Choose Avatar
                                </label>
                            </div>
                        </div>
                    </div>

                    <button id="register_button" type="submit" className="btn btn-block py-3" disabled={loading}>
                        REGISTER
                    </button>
                </form>
            </div>
        </div>
        </Fragment>
    )
}

export default Register
