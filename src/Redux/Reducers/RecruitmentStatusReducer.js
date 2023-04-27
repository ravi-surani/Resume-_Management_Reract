import Constants from '../Constants'

export const getAllRecruitmentStatusReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.GET_ALL_RECRUITMENT_STATUS_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.GET_ALL_RECRUITMENT_STATUS_SUCESS: {
            return { ...state, RecruitmentStatusList: action.data, Loading: false }
        }
        case Constants.GET_ALL_RECRUITMENT_STATUS_FAILED: {
            return { ...state, RecruitmentStatusList: [], Error: action.data, Loading: false }
        }
        default:
            return { ...state }
    }
}

export const getActiveRecruitmentStatusReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.GET_ACTIVE_RECRUITMENT_STATUS_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.GET_ACTIVE_RECRUITMENT_STATUS_SUCESS: {
            return { ...state, RecruitmentStatusList: action.data, Loading: false }
        }
        case Constants.GET_ACTIVE_RECRUITMENT_STATUS_FAILED: {
            return { ...state, RecruitmentStatusList: [], Error: action.data, Loading: false }
        }
        default:
            return { ...state }
    }
}

export const addRecruitmentStatusReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.ADD_RECRUITMENT_STATUS_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.ADD_RECRUITMENT_STATUS_SUCESS: {
            return { ...state, RecruitmentStatusAdded: action.data, Loading: false }
        }
        case Constants.ADD_RECRUITMENT_STATUS_FAILED: {
            return { ...state, Error: action.data, Loading: false }
        }
        default:
            return { ...state }
    }
}

export const updateRecruitmentStatusReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.UPDATE_RECRUITMENT_STATUS_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.UPDATE_RECRUITMENT_STATUS_SUCESS: {
            return { ...state, RecruitmentStatusUpdated: action.data, Loading: false }
        }
        case Constants.UPDATE_RECRUITMENT_STATUS_FAILED: {
            return { ...state, Error: action.data, Loading: false }
        }
        default:
            return { ...state }
    }
}

export const removedRecruitmentStatusReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.REMOVE_RECRUITMENT_STATUS_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.REMOVE_RECRUITMENT_STATUS_SUCESS: {
            return { ...state, RecruitmentStatusRemoved: action.data, Loading: false }
        }
        case Constants.REMOVE_RECRUITMENT_STATUS_FAILED: {
            return { ...state, Error: action.data, Loading: false }
        }
        default:
            return { ...state }
    }
}