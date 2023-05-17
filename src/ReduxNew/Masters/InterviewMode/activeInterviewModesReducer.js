import { VIEW_ACTIVE_INTERVIEW_MODE_FAILURE, VIEW_ACTIVE_INTERVIEW_MODE_REQUEST, VIEW_ACTIVE_INTERVIEW_MODE_SUCCESS } from "../../actionTypes";

const initialState = {
  loading: false,
  data: {},
  error: "",
};

const activeInterviewModeReducer = (state = initialState, action) => {
  switch (action.type) {
    case VIEW_ACTIVE_INTERVIEW_MODE_REQUEST:
      return {
        ...state,
        loading: true,
        data: {},
        error: "",
      };
    case VIEW_ACTIVE_INTERVIEW_MODE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        data:action.payload.data,
      };
    case VIEW_ACTIVE_INTERVIEW_MODE_FAILURE:
      return {
        ...state,
        loading: false,
        data: {},
        error: action.payload,
      };
    default:
      return state;
  }
};

export { activeInterviewModeReducer };
