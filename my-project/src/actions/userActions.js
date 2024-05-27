import { toast } from "react-toastify"
import { 
    clearError, 
    loginFail,
    loginRequest, 
    loginSuccess, 
    registerFail, 
    registerRequest, 
    registerSuccess,
    loadUserRequest,
    loadUserSuccess,
    loadUserFail ,
    logoutSuccess,
    logoutFail,
    updateProfileRequest,
    updateProfileSuccess,
    updateProfileFail,
    updatePasswordRequest,
    updatePasswordSuccess,
    updatePasswordFail
} from "../slices/authSlice"
import axios from 'axios'
axios.defaults.withCredentials = true;

export const login = (email,password)=>async(dispatch)=>{

    try {
        dispatch(loginRequest())
        const{data}=await axios.post('http://localhost:8000/api/v1/login',{email,password})
        dispatch(loginSuccess(data))
    } catch (error) {
        dispatch(loginFail(error.response.data.message))
    }
}

export const register = (userData)=>async(dispatch)=>{

    try {
        dispatch(registerRequest())

        const config = {
            headers:{
                'content-type':'multipart/form-data'
            }
        }
        const{data}=await axios.post('http://localhost:8000/api/v1/register',userData,config)
        dispatch(registerSuccess(data))
    } catch (error) {
        dispatch(registerFail(error.response.data.message))
    }
}

export const loaduser = async(dispatch)=>{

    try {
        dispatch(loadUserRequest())
        const{data}=await axios.get('http://localhost:8000/api/v1/myprofile',)
        dispatch(loadUserSuccess(data))
    } catch (error) {
        dispatch(loadUserFail(error.response.data.message))
    }
}

export const logout = async(dispatch)=>{

    try {
        await axios.get('http://localhost:8000/api/v1/logout',)
        dispatch(logoutSuccess())
        toast.success("Logout successful..")
    } catch (error) {
        dispatch(logoutFail)
        toast.error("logout fail...")
    }
}

export const updateProfile = (userData)=>async(dispatch)=>{

    try {
        dispatch(updateProfileRequest())

        const config = {
            headers:{
                'content-type':'multipart/form-data'
            },
            withCredentials: true,
        }
        const{data}=await axios.put('http://localhost:8000/api/v1/update',userData,config)
        dispatch(updateProfileSuccess(data))
    } catch (error) {
        dispatch(updateProfileFail(error.response.data.message))
    }
}

export const updatePassword = (formData)=>async(dispatch)=>{

    try {
        dispatch(updatePasswordRequest())
        const config = {
            headers:{
                'Content-type':'application/json'
            }
        }
        await axios.put('http://localhost:8000/api/v1/password/change',formData,config)
        dispatch(updatePasswordSuccess())
    } catch (error) {
        dispatch(updatePasswordFail(error.response.data.message))
    }
}


export const clearAuthError=dispatch=>{
    dispatch(clearError())
}