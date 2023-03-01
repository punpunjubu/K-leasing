import ServerCalls from "../../utils/server-calls";
import * as types from "../types";
const call = new ServerCalls();

export const activeInputFile = (param) => ({
  type: types.INPUT_ACTIVE_DATA,
  value: param
})

export const setDataImport = (param) => {

  return {
    types: {
      success: types.INPUT_SET_DATA_SUCCESS,
      pending: types.INPUT_SET_DATA_PENDING,
      error: types.INPUT_SET_DATA_ERROR,
    },
    call: call.post('setDataImport', {}, param),

  };
};

export const getStatusFile = (param) => {

  return {
    types: {
      success: types.INPUT_STATUS_DATA_SUCCESS,
      pending: types.INPUT_STATUS_DATA_PENDING,
      error: types.INPUT_STATUS_DATA_ERROR,
    },
    call: call.get('getStatusFile', {}),

  };
};