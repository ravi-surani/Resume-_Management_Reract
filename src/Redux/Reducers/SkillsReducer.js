import Constants from '../Constants'

export const getAllSkillReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.GET_ALL_SKILL_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.GET_ALL_SKILL_SUCESS: {
            return { ...state, skillsList: action.data, Loading: false }
        }
        case Constants.GET_ALL_SKILL_FAILED: {
            return { ...state, skillsList: [], Error: '', Loading: false }
        }
        default:
            return { ...state }
    }
}
export const getActiveSkillReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.GET_ACTIVE_SKILL_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.GET_ACTIVE_SKILL_SUCESS: {
            return { ...state, skillsList: action.data, Loading: false }
        }
        case Constants.GET_ACTIVE_SKILL_FAILED: {
            return { ...state, skillsList: [], Error: '', Loading: false }
        }
        default:
            return { ...state }
    }
}

export const addSkillReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.ADD_SKILL_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.ADD_SKILL_SUCESS: {
            return { ...state, newSkillAdded: action.data, Loading: false }
        }
        case Constants.ADD_SKILL_FAILED: {
            return { ...state, Error: '', Loading: false }
        }
        default:
            return { ...state }
    }
}

export const updateSkillReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.UPDATE_SKILL_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.UPDATE_SKILL_SUCESS: {
            return { ...state, skillUpdated: action.data, Loading: false }
        }
        case Constants.UPDATE_SKILL_FAILED: {
            return { ...state, Error: '', Loading: false }
        }
        default:
            return { ...state }
    }
}

export const removedSkillReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.REMOVE_SKILL_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.REMOVE_SKILL_SUCESS: {
            return { ...state, skillRemoved: action.data, Loading: false }
        }
        case Constants.REMOVE_SKILL_FAILED: {
            return { ...state, Error: '', Loading: false }
        }
        default:
            return { ...state }
    }
}