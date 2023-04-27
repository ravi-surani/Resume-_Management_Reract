import Constants from '../Constants'
export const getAllInterviewsReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.GET_ALL_INTERVIEWS_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.GET_ALL_INTERVIEWS_SUCESS: {
            return { ...state, InterviewsList: action.data, Loading: false }
        }
        case Constants.GET_ALL_INTERVIEWS_FAILED: {
            return { ...state, Error: '', Loading: false }
        }
        default:
            return { ...state }
    }
}

export const getInterviewsByIdReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.GET_INTERVIEWS_BY_ID_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.GET_INTERVIEWS_BY_ID_SUCESS: {
            return { ...state, InterviewsDetials: action.data, Loading: false }
        }
        case Constants.GET_INTERVIEWS_BY_ID_FAILED: {
            return { ...state, Error: '', Loading: false }
        }
        default:
            return { ...state }
    }
}

export const addInterviewsReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.ADD_INTERVIEWS_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.ADD_INTERVIEWS_SUCESS: {
            return { ...state, newInterviews: { sucess: true }, InterviewsDetials: null, Loading: false }
        }
        case Constants.ADD_INTERVIEWS_FAILED: {
            return { ...state, newInterviews: { sucess: false }, InterviewsDetials: null, Error: '', Loading: false }
        }
        default:
            return { ...state }
    }
}

export const updateInterviewsReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.UPDATE_INTERVIEWS_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.UPDATE_INTERVIEWS_SUCESS: {
            return { ...state, updatedInterviews: { sucess: true }, InterviewsDetials: null, Loading: false }
        }
        case Constants.UPDATE_INTERVIEWS_FAILED: {
            return { ...state, updatedInterviews: { sucess: false }, InterviewsDetials: null, Error: '', Loading: false }
        }
        default:
            return { ...state }
    }
}

export const removedInterviewsReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.REMOVE_INTERVIEWS_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.REMOVE_INTERVIEWS_SUCESS: {
            return { ...state, removedInterviews: action.data, Loading: false }
        }
        case Constants.REMOVE_INTERVIEWS_FAILED: {
            return { ...state, Error: '', Loading: false }
        }
        default:
            return { ...state }
    }
}


