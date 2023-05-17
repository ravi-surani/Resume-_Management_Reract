import { getAllInterviewer } from "../../../Redux/Actions/Actions";
import { showToastMessageFailure, showToastMessageSuccess } from "../../../helper";
import { ADD_INTERVIEWER_FAILURE, ADD_INTERVIEWER_REQUEST, ADD_INTERVIEWER_SUCCESS } from "../../actionTypes";
import { addInterviewerService } from "./interviewerService";

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


export const addInterviewerAction = (formData, setIsModelOpen) => {
    return async (dispatch) => {
      dispatch(dataRequest(ADD_INTERVIEWER_REQUEST));
      await addInterviewerService(formData).then(
        (result) => {
        showToastMessageSuccess("Interview scheduled succesfully");
          dispatch(dataSuccess(ADD_INTERVIEWER_SUCCESS, result));
          setIsModelOpen(false);
          dispatch(getAllInterviewer());
        },
        (error) => {
            const emailError= error.response.data.error.email ? error.response.data.error.email[0] : undefined;
            const contactError= error.response.data.error.contect_no ? error.response.data.error.contect_no[0] : undefined; 
            dispatch(dataFailure(ADD_INTERVIEWER_FAILURE, error.message));
            showToastMessageFailure(emailError || contactError);
        }
      );
    };
  };
