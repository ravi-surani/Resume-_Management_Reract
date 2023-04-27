import Constants from '../Constants'

export const getAllModeOfWorkReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.GET_ALL_MODE_OF_WORK_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.GET_ALL_MODE_OF_WORK_SUCESS: {
            return { ...state, ModeOfWorkList: action.data, Loading: false }
        }
        case Constants.GET_ALL_MODE_OF_WORK_FAILED: {
            return { ...state, ModeOfWorkList: [], Error: action.data, Loading: false }
        }
        default:
            return { ...state }
    }
}
export const getActiveModeOfWorkReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.GET_ACTIVE_MODE_OF_WORK_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.GET_ACTIVE_MODE_OF_WORK_SUCESS: {
            return { ...state, ModeOfWorkList: action.data, Loading: false }
        }
        case Constants.GET_ACTIVE_MODE_OF_WORK_FAILED: {
            return { ...state, ModeOfWorkList: [], Error: action.data, Loading: false }
        }
        default:
            return { ...state }
    }
}

export const addModeOfWorkReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.ADD_MODE_OF_WORK_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.ADD_MODE_OF_WORK_SUCESS: {
            return { ...state, ModeOfWorkAdded: action.data, Loading: false }
        }
        case Constants.ADD_MODE_OF_WORK_FAILED: {
            return { ...state, Error: action.data, Loading: false }
        }
        default:
            return { ...state }
    }
}

export const updateModeOfWorkReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.UPDATE_MODE_OF_WORK_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.UPDATE_MODE_OF_WORK_SUCESS: {
            return { ...state, ModeOfWorkUpdated: action.data, Loading: false }
        }
        case Constants.UPDATE_MODE_OF_WORK_FAILED: {
            return { ...state, Error: action.data, Loading: false }
        }
        default:
            return { ...state }
    }
}

export const removedModeOfWorkReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.REMOVE_MODE_OF_WORK_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.REMOVE_MODE_OF_WORK_SUCESS: {
            return { ...state, ModeOfWorkRemoved: action.data, Loading: false }
        }
        case Constants.REMOVE_MODE_OF_WORK_FAILED: {
            return { ...state, Error: action.data, Loading: false }
        }
        default:
            return { ...state }
    }
}