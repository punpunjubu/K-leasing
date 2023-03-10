import update from "immutability-helper";
import * as types from "../types";
import moment from 'moment'

const initalState = {
    masterInterest: {
        data: undefined,
        pending: false,
        error: {},
    },
    dealerCondition: {
        data: undefined,
        pending: false,
        error: {},
    },
    reportByDealer: {
        data: undefined,
        pending: false,
        error: {},
    },
    reportAll: {
        data: undefined,
        pending: false,
        error: {},
    },
    loanType: {
        data: undefined,
        pending: false,
        error: {},
    },
    invoiceAll: {
        data: undefined,
        pending: false,
        error: {},
    },
    dueDate: moment().add(1,'month').startOf('month').add(9, 'days'),
    date: moment().add(1,'month').startOf('month')
};
const condition = (state = initalState, action = {}) => {
    switch (action.type) {
        case types.MASTER_DATA_SUCCESS:
            const { result: { data: dataMaster } } = action
            return update(state, {
                masterInterest: {
                    data: { $set: dataMaster },
                    pending: { $set: false },
                    error: { $set: {} },
                },
            });
        case types.MASTER_DATA_PENDING:
            return update(state, {
                masterInterest: {
                    pending: { $set: true },
                    error: { $set: {} },
                },
            });
        case types.MASTER_DATA_ERROR:
            return update(state, {
                masterInterest: {
                    error: { $set: action.error },
                    pending: { $set: false },
                },
            });

        case types.DEALER_CONDITION_DATA_SUCCESS:
            const { result: { data: dataDealer } } = action
            return update(state, {
                dealerCondition: {
                    data: { $set: dataDealer },
                    pending: { $set: false },
                    error: { $set: {} },
                },
            });
        case types.DEALER_CONDITION_DATA_PENDING:
            return update(state, {
                dealerCondition: {
                    pending: { $set: true },
                    error: { $set: {} },
                },
            });
        case types.DEALER_CONDITION_DATA_ERROR:
            return update(state, {
                dealerCondition: {
                    error: { $set: action.error },
                    pending: { $set: false },
                },
            });

        case types.SEARCH_REPORT_DATA_SUCCESS:
            const { result: { data: dataReport } } = action
            return update(state, {
                reportByDealer: {
                    data: { $set: dataReport },
                    pending: { $set: false },
                    error: { $set: {} },
                },
            });
        case types.SEARCH_REPORT_DATA_PENDING:
            return update(state, {
                reportByDealer: {
                    pending: { $set: true },
                    error: { $set: {} },
                },
            });
        case types.SEARCH_REPORT_DATA_ERROR:
            return update(state, {
                reportByDealer: {
                    error: { $set: action.error },
                    pending: { $set: false },
                },
            });

        case types.REPORT_DATA_ALL_SUCCESS:
            const { result: { data: dataReportAll } } = action
            return update(state, {
                reportAll: {
                    data: { $set: dataReportAll },
                    pending: { $set: false },
                    error: { $set: {} },
                },
            });
        case types.REPORT_DATA_ALL_PENDING:
            return update(state, {
                reportAll: {
                    pending: { $set: true },
                    error: { $set: {} },
                },
            });
        case types.REPORT_DATA_ALL_ERROR:
            return update(state, {
                reportAll: {
                    error: { $set: action.error },
                    pending: { $set: false },
                },
            });
        case types.LOAN_DATA_SUCCESS:
            const { result: { data: dataLoan } } = action
            return update(state, {
                loanType: {
                    data: { $set: dataLoan },
                    pending: { $set: false },
                    error: { $set: {} },
                },
            });
        case types.LOAN_DATA_PENDING:
            return update(state, {
                loanType: {
                    pending: { $set: true },
                    error: { $set: {} },
                },
            });
        case types.LOAN_DATA_ERROR:
            return update(state, {
                loanType: {
                    error: { $set: action.error },
                    pending: { $set: false },
                },
            });
        case types.INVOICE_DATA_ALL_SUCCESS:
            const { result: { data: dataInvoice } } = action
            return update(state, {
                invoiceAll: {
                    data: { $set: dataInvoice },
                    pending: { $set: false },
                    error: { $set: {} },
                },
            });
        case types.INVOICE_DATA_ALL_PENDING:
            return update(state, {
                invoiceAll: {
                    pending: { $set: true },
                    error: { $set: {} },
                },
            });
        case types.INVOICE_DATA_ALL_ERROR:
            return update(state, {
                invoiceAll: {
                    error: { $set: action.error },
                    pending: { $set: false },
                },
            });
        case types.DUEDATE_SET:
            return update(state, {
                dueDate: { $set: action.value }
            });
        case types.DATE_SET:
            return update(state, {
                date: { $set: action.value }
            });
        default:
            return state;
    }
};
export default condition;
