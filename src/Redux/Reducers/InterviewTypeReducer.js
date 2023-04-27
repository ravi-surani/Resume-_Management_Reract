import Constants from '../Constants'
export const getAllInterviewTypeReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.GET_ALL_INTERVIEW_TYPE_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.GET_ALL_INTERVIEW_TYPE_SUCESS: {
            return { ...state, interviewTypesList: action.data, Loading: false }
        }
        case Constants.GET_ALL_INTERVIEW_TYPE_FAILED: {
            return { ...state, interviewTypesList: [], Error: '', Loading: false }
        }
        default:
            return { ...state }
    }
}

export const getActiveInterviewTypeReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.GET_ACTIVE_INTERVIEW_TYPE_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.GET_ACTIVE_INTERVIEW_TYPE_SUCESS: {
            return { ...state, interviewTypesList: action.data, Loading: false }
        }
        case Constants.GET_ACTIVE_INTERVIEW_TYPE_FAILED: {
            return { ...state, interviewTypesList: [], Error: '', Loading: false }
        }
        default:
            return { ...state }
    }
}

export const addInterviewTypeReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.ADD_INTERVIEW_TYPE_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.ADD_INTERVIEW_TYPE_SUCESS: {
            return { ...state, newInterviewTypeAdded: action.data, Loading: false }
        }
        case Constants.ADD_INTERVIEW_TYPE_FAILED: {
            return { ...state, Error: '', Loading: false }
        }
        default:
            return { ...state }
    }
}

export const updateInterviewTypeReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.UPDATE_INTERVIEW_TYPE_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.UPDATE_INTERVIEW_TYPE_SUCESS: {
            return { ...state, interviewTypeUpdated: action.data, Loading: false }
        }
        case Constants.UPDATE_INTERVIEW_TYPE_FAILED: {
            return { ...state, Error: '', Loading: false }
        }
        default:
            return { ...state }
    }
}

export const removedInterviewTypeReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.REMOVE_INTERVIEW_TYPE_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.REMOVE_INTERVIEW_TYPE_SUCESS: {
            return { ...state, interviewTypeRemoved: action.data, Loading: false }
        }
        case Constants.REMOVE_INTERVIEW_TYPE_FAILED: {
            return { ...state, Error: '', Loading: false }
        }
        default:
            return { ...state }
    }
}