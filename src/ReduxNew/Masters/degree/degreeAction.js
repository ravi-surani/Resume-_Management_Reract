import { VIEW_ACTIVE_DEGREE_FAILURE, VIEW_ACTIVE_DEGREE_REQUEST, VIEW_ACTIVE_DEGREE_SUCCESS, VIEW_ACTIVE_INTERVIEW_MODE_FAILURE, VIEW_ACTIVE_INTERVIEW_MODE_REQUEST, VIEW_ACTIVE_INTERVIEW_MODE_SUCCESS } from "../../actionTypes";
import { activeDegree } from "./degreeService";

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
  export const activeDegreeAction = () => {
    return async (dispatch) => {
      dispatch(dataRequest(VIEW_ACTIVE_DEGREE_REQUEST));
  
      await activeDegree().then(
        (result) => dispatch(dataSuccess(VIEW_ACTIVE_DEGREE_SUCCESS, result.data)),
        (error) => dispatch(dataFailure(VIEW_ACTIVE_DEGREE_FAILURE, error.message))
      );
    };
  };