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
    updatePasswordFail,
    forgotPasswordRequest,
    forgotPasswordSuccess,
    forgotPasswordFail,
    resetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordFail
} from "../slices/authSlice"
import axios from 'axios'
import { deleteUserFail, 
        deleteUserRequest, 
        deleteUserSuccess, 
        updateUserFail, 
        updateUserRequest, 
        updateUserSuccess, 
        userFail, 
        userRequest, 
        userSuccess, 
        usersFail, 
        usersRequest, 
        usersSuccess 
    } from "../slices/userSlice";
axios.defaults.withCredentials = true;

export const login = (email,password)=>async(dispatch)=>{

    try {
        dispatch(loginRequest())
        const{data}=await axios.post(`${process.env.REACT_APP_API_URL}/login`,{email,password})
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
        const{data}=await axios.post(`${process.env.REACT_APP_API_URL}/register`,userData,config)
        dispatch(registerSuccess(data))
    } catch (error) {
        dispatch(registerFail(error.response.data.message))
    }
}

export const loaduser = async(dispatch)=>{

    try {
        dispatch(loadUserRequest())
        const{data}=await axios.get(`${process.env.REACT_APP_API_URL}/myprofile`,)
        dispatch(loadUserSuccess(data))
    } catch (error) {
        const errorMessage = error.response && error.response.data ? error.response.data.message : 'An error occurred';
        dispatch(loadUserFail(errorMessage))
    }
}

export const logout = async(dispatch)=>{

    try {
        await axios.get(`${process.env.REACT_APP_API_URL}/logout`,)
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
        const{data}=await axios.put(`${process.env.REACT_APP_API_URL}/update`,userData,config)
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
        await axios.put(`${process.env.REACT_APP_API_URL}/password/change`,formData,config)
        dispatch(updatePasswordSuccess())
        toast.success("password updated successfully")
    } catch (error) {
        dispatch(updatePasswordFail(error.response.data.message))
    }
}

export const getUsers = async(dispatch)=>{

    try {
        dispatch(usersRequest())
        const{data}=await axios.get(`${process.env.REACT_APP_API_URL}/admin/users`,)
        dispatch(usersSuccess(data))
    } catch (error) {
        const errorMessage = error.response && error.response.data ? error.response.data.message : 'An error occurred';
        dispatch(usersFail(errorMessage))
    }
}

export const getUser =id=> async(dispatch)=>{

    try {
        dispatch(userRequest())
        const{data}=await axios.get(`${process.env.REACT_APP_API_URL}/admin/user/${id}`)
        dispatch(userSuccess(data))
    } catch (error) {
        const errorMessage = error.response && error.response.data ? error.response.data.message : 'An error occurred';
        dispatch(userFail(errorMessage))
    }
}

export const deleteUser =id=> async(dispatch)=>{

    try {
        dispatch(deleteUserRequest())
        await axios.delete(`${process.env.REACT_APP_API_URL}/admin/user/${id}`)
        dispatch(deleteUserSuccess())
    } catch (error) {
        const errorMessage = error.response && error.response.data ? error.response.data.message : 'An error occurred';
        dispatch(deleteUserFail(errorMessage))
    }
}

export const updateUser = (id,formData)=>async(dispatch)=>{

    try {
        dispatch(updateUserRequest())
        const config = {
            headers:{
                'Content-type':'application/json'
            }
        }
        await axios.put(`${process.env.REACT_APP_API_URL}/admin/user/${id}`,formData,config)
        dispatch(updateUserSuccess())
        toast.success("user details updated successfully")
    } catch (error) {
        dispatch(updateUserFail(error.response.data.message))
    }
}
export const clearAuthError=dispatch=>{
    dispatch(clearError())
}

export const forgotPassword = (formData)=>async(dispatch)=>{

    try {
        dispatch(forgotPasswordRequest())
        const config = {
            headers:{
                'Content-type':'application/json'
            }
        }
        const{data} = await axios.post(`${process.env.REACT_APP_API_URL}/password/forgot`,formData,config)
        dispatch(forgotPasswordSuccess(data))
    } catch (error) {
        dispatch(forgotPasswordFail(error.response.data.message))
    }
}

export const resetPassword = (formData,token)=>async(dispatch)=>{

    try {
        dispatch(resetPasswordRequest())
        const config = {
            headers:{
                'Content-type':'application/json'
            }
        }
        const{data} = await axios.post(`${process.env.REACT_APP_API_URL}/password/reset/${token}`,formData,config)
        dispatch(resetPasswordSuccess(data))
    } catch (error) {
        dispatch(resetPasswordFail(error.response.data.message))
    }
}