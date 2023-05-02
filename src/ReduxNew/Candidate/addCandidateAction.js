import { showToastMessageFailure, showToastMessageSuccess } from "../../helper";
import { CANDIDATE_LIST } from "../../routeConstants";
import { ADD_CANDIDATE_FAILURE, ADD_CANDIDATE_REQUEST, ADD_CANDIDATE_SUCCESS } from "../actionTypes";
import { addCandidateService, } from "./candidateService";

const dataRequest = (type) => {
    return {
      type: type,
    };
  };
  const dataSuccess = (type, data) => {
    return {
      type: type,
      payload: data,
    };
  };
  const dataFailure = (type, error) => {
    return {
      type: type,
      error: error,
    };
  };


export const addCandidate = (formData, callback) => {
    return async (dispatch) => {
      dispatch(dataRequest(ADD_CANDIDATE_REQUEST));
  
      await addCandidateService(formData).then(
        (result) => {
        showToastMessageSuccess("Candidate added succesfully");
          dispatch(dataSuccess(ADD_CANDIDATE_SUCCESS, result));
          callback(CANDIDATE_LIST);
        },
        (error) => {
          dispatch(dataFailure(ADD_CANDIDATE_FAILURE, error.message));
          showToastMessageFailure();
        }
      );
    };
  };