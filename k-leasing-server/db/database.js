const mariadb = require('mariadb')
const nconf = require('nconf');
const moment = require('moment')
const config = require(`../configs/server.json`);
const fshp = require('../api/help')
const _ = require('lodash')
nconf.defaults(config);
const format_datetime = "YYYY-MM-DD HH:mm:ss"
const db = mariadb.createPool({
    host: nconf.get('db:host'),
    user: nconf.get('db:user'),
    password: nconf.get('db:password'),
    database: nconf.get('db:database'),
    port: nconf.get('db:port'),
    connectionLimit: 5
});

const getUser = (param, type) => {
    const { user_id, session, username } = param
    let sql = `SELECT * FROM user WHERE`
    let where = []
    switch (type) {
        case 'user':
            sql = `${sql} user_id = ? AND user_token = ? LIMIT 1;`
            where = [user_id, session]
            break;
        case 'username':
            sql = `${sql} user_username = ? LIMIT 1;`
            where = [username]
            break;
        case 'session':
            sql = `${sql} user_token = ? LIMIT 1;`
            where = [session]
            break;
        default:
            break;
    }
    return callQuery(sql, where)
}
const getMasterData = () => {
    const sql = `SELECT * FROM master_interest ORDER BY master_interest_create_at DESC LIMIT 2;`;
    return callQuery(sql, [])
}

const getLoanTypeData = () => {
    const sql = `SELECT * FROM loan_type ORDER BY loan_type_create_at DESC LIMIT 2;`;
    return callQuery(sql, [])
}
const getDealerCondition = (type = 'limit') => {
    let sql = `SELECT * FROM dealer_condition`;
    let where = []
    if (type === 'limit') {
        sql += ` LIMIT 1;`
    }
    return callQuery(sql, where)
}
const getMasterCondition = (type = 'limit') => {
    let sql = `SELECT * FROM master_condition`;
    let where = []
    if (type === 'limit') {
        sql += ` LIMIT 1;`
    }
    return callQuery(sql, where)
}
const getMasterSpecCondition = (type = 'limit') => {
    let sql = `SELECT * FROM master_condition_special`;
    let where = []
    if (type === 'limit') {
        sql += ` LIMIT 1;`
    }
    return callQuery(sql, where)
}
const getOutStanding = (type = 'limit') => {
    let sql = `SELECT * FROM out_standing`;
    let where = []
    if (type === 'limit') {
        sql += ` LIMIT 1;`
    }
    return callQuery(sql, where)
}
const getPayment = (type = 'limit') => {
    let sql = `SELECT * FROM payment`;
    let where = []
    if (type === 'limit') {
        sql += ` LIMIT 1;`
    }
    return callQuery(sql, where)
}
const getDefault = (type = 'limit') => {
    let sql = `SELECT * FROM  default_file`;
    let where = []
    if (type === 'limit') {
        sql += ` LIMIT 1;`
    }
    return callQuery(sql, where)
}

