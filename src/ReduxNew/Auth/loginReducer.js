import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "../actionTypes"

const initialState = {
    loading : false,
    data : {},
    error : ""
}


const loginReducer = (state = initialState, action) => {
    switch(action.type){
        case LOGIN_REQUEST : return {
            ...state,
            loading : true
        }
        case LOGIN_SUCCESS : return {
            ...state,
            loading : false,
            error : "",
            data : action.payload
        }
        case LOGIN_FAILURE : return {
            ...state,
            loading : false,
            data : "",
            error : action.payload
        }
        default : return state
    }
}

export {loginReducer}
