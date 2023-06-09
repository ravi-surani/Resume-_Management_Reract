import { ADD_CANDIDATE_FAILURE, ADD_CANDIDATE_REQUEST, ADD_CANDIDATE_SUCCESS, } from "../actionTypes"

const initialState = {
    loading : false,
    data : {},
    error : ""
}

const addCandidateReducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_CANDIDATE_REQUEST : return {
            ...state,
            loading : true,
            error: ""
        }
        case ADD_CANDIDATE_SUCCESS : return {
            ...state,
            loading : false,
            error : "",
            data : action.payload
        }
        case ADD_CANDIDATE_FAILURE : return {
            ...state,
            loading : false,
            data : "",
            error : action.payload
        }
        default : return state
    }
}

export {addCandidateReducer}
