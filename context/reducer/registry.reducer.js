import * as A from "../actions/registry.action";
const INITIAL_STATE = {
  fetching: false,
  loading: false,
  error: {active: false, message: ""},
  user: {username: "", fullName: "", email: "", id: "", avatar: null},
};
export const RegistryReducer = (state = INITIAL_STATE, action = {type: "", payload: {}}) => {
  switch (action.type) {
    case A.FORM_RESET:
      return {
        fetching: false,
        loading: false,
        error: {active: false, message: ""},
        user: {username: "", fullName: "", email: "", id: "", avatar: null},
      };
    case A.LOGIN_START:
      return {...state, fetching: true, loading: true};
    case A.LOGIN_SUCCESS:
      return {
        ...state,
        fetching: false,
        loading: false,
        error: {active: false, message: ""},
        user: {
          username: action.payload.username,
          fullName: action.payload.fullName,
          email: action.payload.email,
          id: action.payload.id,
          avatar: action.payload.avatar,
        },
      };
    case A.LOGIN_FAIL:
      return {...state, fetching: false, loading: false, error: {active: true, message: action.payload.message}};

    //signup

    case A.SIGN_UP_START:
      return {...state, fetching: true, loading: true};
    case A.SIGN_UP_SUCCESS:
      return {...state, error: {active: false, message: ""}, fetching: false, loading: false, user: action.payload};
    case A.SIGN_UP_FAIL:
      return {...state, loading: false, fetching: false, error: {active: true, message: action.payload.message}};

    // recovery

    case A.RECOVERY_START:
      return {...state, loading: true, fetching: true};
    case A.RECOVERY_SUCCESS:
      return {...state, error: {active: false, message: ""}, loading: false, fetching: false};
    case A.RECOVERY_FAIL: {
      return {...state, loading: false, fetching: false, error: {active: true, message: action.payload.message}};
    }
    default:
      return state;
  }
};