const getSearchReportByDealer = async (param) => {
    const { dealer, date } = param
    let data = {}
    const month = moment(date, 'YYYY/MM/DD').format('MM')
    const sql_out_standing = `SELECT * FROM out_standing WHERE out_standing_dealer_code = ?;`;
    data.out_standing = await callQuery(sql_out_standing, [dealer])
    const sql_payment = `SELECT * FROM payment WHERE payment_dealer_code = ? AND (MONTH(payment_paydate_1) = ? OR MONTH(payment_paydate_2) = ? OR MONTH(payment_paydate_3) = ? OR MONTH(payment_paydate_4) = ? OR MONTH(payment_paydate_5) = ? OR MONTH(payment_paydate_6) = ?);`;
    data.payment = await callQuery(sql_payment, [dealer, month, month, month, month, month, month])
    const sql_master_condition = `SELECT * FROM master_condition;`;
    data.master_condition = await callQuery(sql_master_condition, [])
    const sql_master_condition_spec = `SELECT * FROM master_condition_special;`;
    data.master_condition_spec = await callQuery(sql_master_condition_spec, [])
    const sql_default_file = `SELECT * FROM default_file WHERE default_dealer_code = ?;`;
    data.default_file = await callQuery(sql_default_file, [dealer])
    return data
}
const getReportByDealer = async (param) => {
    const { dealer, date } = param
    let data = {}
    const month = moment(date, 'YYYY/MM/DD').format('MM')
    const sql_out_standing = `SELECT * FROM out_standing WHERE out_standing_dealer_code = ?;`;
    data.out_standing = await callQuery(sql_out_standing, [dealer])
    const sql_payment = `SELECT * FROM payment WHERE payment_dealer_code = ? AND (MONTH(payment_paydate_1) = ? OR MONTH(payment_paydate_2) = ? OR MONTH(payment_paydate_3) = ? OR MONTH(payment_paydate_4) = ? OR MONTH(payment_paydate_5) = ? OR MONTH(payment_paydate_6) = ?);`;
    data.payment = await callQuery(sql_payment, [dealer, month, month, month, month, month, month])
    const sql_default_file = `SELECT * FROM default_file WHERE default_dealer_code = ?;`;
    data.default_file = await callQuery(sql_default_file, [dealer])
    return data
}
const getMasterConditionAll = async () => {
    const sql_master_condition = `SELECT * FROM master_condition;`;
    return await callQuery(sql_master_condition, [])
}
const getMasterSpecConditionAll = async () => {
    const sql_master_condition = `SELECT * FROM master_condition_special;`;
    return await callQuery(sql_master_condition, [])
}
const updateLogin = (param) => {
    const { id } = param
    const sql = `UPDATE user SET user_last_login = ? WHERE user_id = ?;`;
    return callQuery(sql, [TIME_NOW(), id])
}
const updateLogout = (param) => {
    const { user_id } = param
    const sql = `UPDATE user SET user_last_login = ?,user_token=? WHERE user_id = ?;`;
    return callQuery(sql, [null,null, user_id])
}
const updateUserSession = (param) => {
    const { token, id } = param
    const sql = `UPDATE user SET user_token = ?, user_last_login = ? WHERE user_id = ?;`;
    return callQuery(sql, [token, TIME_NOW(), id])
}

const updateLoanType = (param) => {
    const { vat, tax, user_id, id } = param
    const sql = `UPDATE loan_type SET loan_type_vat = ?, loan_type_tax = ?, loan_type_create_at = ?, loan_type_create_by = ? WHERE loan_type_id = ?;`;
    return callQuery(sql, [vat, tax, TIME_NOW(), user_id, id])
}
const reSetPassword = (param) => {
    const { id, pw } = param
    const sql = `UPDATE user SET user_password = ? WHERE user_id = ?;`;
    return callQuery(sql, [pw, id])
}
const setUser = (param) => {
    const {
        id,
        username,
        password,
        name,
        email,
        mobile_number,
        type,
        status,

    } = param
    const sql = `INSERT INTO user SET 
    user_id = ?,
    user_username = ?,
    user_password = ?,
    user_name = ?,
    user_mobile_number = ?,
    user_status = ?,
    user_type = ?,
    user_create_at = ?,
    user_email = ?`;
    return callQuery(sql,
        [
            id,
            username,
            password,
            name,
            mobile_number,
            status,
            type,
            moment().format(format_datetime),
            email
        ])
}

const setMasterData = async (param) => {
    const { rate_1, rate_2, rate_3, rate_4, user_id } = param
    await callQuery(`DELETE FROM master_interest;`, [])
    const sql = `INSERT INTO master_interest (
        master_interest_interest_type, 
        master_interest_start_rate, 
        master_interest_create_at, 
        master_interest_create_by, 
        master_interest_type,
        master_interest_start_rate_1,
        master_interest_date_rate_1,
        master_interest_start_rate_2,
        master_interest_date_rate_2,
        master_interest_start_rate_3,
        master_interest_date_rate_3)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`

    const sql_log = `INSERT INTO log_master_interest (
        master_interest_interest_type, 
        master_interest_start_rate, 
        master_interest_create_at, 
        master_interest_create_by, 
        master_interest_type,
        master_interest_start_rate_1,
        master_interest_date_rate_1,
        master_interest_start_rate_2,
        master_interest_date_rate_2,
        master_interest_start_rate_3,
        master_interest_date_rate_3)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`
    const t = TIME_NOW()
    await callQuery(sql, ['MLR rate', rate_1.mlr, t, user_id, 'mlr', rate_2.mlr, rate_2.date, rate_3.mlr, rate_3.date, rate_4.mlr, rate_4.date])
    await callQuery(sql, ['MOR rate', rate_1.mor, t, user_id, 'mor', rate_2.mor, rate_2.date, rate_3.mor, rate_3.date, rate_4.mor, rate_4.date])

    await callQuery(sql_log, ['MLR', rate_1.mlr, t, user_id, 'mlr', rate_2.mlr, rate_2.date, rate_3.mlr, rate_3.date, rate_4.mlr, rate_4.date])
    await callQuery(sql_log, ['MOR', rate_1.mor, t, user_id, 'mor', rate_2.mor, rate_2.date, rate_3.mor, rate_3.date, rate_4.mor, rate_4.date])
}

