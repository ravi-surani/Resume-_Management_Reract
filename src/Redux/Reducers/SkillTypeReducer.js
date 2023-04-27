import Constants from '../Constants'

export const getAllSkillTypeReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.GET_ALL_SKILL_TYPE_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.GET_ALL_SKILL_TYPE_SUCESS: {
            return { ...state, skillsTypeList: action.data, Loading: false }
        }
        case Constants.GET_ALL_SKILL_TYPE_FAILED: {
            return { ...state, skillsTypeList: [], Error: '', Loading: false }
        }
        default:
            return { ...state }
    }
}

export const addSkillTypeReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.ADD_SKILL_TYPE_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.ADD_SKILL_TYPE_SUCESS: {
            return { ...state, newSkillTypeAdded: action.data, Loading: false }
        }
        case Constants.ADD_SKILL_TYPE_FAILED: {
            return { ...state, Error: '', Loading: false }
        }
        default:
            return { ...state }
    }
}

export const updateSkillTypeReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.UPDATE_SKILL_TYPE_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.UPDATE_SKILL_TYPE_SUCESS: {
            return { ...state, skillTypeUpdated: action.data, Loading: false }
        }
        case Constants.UPDATE_SKILL_TYPE_FAILED: {
            return { ...state, Error: '', Loading: false }
        }
        default:
            return { ...state }
    }
}

export const removedSkillTypeReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.REMOVE_SKILL_TYPE_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.REMOVE_SKILL_TYPE_SUCESS: {
            return { ...state, skillTypeRemoved: action.data, Loading: false }
        }
        case Constants.REMOVE_SKILL_TYPE_FAILED: {
            return { ...state, Error: '', Loading: false }
        }
        default:
            return { ...state }
    }
}
