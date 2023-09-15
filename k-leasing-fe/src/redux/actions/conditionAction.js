import ServerCalls from "../../utils/server-calls";
import * as types from "../types";
const call = new ServerCalls();

export const getMaster = () => {

  return {
    types: {
      success: types.MASTER_DATA_SUCCESS,
      pending: types.MASTER_DATA_PENDING,
      error: types.MASTER_DATA_ERROR,
    },
    call: call.get('getMaster', {}),

  };
};

export const getMasterSpec = () => {

  return {
    types: {
      success: types.MASTER_SPEC_DATA_SUCCESS,
      pending: types.MASTER_SPEC_DATA_PENDING,
      error: types.MASTER_SPEC_DATA_ERROR,
    },
    call: call.get('getMasterSpec', {}),

  };
};

export const getLoanType = () => {

  return {
    types: {
      success: types.LOAN_DATA_SUCCESS,
      pending: types.LOAN_DATA_PENDING,
      error: types.LOAN_DATA_ERROR,
    },
    call: call.get('getLoanType', {}),

  };
};

export const getDealerCondition = () => {

  return {
    types: {
      success: types.DEALER_CONDITION_DATA_SUCCESS,
      pending: types.DEALER_CONDITION_DATA_PENDING,
      error: types.DEALER_CONDITION_DATA_ERROR,
    },
    call: call.get('getDealerCondition', {}),

  };
};

export const getSearchReport = (param) => {
  param.queryURL = {
    dealer: param.dealer,
    date: param.date
  }
  return {
    types: {
      success: types.SEARCH_REPORT_DATA_SUCCESS,
      pending: types.SEARCH_REPORT_DATA_PENDING,
      error: types.SEARCH_REPORT_DATA_ERROR,
    },
    call: call.get('getSearchReportByDealer', param),

  };
};
export const getReportAll = (param) => {
  const d = new Date();
  const n = d.getTime();
  return {
    types: {
      success: types.REPORT_DATA_ALL_SUCCESS,
      pending: types.REPORT_DATA_ALL_PENDING,
      error: types.REPORT_DATA_ALL_ERROR,
    },
    call: call.post(`getReportAll`, {
      queryURL: {
        t: n
      }
    }, param),

  };
};
export const getInvoiceAll = (param) =>{
  const d = new Date();
  const n = d.getTime();
  return {
    types: {
      success: types.INVOICE_DATA_ALL_SUCCESS,
      pending: types.INVOICE_DATA_ALL_PENDING,
      error: types.INVOICE_DATA_ALL_ERROR,
    },
    call: call.post(`getReportAll`, {
      queryURL: {
        t: n
      }
    }, param),

  };
}

export const setMaster = (param) => {

  return {
    types: {
      success: types.MASTER_DATA_SUCCESS,
      pending: types.MASTER_DATA_PENDING,
      error: types.MASTER_DATA_ERROR,
    },
    call: call.post('setMaster', {}, param),

  };
};
export const setLoanType = (param) => {

  return {
    types: {
      success: types.LOAN_DATA_SUCCESS,
      pending: types.LOAN_DATA_PENDING,
      error: types.LOAN_DATA_ERROR,
    },
    call: call.post('setLoanType', {}, param),

  };
};

export const setDueDate = (param) => {

  return {
    type: types.DUEDATE_SET,
    value: param,

  };
};

export const setDate = (param) => {

  return {
    type: types.DATE_SET,
    value: param,

  };
};