const setDataMasterData = async (dataImport, user_id) => {
    const sql = `INSERT INTO master_condition 
    (id, type, car_brand, date_rate_1, date_rate_2,date_rate_3,date_rate_4,date_rate_5,date_rate_6,date_rate_7,date_rate_8,date_rate_9,date_rate_10,date_rate_11,date_rate_12,date_rate_13,date_rate_14,date_rate_15,date_rate_16,date_rate_17,date_rate_18,date_rate_19,date_rate_20,date_rate_21,date_rate_22,date_rate_23,date_rate_24,date_rate_25,date_rate_26,date_rate_27,date_rate_28,date_rate_29,date_rate_30,date_rate_31,date_rate_32,date_rate_33,date_rate_34,date_rate_35,create_at,create_by) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`
    await callQuery(`DELETE FROM master_condition;`, [])
    for (let index = 0; index < dataImport.length; index++) {
        const element = dataImport[index];
        const id = `${moment().unix()}-${fshp.generateKey(5)}`
        let itemList = []
        itemList.push(id)
        for (const iterator of element) {
            itemList.push(iterator)
        }
        itemList.push(moment().format(format_datetime))
        itemList.push(user_id)
        await callQuery(sql, itemList)
    }

}
const setDataMasterSpecData = async (dataImport, user_id) => {
    const sql = `INSERT INTO master_condition_special 
    (id, type, car_brand, date_rate_1, date_rate_2,date_rate_3,date_rate_4,date_rate_5,date_rate_6,date_rate_7,date_rate_8,date_rate_9,date_rate_10,date_rate_11,date_rate_12,date_rate_13,date_rate_14,date_rate_15,date_rate_16,date_rate_17,date_rate_18,date_rate_19,date_rate_20,date_rate_21,date_rate_22,date_rate_23,date_rate_24,date_rate_25,date_rate_26,date_rate_27,date_rate_28,date_rate_29,date_rate_30,date_rate_31,date_rate_32,date_rate_33,date_rate_34,date_rate_35,create_at,create_by) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`
    await callQuery(`DELETE FROM master_condition_special;`, [])
    for (let index = 0; index < dataImport.length; index++) {
        const element = dataImport[index];
        const id = `${moment().unix()}-${fshp.generateKey(5)}`
        let itemList = []
        itemList.push(id)
        for (const iterator of element) {
            itemList.push(iterator)
        }
        itemList.push(moment().format(format_datetime))
        itemList.push(user_id)
        await callQuery(sql, itemList)
    }

}

