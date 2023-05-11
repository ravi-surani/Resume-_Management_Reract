import { viewActiveSkillTypeService } from "./skillTypeService";
import {VIEW_ACTIVE_SKILL_REQUEST, VIEW_ACTIVE_SKILL_SUCCESS, VIEW_ACTIVE_SKILL_FAILURE} from "../actionTypes"

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
  export const viewActiveSkillType = () => {
    return async (dispatch) => {
      dispatch(dataRequest(VIEW_ACTIVE_SKILL_REQUEST));
  
      await viewActiveSkillTypeService().then(
        (result) => dispatch(dataSuccess(VIEW_ACTIVE_SKILL_SUCCESS, result.data)),
        (error) => dispatch(dataFailure(VIEW_ACTIVE_SKILL_FAILURE, error.message))
      );
    };
  };