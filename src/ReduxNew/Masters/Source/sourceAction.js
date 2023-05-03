import { VIEW_SOURCE_FAILURE, VIEW_SOURCE_REQUEST, VIEW_SOURCE_SUCCESS } from "../../actionTypes";
import { viewSourceService } from "./sourceService";

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
  export const viewSource = () => {
    return async (dispatch) => {
      dispatch(dataRequest(VIEW_SOURCE_REQUEST));
  
      await viewSourceService().then(
        (result) => dispatch(dataSuccess(VIEW_SOURCE_SUCCESS, result.data)),
        (error) => dispatch(dataFailure(VIEW_SOURCE_FAILURE, error.message))
      );
    };
  };