const setDataOutStanding = async (dataImport, user_id) => {
    const sql = `INSERT INTO out_standing 
    (out_standing_id, 
        out_standing_dealer_code, 
        out_standing_loan_type, 
        out_standing_dealer_name, 
        out_standing_franchise,
        out_standing_invoice_date,
        out_standing_interest_cal_date,
        out_standing_midno,
        out_standing_chassis,
        out_standing_engine,
        out_standing_outstanding,
        type_curtailment_spec,
        spec_ratetype_1,
        spec_rate_1,
        startdate_1,
        enddate_1,
        spec_ratetype_2,
        spec_rate_2,
        startdate_2,
        enddate_2,
        spec_ratetype_3,
        spec_rate_3,
        startdate_3,
        enddate_3,
        spec_ratetype_4,
        spec_rate_4,
        startdate_4,
        enddate_4,
        out_standing_create_at,
        out_standing_create_by) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`
    await callQuery(`DELETE FROM out_standing;`, [])
    for (let index = 0; index < dataImport.length; index++) {
        const element = dataImport[index];
        const id = `${moment().unix()}-${fshp.generateKey(5)}`
        let itemList = []
        itemList.push(id)
        for (const iterator of element) {
            itemList.push(iterator)
        }
        itemList.push(moment().format(format_datetime))
        itemList.push(user_id)
        // console.log(`itemList`, itemList)
        await callQuery(sql, itemList)
    }
}
const setDataPayment = async (dataImport, user_id) => {
    const sql = `INSERT INTO payment 
    (payment_id, 
        payment_dealer_code, 
        payment_mid, 
        payment_paydate_1,
        payment_amount_1,
        payment_paydate_2,
        payment_amount_2,
        payment_paydate_3,
        payment_amount_3,
        payment_paydate_4,
        payment_amount_4,
        payment_paydate_5,
        payment_amount_5,
        payment_paydate_6,
        payment_amount_6,
        payment_create_at,
        payment_create_by) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`
    await callQuery(`DELETE FROM payment;`, [])
    for (let index = 0; index < dataImport.length; index++) {
        const element = dataImport[index];
        const id = `${moment().unix()}-${fshp.generateKey(5)}`
        let itemList = []
        itemList.push(id)
        for (let i = 0; i < 14; i++) {
            const iterator = element[i];
            if (!_.isUndefined(iterator)) {
                itemList.push(iterator)
            } else {
                itemList.push(null)
            }

        }
        // for (const iterator of element) {
        //     itemList.push(iterator)
        // }
        itemList.push(moment().format(format_datetime))
        itemList.push(user_id)
        // console.log(`itemList`, itemList)
        await callQuery(sql, itemList)
    }
}
const setDataDefault = async (dataImport, user_id) => {
    const sql = `INSERT INTO default_file 
    (default_id, 
        default_no, 
        default_asmonth, 
        default_dealer_code,
        default_default,
        default_mid,
        default_due_date,
        default_pay_date,
        default_installment,
        default_default_rate,
        default_remark,
        default_create_at,
        default_create_by) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`
    await callQuery(`DELETE FROM default_file;`, [])
    for (let index = 0; index < dataImport.length; index++) {
        const element = dataImport[index];
        const id = `${moment().unix()}-${fshp.generateKey(5)}`
        let itemList = []
        itemList.push(id)
        for (const iterator of element) {
            itemList.push(iterator)
        }
        itemList.push(moment().format(format_datetime))
        itemList.push(user_id)
        await callQuery(sql, itemList)
    }
}
const setDataDealerCondition = async (dataImport, user_id) => {
    const sql = `INSERT INTO dealer_condition 
    (dealer_condition_id, 
        dealer_condition_dealer_code, 
        dealer_condition_dealer_name, 
        dealer_condition_franchise,
        dealer_condition_loan_type,
        dealer_condition_register_address,
        dealer_condition_email,
        dealer_condition_type_curtailment,
        dealer_condition_grace_period,
        dealer_condition_nor_rate_type,
        dealer_condition_nor_rate,
        startdate_1,
        enddate_1,
        nor_ratetype_1,
        nor_rate_1,
        startdate_2,
        enddate_2,
        nor_ratetype_2,
        nor_rate_2,
        startdate_3,
        enddate_3,
        nor_ratetype_3,
        nor_rate_3,
        startdate_4,
        enddate_4,
        nor_ratetype_4,
        nor_rate_4,
        dealer_condition_create_at,
        dealer_condition_create_by) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`
    await callQuery(`DELETE FROM dealer_condition;`, [])
    for (let index = 0; index < dataImport.length; index++) {
        const element = dataImport[index];
        const id = `${moment().unix()}-${fshp.generateKey(5)}`
        let itemList = []
        itemList.push(id)
        for (const iterator of element) {
            itemList.push(iterator)
        }
        itemList.push(moment().format(format_datetime))
        itemList.push(user_id)
        await callQuery(sql, itemList)
    }
}
const checkUserName = ({ username }) => {
    let sql = `SELECT user_username FROM user WHERE user_username = ? LIMIT 1;`
    return callQuery(sql, [username])
}
const callQuery = (sql, where) => {
    return new Promise((resolve, reject) => {
        db.query(sql, where).then((res) => {
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    });
}

const TIME_NOW = () => moment().format(format_datetime)

module.exports = {
    getUser,
    getMasterData,
    getDealerCondition,
    getSearchReportByDealer,
    getMasterCondition,
    getOutStanding,
    getPayment,
    getDefault,
    getMasterConditionAll,
    getReportByDealer,
    getLoanTypeData,
    getMasterSpecCondition,
    getMasterSpecConditionAll,

    setDataMasterData,
    setMasterData,
    setUser,
    setDataOutStanding,
    setDataPayment,
    setDataDefault,
    setDataDealerCondition,
    setDataMasterSpecData,

    updateUserSession,
    updateLogin,
    updateLoanType,
    updateLogout,

    checkUserName,
    reSetPassword
};