import update from 'immutability-helper';
import * as types from '../types'

const initalState = {
    fileList: [
        {
            type: "master_data",
            title: "Master Data",
            columnsFile: {
                cols: 15,
                header: [
                    "Type", "Car Brand", "1-30", "31-60", "61-90", "91-120", "121-150", "151-180", "181-210", "211-240", "241-270", "271-300", "301-330", "331-360", "361-9999",
                ]
            }
        },
        {
            type: "out_standing",
            title: "Out Standing",
            columnsFile: {
                cols: 10,
                header: [
                    "DealerCode", "Loan Type", "Dealer Name", "Franchise", "InvoiceDate", "Interest_Cal Date", "MidNo", "Chassis", "Engine", "Outstanding (Include Vat)"
                ]
            }
        },
        {
            type: "payment",
            title: "Payment",
            columnsFile: {
                cols: 14,
                header: [
                    "Dealer Code", "Mid", "Paydate 1", "Amount 1", "Paydate 2", "Amount 2", "Paydate 3", "Amount 3", "Paydate 4", "Amount 4", "Paydate 5", "Amount 5", "Paydate 6", "Amount 6"
                ]
            }
        },
        {
            type: "default",
            title: "Default",
            columnsFile: {
                cols: 10,
                header: [
                    "No", "AsMonth", "Dealer Code", "Default", "Mid", "DueDate", "PayDate", "Installment", "Default Rate", "Remark"
                ]
            }
        },
        {
            type: "dealer_condition",
            title: "Dealer Condition",
            columnsFile: {
                cols: 10,
                header: [
                    "Dealer Code", "Dealer Name", "Franchise", "Loan Type", "Register Address", "E-Mail", "Type Curtailment", "Grace Period", "Nor Rate Type", "Nor Rate"
                ]
            }
        }
    ],
    activeInputFile: '',
    importData: {
        data: null,
        pending: false,
        error: {},
    },
    statusFile: {
        data: {},
        pending: false,
        error: {},
    }
}
const inputData = (state = initalState, action = {}) => {
    switch (action.type) {
        case types.INPUT_ACTIVE_DATA:
            return update(state, {
                activeInputFile: {
                    $set: action.value
                }
            })
        case types.INPUT_SET_DATA_SUCCESS:
            const { result: { data } } = action
            return update(state, {
                importData: {
                    data: { $set: data },
                    pending: { $set: false },
                    error: { $set: {} },
                },
            });
        case types.INPUT_SET_DATA_PENDING:
            return update(state, {
                importData: {
                    pending: { $set: true },
                    error: { $set: {} },
                },
            });
        case types.INPUT_SET_DATA_ERROR:
            return update(state, {
                importData: {
                    error: { $set: action.error },
                    pending: { $set: false },
                },
            });
        //====>
        case types.INPUT_STATUS_DATA_SUCCESS:
            const { result: { data: statusData } } = action
            return update(state, {
                statusFile: {
                    data: { $set: statusData },
                    pending: { $set: false },
                    error: { $set: {} },
                },
            });
        case types.INPUT_STATUS_DATA_PENDING:
            return update(state, {
                statusFile: {
                    pending: { $set: true },
                    error: { $set: {} },
                },
            });
        case types.INPUT_STATUS_DATA_ERROR:
            return update(state, {
                statusFile: {
                    error: { $set: action.error },
                    pending: { $set: false },
                },
            });

        default:
            return state
    }

}
export default inputData