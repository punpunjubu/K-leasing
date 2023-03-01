import ServerCalls from "../../utils/server-calls";
import * as types from "../types";
const call = new ServerCalls();

export const initConnectServer = () => {

  return {
    types: {
      success: types.AUTH_LOGIN_SUCCESS,
      pending: types.AUTH_LOGIN_PENDING,
      error: types.AUTH_LOGIN_ERROR,
    },
    call: call.get("connect", {})
  };
};

export const initLogin = (param) => {

  return {
    types: {
      success: types.AUTH_LOGIN_SUCCESS,
      pending: types.AUTH_LOGIN_PENDING,
      error: types.AUTH_LOGIN_ERROR,
    },
    call: call.post('login', {}, param),

  };
};

export const resetPassword = (param) => {

  return {
    types: {
      success: types.RESET_PASSWORD_SUCCESS,
      pending: types.RESET_PASSWORD_PENDING,
      error: types.RESET_PASSWORD_ERROR,
    },
    call: call.post('resetpassword', {}, param),

  };
};

export const initLogout = (param) => {
  param.queryURL = {
    id: param.user_id
  }
  return {
    types: {
      success: types.AUTH_LOGOUT_SUCCESS,
      pending: types.AUTH_LOGOUT_PENDING,
      error: types.AUTH_LOGOUT_ERROR,
    },
    call: call.get('logout', param),

  };
};

