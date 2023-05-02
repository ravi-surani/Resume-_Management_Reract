import { showToastMessageFailure } from "../../helper";
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "../actionTypes";
import { loginService } from "./loginService";

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

  export const loginAction = (formData, callback) => {
    return async (dispatch) => {
      dispatch(dataRequest(LOGIN_REQUEST));
      
      await loginService(formData).then(
        (result) => {
          dispatch(dataSuccess(LOGIN_SUCCESS, result));
          localStorage.setItem("login_user", JSON.stringify(result.data.user));
          callback("/");
        },
        (error) => {
          localStorage.removeItem("login_user");
          showToastMessageFailure("Login unsuccesful. Please try again!");
          dispatch(dataFailure(LOGIN_FAILURE, error.message));
        }
      );
    };
  };


  