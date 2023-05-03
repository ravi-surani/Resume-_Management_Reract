import { VIEW_INTERVIEW_FAILURE, VIEW_INTERVIEW_REQUEST, VIEW_INTERVIEW_SUCCESS } from "../actionTypes";

const initialState = {
  loading: false,
  data: {},
  error: "",
};

const viewInterviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case VIEW_INTERVIEW_REQUEST:
      return {
        ...state,
        loading: true,
        data: {},
        error: "",
      };
    case VIEW_INTERVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        data:action.payload,
      };
    case VIEW_INTERVIEW_FAILURE:
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

export { viewInterviewReducer };
