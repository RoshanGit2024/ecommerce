import { 
    clearError, 
    loginFail,
    loginRequest, 
    loginSuccess, 
    registerFail, 
    registerRequest, 
    registerSuccess 
} from "../slices/authSlice"
import axios from 'axios'

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
export const clearAuthError=dispatch=>{
    dispatch(clearError())
}