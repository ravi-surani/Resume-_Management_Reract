import Constants from '../Constants'
export const getAllInterviewModeReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.GET_ALL_INTERVIEW_MODE_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.GET_ALL_INTERVIEW_MODE_SUCESS: {
            return { ...state, interviewModeList: action.data, Loading: false }
        }
        case Constants.GET_ALL_INTERVIEW_MODE_FAILED: {
            return { ...state, interviewModeList: [], Error: '', Loading: false }
        }
        default:
            return { ...state }
    }
}

export const addInterviewModeReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.ADD_INTERVIEW_MODE_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.ADD_INTERVIEW_MODE_SUCESS: {
            return { ...state, newinterviewModeAdded: action.data, Loading: false }
        }
        case Constants.ADD_INTERVIEW_MODE_FAILED: {
            return { ...state, Error: '', Loading: false }
        }
        default:
            return { ...state }
    }
}

export const updateInterviewModeReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.UPDATE_INTERVIEW_MODE_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.UPDATE_INTERVIEW_MODE_SUCESS: {
            return { ...state, interviewModeUpdated: action.data, Loading: false }
        }
        case Constants.UPDATE_INTERVIEW_MODE_FAILED: {
            return { ...state, Error: '', Loading: false }
        }
        default:
            return { ...state }
    }
}

export const removedInterviewModeReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.REMOVE_INTERVIEW_MODE_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.REMOVE_INTERVIEW_MODE_SUCESS: {
            return { ...state, interviewModeRemoved: action.data, Loading: false }
        }
        case Constants.REMOVE_INTERVIEW_MODE_FAILED: {
            return { ...state, Error: '', Loading: false }
        }
        default:
            return { ...state }
    }
}