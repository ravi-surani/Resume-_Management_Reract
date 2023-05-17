import { ADD_INTERVIEWER_FAILURE, ADD_INTERVIEWER_REQUEST, ADD_INTERVIEWER_SUCCESS } from "../../actionTypes"

const initialState = {
    loading : false,
    data : {},
    error : ""
}

const addInterviewerreducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_INTERVIEWER_REQUEST : return {
            ...state,
            loading : true,
            error: ""
        }
        case ADD_INTERVIEWER_SUCCESS : return {
            ...state,
            loading : false,
            error : "",
            data : action.payload
        }
        case ADD_INTERVIEWER_FAILURE : return {
            ...state,
            loading : false,
            data : "",
            error : action.payload
        }
        default : return state
    }
}

export {addInterviewerreducer}
