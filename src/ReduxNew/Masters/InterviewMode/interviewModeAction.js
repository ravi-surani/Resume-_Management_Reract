import { VIEW_ACTIVE_INTERVIEW_MODE_FAILURE, VIEW_ACTIVE_INTERVIEW_MODE_REQUEST, VIEW_ACTIVE_INTERVIEW_MODE_SUCCESS } from "../../actionTypes";
import { activeInterviewModesService } from "./interviewModeService";

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
  export const activeInterviewModes = () => {
    return async (dispatch) => {
      dispatch(dataRequest(VIEW_ACTIVE_INTERVIEW_MODE_REQUEST));
  
      await activeInterviewModesService().then(
        (result) => dispatch(dataSuccess(VIEW_ACTIVE_INTERVIEW_MODE_SUCCESS, result.data)),
        (error) => dispatch(dataFailure(VIEW_ACTIVE_INTERVIEW_MODE_FAILURE, error.message))
      );
    };
  };