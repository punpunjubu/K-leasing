import update from "immutability-helper";
import * as types from "../types";

const initalState = {
  userData: {
    data: null,
    pending: false,
    error: {},
  },
  userResetPass: {
    data: null,
    pending: false,
    error: {},
  },
};
const auth = (state = initalState, action = {}) => {
  switch (action.type) {
    case types.AUTH_LOGIN_SUCCESS:
      const { result: { data: loginData } } = action
      return update(state, {
        userData: {
          data: { $set: loginData },
          pending: { $set: false },
          error: { $set: {} },
        },
      });
    case types.AUTH_LOGIN_PENDING:
      return update(state, {
        userData: {
          pending: { $set: true },
          error: { $set: {} },
        },
      });
    case types.AUTH_LOGIN_ERROR:
      return update(state, {
        userData: {
          error: { $set: action.error },
          pending: { $set: false },
        },
      });

    case types.RESET_PASSWORD_SUCCESS:
      const { result: { data: resetpass } } = action
      return update(state, {
        userResetPass: {
          data: { $set: resetpass },
          pending: { $set: false },
          error: { $set: {} },
        },
      });
    case types.RESET_PASSWORD_PENDING:
      return update(state, {
        userResetPass: {
          pending: { $set: true },
          error: { $set: {} },
        },
      });
    case types.RESET_PASSWORD_ERROR:
      return update(state, {
        userResetPass: {
          error: { $set: action.error },
          pending: { $set: false },
        },
      });

    case types.AUTH_LOGOUT_SUCCESS:
      return update(state, {
        userData: {
          data: { $set: {} },
          pending: { $set: false },
          error: { $set: {} },
        },
      });
    case types.AUTH_LOGOUT_PENDING:
      return update(state, {
        userData: {
          pending: { $set: true },
          error: { $set: {} },
        },
      });
    case types.AUTH_LOGOUT_ERROR:
      return update(state, {
        userData: {
          error: { $set: action.error },
          pending: { $set: false },
        },
      });
    default:
      return state;
  }
};
export default auth;
