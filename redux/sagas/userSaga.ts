import { PayloadAction } from '@reduxjs/toolkit'
import { call, delay, put, takeLatest } from 'redux-saga/effects'
import { userActions } from '../reducers/userReducer.ts';
import { joinApi, loginApi, logoutApi, delUserApi } from '../api/userApi.ts'

interface UserJoinType{
    type: string;
    payload: {
        userid:string, password:string, email:string, 
        name:string, phone:string, birth:string, address:string
    }
}
interface UserLoginType{
    type: string;
    payload: {
        userid:string, password:string
    }
}
interface UserJoinSuccessType{
    type: string;
    payload: {
        userid: string
    }
}
interface UserLoginSuccessType{
    type: string;
    payload: {
        userid:string, email:string, 
        name:string, phone:string, birth:string, address:string
    }
}
function* join(user: UserJoinType){
    try{
        const response : UserJoinSuccessType = yield joinApi(user.payload)
        yield put(userActions.joinSuccess(response))
    }catch(error){
         yield put(userActions.joinFailure(error))
    }
}
export function* watchJoin(){
    yield takeLatest(userActions.joinRequest, join)
}

function* login(login: UserLoginType){
    try{
        const response : UserLoginSuccessType = yield loginApi(login.payload)
        yield put(userActions.loginSuccess(response))
        window.location.href = '/'
    }catch(error){
         yield put(userActions.loginFailure(error))
    }
}
export function* watchLogin(){
    yield takeLatest(userActions.loginRequest, login)
} 

//watchLogout
function* logout(){
    try{
        const response : UserLoginSuccessType = yield logoutApi()
        yield put(userActions.logoutSuccess(response))
        window.location.href = '/'
    }catch(error){
         yield put(userActions.logoutFailure(error))
    }
}
export function* watchLogout(){
    yield takeLatest(userActions.logoutRequest, logout)
} 

//watchLogout
function* delUser(){
    try{
        const response : UserLoginSuccessType = yield delUserApi()
        yield put(userActions.delUserSuccess(response))
    }catch(error){
         console.log(error)
    }
}
export function* watchDelUser(){
    yield takeLatest(userActions.delUserRequest, delUser)
} 