import { VIEW_ACTIVE_DEGREE_FAILURE, VIEW_ACTIVE_DEGREE_REQUEST, VIEW_ACTIVE_DEGREE_SUCCESS } from "../../actionTypes";

const initialState = {
  loading: false,
  data: {},
  error: "",
};

const activeDegreeReducer = (state = initialState, action) => {
  switch (action.type) {
    case VIEW_ACTIVE_DEGREE_REQUEST:
      return {
        ...state,
        loading: true,
        data: {},
        error: "",
      };
    case VIEW_ACTIVE_DEGREE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        data:action.payload.data,
      };
    case VIEW_ACTIVE_DEGREE_FAILURE:
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

export { activeDegreeReducer };
