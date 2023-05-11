import { getInterviewById } from "../../Redux/Actions/Actions";
import { showToastMessageFailure, showToastMessageSuccess } from "../../helper";
import { ADD_INTERVIEW_FAILURE, ADD_INTERVIEW_REQUEST, ADD_INTERVIEW_SUCCESS, GET_INTERVIEW_BY_ID_FAILURE, GET_INTERVIEW_BY_ID_REQUEST, GET_INTERVIEW_BY_ID_SUCCESS, UPDATE_INTERVIEW_FAILURE, UPDATE_INTERVIEW_REQUEST, UPDATE_INTERVIEW_SUCCESS, VIEW_INTERVIEW_FAILURE, VIEW_INTERVIEW_REQUEST, VIEW_INTERVIEW_SUCCESS } from "../actionTypes";
import { addInterviewService, getInterviewByIdService, updateInterviewByIdService, viewInterviewService } from "./interviewService";


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


export const addInterviewAction = (formData, id) => {
    return async (dispatch) => {
      dispatch(dataRequest(ADD_INTERVIEW_REQUEST));
      await addInterviewService(formData).then(
        (result) => {
        showToastMessageSuccess("Interview scheduled succesfully");
          dispatch(dataSuccess(ADD_INTERVIEW_SUCCESS, result));
          dispatch(getInterviewById(id));
        //   callback(CANDIDATE_LIST);
        },
        (error) => {
          dispatch(dataFailure(ADD_INTERVIEW_FAILURE, error.message));
          showToastMessageFailure();
        }
      );
    };
  };

  export const viewInterview = () => {
    return async (dispatch) => {
      dispatch(dataRequest(VIEW_INTERVIEW_REQUEST));
  
      await viewInterviewService().then(
        (result) => dispatch(dataSuccess(VIEW_INTERVIEW_SUCCESS, result.data)),
        (error) => dispatch(dataFailure(VIEW_INTERVIEW_FAILURE, error.message))
      );
    };
  };

  export const getInterviewByInterviewId = (id) => {
    return async (dispatch) => {
      dispatch(dataRequest(GET_INTERVIEW_BY_ID_REQUEST));
  
      await getInterviewByIdService(id).then(
        (result) => dispatch(dataSuccess(GET_INTERVIEW_BY_ID_SUCCESS, result.data)),
        (error) => dispatch(dataFailure(GET_INTERVIEW_BY_ID_FAILURE, error.message))
      );
    };
  };

  export const updateInterviewById = (formData, id, callback, candidateId) => {
    return async (dispatch) => {
      dispatch(dataRequest(UPDATE_INTERVIEW_REQUEST));
      await updateInterviewByIdService(formData, id).then(
        (result) => {
        showToastMessageSuccess("Interview updated succesfully");
          dispatch(dataSuccess(UPDATE_INTERVIEW_SUCCESS, result));
          callback(`/interview/${candidateId}`);
        },
        (error) => {
          dispatch(dataFailure(UPDATE_INTERVIEW_FAILURE, error.message));
          showToastMessageFailure();
        }
      );
    };
  };