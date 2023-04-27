import Constants from '../Constants'

export const getAllSourceReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.GET_ALL_SOURCE_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.GET_ALL_SOURCE_SUCESS: {
            return { ...state, sourceList: action.data, Loading: false }
        }
        case Constants.GET_ALL_SOURCE_FAILED: {
            return { ...state, sourceList: [], Error: '', Loading: false }
        }
        default:
            return { ...state }
    }
}

export const getActiveSourceReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.GET_ACTIVE_SOURCE_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.GET_ACTIVE_SOURCE_SUCESS: {
            return { ...state, sourceList: action.data, Loading: false }
        }
        case Constants.GET_ACTIVE_SOURCE_FAILED: {
            return { ...state, sourceList: [], Error: '', Loading: false }
        }
        default:
            return { ...state }
    }
}

export const addSourceReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.ADD_SOURCE_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.ADD_SOURCE_SUCESS: {
            return { ...state, newSourceAdded: action.data, Loading: false }
        }
        case Constants.ADD_SOURCE_FAILED: {
            return { ...state, Error: '', Loading: false }
        }
        default:
            return { ...state }
    }
}

export const updateSourceReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.UPDATE_SOURCE_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.UPDATE_SOURCE_SUCESS: {
            return { ...state, sourceUpdated: action.data, Loading: false }
        }
        case Constants.UPDATE_SOURCE_FAILED: {
            return { ...state, Error: '', Loading: false }
        }
        default:
            return { ...state }
    }
}

export const removedSourceReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.REMOVE_SOURCE_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.REMOVE_SOURCE_SUCESS: {
            return { ...state, sourceRemoved: action.data, Loading: false }
        }
        case Constants.REMOVE_SOURCE_FAILED: {
            return { ...state, Error: '', Loading: false }
        }
        default:
            return { ...state }
    }
}