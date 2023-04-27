import Constants from '../Constants'
export const getCandidatesReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.GET_ALL_CANDIDATES_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.GET_ALL_CANDIDATES_SUCESS: {
            return { ...state, CandidateList: action.data, Loading: false }
        }
        case Constants.GET_ALL_CANDIDATES_FAILED: {
            return { ...state, Error: '', Loading: false }
        }

        case Constants.GET_CANDIDATES_BY_ID_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.GET_CANDIDATES_BY_ID_SUCESS: {
            return { ...state, CandidateDetials: action.data, newCandidate: false, updatedCandidate: false, Loading: false }
        }
        case Constants.GET_CANDIDATES_BY_ID_FAILED: {
            return { ...state, Error: '', CandidateDetials: null, Loading: false }
        }

        case Constants.ADD_CANDIDATES_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.ADD_CANDIDATES_SUCESS: {
            return { ...state, newCandidate: { sucess: true }, CandidateDetials: null, Loading: false }
        }
        case Constants.ADD_CANDIDATES_FAILED: {
            return { ...state, newCandidate: { sucess: false }, CandidateDetials: null, Error: '', Loading: false }
        }

        case Constants.UPDATE_CANDIDATES_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.UPDATE_CANDIDATES_SUCESS: {
            return { ...state, updatedCandidate: { sucess: true }, CandidateDetials: null, Loading: false }
        }
        case Constants.UPDATE_CANDIDATES_FAILED: {
            return { ...state, updatedCandidate: { sucess: false }, CandidateDetials: null, Error: '', Loading: false }
        }

        case Constants.REMOVE_CANDIDATES_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.REMOVE_CANDIDATES_SUCESS: {
            return { ...state, removedCandidate: action.data, Loading: false }
        }
        case Constants.REMOVE_CANDIDATES_FAILED: {
            return { ...state, Error: '', Loading: false }
        }
        default:
            return { ...state }
    }
}


