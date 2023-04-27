import Constants from '../Constants'
export const getAllInterviewerReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.GET_ALL_INTERVIEWER_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.GET_ALL_INTERVIEWER_SUCESS: {
            return { ...state, interviewerList: action.data, Loading: false }
        }
        case Constants.GET_ALL_INTERVIEWER_FAILED: {
            return { ...state, interviewerList: [], Error: '', Loading: false }
        }
        default:
            return { ...state }
    }
}
export const getActiveInterviewerReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.GET_ACTIVE_INTERVIEWER_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.GET_ACTIVE_INTERVIEWER_SUCESS: {
            return { ...state, interviewerList: action.data, Loading: false }
        }
        case Constants.GET_ACTIVE_INTERVIEWER_FAILED: {
            return { ...state, interviewerList: [], Error: '', Loading: false }
        }
        default:
            return { ...state }
    }
}

export const addInterviewerReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.ADD_INTERVIEWER_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.ADD_INTERVIEWER_SUCESS: {
            return { ...state, newinterviewerAdded: action.data, Loading: false }
        }
        case Constants.ADD_INTERVIEWER_FAILED: {
            return { ...state, Error: '', Loading: false }
        }
        default:
            return { ...state }
    }
}

export const updateInterviewerReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.UPDATE_INTERVIEWER_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.UPDATE_INTERVIEWER_SUCESS: {
            return { ...state, interviewerUpdated: action.data, Loading: false }
        }
        case Constants.UPDATE_INTERVIEWER_FAILED: {
            return { ...state, Error: '', Loading: false }
        }
        default:
            return { ...state }
    }
}

export const removedInterviewerReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.REMOVE_INTERVIEWER_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.REMOVE_INTERVIEWER_SUCESS: {
            return { ...state, interviewerRemoved: action.data, Loading: false }
        }
        case Constants.REMOVE_INTERVIEWER_FAILED: {
            return { ...state, Error: '', Loading: false }
        }
        default:
            return { ...state }
    }
}