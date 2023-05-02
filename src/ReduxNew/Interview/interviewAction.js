import { getInterviewById } from "../../Redux/Actions/Actions";
import { showToastMessageFailure, showToastMessageSuccess } from "../../helper";
import { ADD_INTERVIEW_FAILURE, ADD_INTERVIEW_REQUEST, ADD_INTERVIEW_SUCCESS } from "../actionTypes";
import { addInterviewService } from "./interviewService";


const dataRequest = (type) => {
    return {
      type: type,
      loading:true
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


export const addInterviewAction = (formData, callback) => {
    return async (dispatch) => {
      dispatch(dataRequest(ADD_INTERVIEW_REQUEST));
      await addInterviewService(formData).then(
        (result) => {
        showToastMessageSuccess("Interview scheduled succesfully");
          dispatch(dataSuccess(ADD_INTERVIEW_SUCCESS, result));
          dispatch(getInterviewById(1));
        //   callback(CANDIDATE_LIST);
        },
        (error) => {
          dispatch(dataFailure(ADD_INTERVIEW_FAILURE, error.message));
          showToastMessageFailure();
        }
      );
    };
  };