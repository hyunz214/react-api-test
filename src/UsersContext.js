import React , {createContext, useReducer, useContext} from 'react';
import axios from 'axios';
import * as api from './api';
import createAsyncDispatcher, { createAsyncHandler, initialAsyncState } from './asyncActionUtils';

// 초기 설정
const initialState = {
    users : initialAsyncState,
    user : initialAsyncState
}

// 하나의 요청에 대해서 3개의 액션을 만들어 줌
// GET_USERS
// GET_USERS_SUCCESS
// GET_USERS_ERROR

// GET_USER
// GET_USER_SUCCESS
// GET_USER_ERROR

const usersHandler = createAsyncHandler('GET_USERS', 'users');
const userHandler = createAsyncHandler('GET_USER', 'user');

function userReducer(state, action){
    switch(action.type){
        case 'GET_USERS' : 
        case 'GET_USERS_SUCCESS' : 
        case 'GET_USERS_ERROR' : 
            return usersHandler(state, action);
        case 'GET_USER' : 
        case 'GET_USER_SUCCESS' : 
        case 'GET_USER_ERROR' : 
            return userHandler(state, action); 
        default : 
            throw new Error('Unhandle action type', action.type);

    }
}


const UsersStateContext = createContext(null);
const UsersDispatchContext = createContext(null);

export function UsersProvider ({ children }) {
    const [state, dispatch] = useReducer(userReducer, initialState);
    return (
        <UsersStateContext.Provider value={state}>
            <UsersDispatchContext.Provider value={dispatch}>
                {children}
            </UsersDispatchContext.Provider>
        </UsersStateContext.Provider>

    )
}

export function useUsersState(){
    const state = useContext(UsersStateContext);
    if(!state){
        throw new Error('Cannot find UserProvider');
    }
    return state;
}

export function useUsersDispatch(){
    const dispatch = useContext(UsersDispatchContext);
    if(!dispatch){
        throw new Error('Cannot find UserProvider');
    }
    return dispatch;
}

export const getUsers = createAsyncDispatcher('GET_USERS', api.getUsers);
export const getUser = createAsyncDispatcher('GET_USER', api.getUser);