import update from 'immutability-helper';
import * as types from '../types'

const initalState = {
    fileList: [
        {
            type: "master_data",
            title: "Master Data",
            columnsFile: {
                cols: 37,
                header: [
                    "Type", "Car Brand", "1-30", "31-60", "61-90", "91-120", "121-150", "151-180", "181-210", "211-240", "241-270", "271-300", "301-330", "331-360", "361-390","391-420","421-450","451-480","481-510","511-540","541-570","571-600","601-630","631-660","661-690","691-720","721-750","751-780","781-810","811-840","841-870","871-900","901-930","931-960","961-990","991-1020","1021-9999"
                ]
            }
        },
        {
            type: "master_data_spec",
            title: "Master Data Special",
            columnsFile: {
                cols: 37,
                header: [
                    "Type", "Car Brand", "1-30", "31-60", "61-90", "91-120", "121-150", "151-180", "181-210", "211-240", "241-270", "271-300", "301-330", "331-360", "361-390","391-420","421-450","451-480","481-510","511-540","541-570","571-600","601-630","631-660","661-690","691-720","721-750","751-780","781-810","811-840","841-870","871-900","901-930","931-960","961-990","991-1020","1021-9999"
                ]
            }
        },
        {
            type: "out_standing",
            title: "Out Standing",
            columnsFile: {
                cols: 27,
                header: [
                    "DealerCode", "Loan Type", "Dealer Name", "Franchise", "InvoiceDate", "Interest_Cal Date", "MidNo", "Chassis", "Engine", "Outstanding (Include Vat)", "Type Curtailment (Spec)", "Spec_RateType_1", "Spec_Rate_1","Startdate_1","Enddate_1", "Spec_RateType_2", "Spec_Rate_2","Startdate_2","Enddate_2", "Spec_RateType_3", "Spec_Rate_3","Startdate_3","Enddate_3", "Spec_RateType_4", "Spec_Rate_4","Startdate_4","Enddate_4"
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
                cols: 26,
                header: [
                    "Dealer Code", "Dealer Name", "Franchise", "Loan Type", "Register Address", "E-Mail", "Type Curtailment", "Grace Period", "Nor Rate Type", "Nor Rate", "Startdate_1", "Enddate_1", "Nor_RateType_1", "Nor_Rate_1", "Startdate_2", "Enddate_2", "Nor_RateType_2", "Nor_Rate_2",, "Startdate_3", "Enddate_3", "Nor_RateType_3", "Nor_Rate_3",, "Startdate_4", "Enddate_4", "Nor_RateType_4", "Nor_Rate_4"
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