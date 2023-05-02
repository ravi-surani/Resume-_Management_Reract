import Constants from '../Constants'




export const loginUserReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.USER_LOG_IN_REQUEST: {
            return { ...state, Loading: true, Error:'' }
        }
        case Constants.USER_LOG_IN_SUCESS: {
            return { ...state, userDetails: action.data, Loading: false, Error:'' }
        }
        case Constants.USER_LOG_IN_FAILED: {
            return { ...state, Error: action.data, Loading: false }
        }
        default:
            return { ...state }
    }
}


export const getAllUsers = (state = {}, action) => {
    switch (action.type) {
        case Constants.GET_ALL_USER_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.GET_ALL_USER_SUCESS: {
            return { ...state, userList: action.data, Loading: false }
        }
        case Constants.GET_ALL_USER_FAILED: {
            return { ...state, Error: '', Loading: false }
        }
        default:
            return { ...state }
    }
}
export const createNewUserReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.CREATE_NEW_USER_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.CREATE_NEW_USER_SUCESS: {
            return { ...state, userDetails: action.data, Loading: false }
        }
        case Constants.CREATE_NEW_USER_FAILED: {
            return { ...state, Error: '', Loading: false }
        }
        default:
            return { ...state }
    }
}


export const reomveUserReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.REMOVE_USER_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.REMOVE_USER_SUCESS: {
            return { ...state, removeUserDetails: action.data, Loading: false }
        }
        case Constants.REMOVE_USER_FAILED: {
            return { ...state, Error: '', Loading: false }
        }
        default:
            return { ...state }
    }
}
