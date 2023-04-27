import Constants from '../Constants'

export const getAllDegreeReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.GET_ALL_DEGREE_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.GET_ALL_DEGREE_SUCESS: {
            return { ...state, DegreeList: action.data, Loading: false }
        }
        case Constants.GET_ALL_DEGREE_FAILED: {
            return { ...state, DegreesList: [], Error: '', Loading: false }
        }
        default:
            return { ...state }
    }
}

export const getActiveDegreeReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.GET_ACTIVE_DEGREE_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.GET_ACTIVE_DEGREE_SUCESS: {
            return { ...state, DegreeList: action.data, Loading: false }
        }
        case Constants.GET_ACTIVE_DEGREE_FAILED: {
            return { ...state, DegreesList: [], Error: '', Loading: false }
        }
        default:
            return { ...state }
    }
}

export const addDegreeReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.ADD_DEGREE_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.ADD_DEGREE_SUCESS: {
            return { ...state, newDegreeAdded: action.data, Loading: false }
        }
        case Constants.ADD_DEGREE_FAILED: {
            return { ...state, Error: '', Loading: false }
        }
        default:
            return { ...state }
    }
}

export const updateDegreeReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.UPDATE_DEGREE_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.UPDATE_DEGREE_SUCESS: {
            return { ...state, DegreeUpdated: action.data, Loading: false }
        }
        case Constants.UPDATE_DEGREE_FAILED: {
            return { ...state, Error: '', Loading: false }
        }
        default:
            return { ...state }
    }
}

export const removedDegreeReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.REMOVE_DEGREE_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.REMOVE_DEGREE_SUCESS: {
            return { ...state, DegreeRemoved: action.data, Loading: false }
        }
        case Constants.REMOVE_DEGREE_FAILED: {
            return { ...state, Error: '', Loading: false }
        }
        default:
            return { ...state }
    }
}