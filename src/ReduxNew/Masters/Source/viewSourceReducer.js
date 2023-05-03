import { VIEW_SOURCE_FAILURE, VIEW_SOURCE_REQUEST, VIEW_SOURCE_SUCCESS } from "../../actionTypes";

const initialState = {
  loading: false,
  data: {},
  error: "",
};

const viewSourceReducer = (state = initialState, action) => {
  switch (action.type) {
    case VIEW_SOURCE_REQUEST:
      return {
        ...state,
        loading: true,
        data: {},
        error: "",
      };
    case VIEW_SOURCE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        data:action.payload,
      };
    case VIEW_SOURCE_FAILURE:
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

export { viewSourceReducer };
