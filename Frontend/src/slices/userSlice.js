import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        user:{},
        users:[],
        isUserUpdated:false,
        isUserDeleted:false,
        bulkMailSent:false
    },
    reducers: {
        usersRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        usersSuccess(state, action) {
            return {
                ...state,
                loading: false,
                users: action.payload.users
            }
        },
        usersFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        userRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        userSuccess(state, action) {
            return {
                ...state,
                loading: false,
                user: action.payload.user
            }
        },
        userFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        deleteUserRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        deleteUserSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isUserDeleted:true
            }
        },
        deleteUserFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        updateUserRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        updateUserSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isUserUpdated:true
            }
        },
        updateUserFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearUserDeleted(state,action){
            return {
                ...state,
                isUserDeleted:false
            }
        },
        clearUserUpdated(state,action){
            return {
                ...state,
                isUserUpdated:false
            }
        },
        bulkMailRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        bulkMailSuccess(state, action) {
            return {
                ...state,
                loading: false,
                bulkMailSent:true
            }
        },
        bulkMailFail(state, action) {
            return {
                ...state,
                loading: false,
                error:action.payload
            }
        },
        clearBulkMailsend(state,action){
            return {
                ...state,
                bulkMailSent:false
            }
        },
        clearError(state,action){
           return{
             ...state,
             error:null
           }
        }
    }
});

const { actions, reducer } = userSlice
export const { 
       userFail,
       userRequest,
       userSuccess,
       usersFail,
       usersRequest,
       usersSuccess,
       updateUserFail,
       updateUserRequest,
       updateUserSuccess,
       deleteUserFail,
       deleteUserRequest,
       deleteUserSuccess,
       clearError,
       clearUserDeleted,
       clearUserUpdated,
       bulkMailFail,
       bulkMailRequest,
       bulkMailSuccess,
       clearBulkMailsend
         } = actions

export default reducer