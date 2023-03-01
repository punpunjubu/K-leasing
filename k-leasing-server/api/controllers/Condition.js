const db = require('../../db/database')
const fshp = require('../help')
const moment = require('moment')

class Condition {
    _nconf;
    constructor(nconf) {
        this._nconf = nconf
    }
    getMaster = async (req, res) => {
        try {
            const { headers: { session } } = req
            if (!session) {
                return fshp.handleError(res, 401, 'Session value Error')
            }
            const response = await db.getMasterData()
            res.status(200).json({
                data: response,
                status: 200
            });
        } catch (error) {
            return fshp.handleError(res, 401, error)
        }
    };
    getLoanType = async (req, res) => {
        try {
            const { headers: { session } } = req
            if (!session) {
                return fshp.handleError(res, 401, 'Session value Error')
            }
            const response = await db.getLoanTypeData()
            res.status(200).json({
                data: response,
                status: 200
            });
        } catch (error) {
            return fshp.handleError(res, 401, error)
        }
    };

    getSearchReportByDealer = async (req, res) => {
        try {
            const { headers: { session }, query: { dealer, date } } = req
            if (!session || !dealer || !date) {
                return fshp.handleError(res, 401, 'Session value Error')
            }
            let response = await db.getSearchReportByDealer({ dealer, date })
            response.date = date
            res.status(200).json({
                data: response,
                status: 200
            });
        } catch (error) {
            return fshp.handleError(res, 401, error)
        }
    };
    getReportAll = async (req, res) => {
        try {
            const { headers: { session }, body: { dealer, date } } = req
            if (!session || !dealer || !date) {
                return fshp.handleError(res, 401, 'Session value Error')
            }
            let item = {}
        
            const responseMaster = await db.getMasterConditionAll()
            item.master_condition = responseMaster
            item.date = date
            item.data = []
            for (let index = 0; index < dealer.length; index++) {
                const element = dealer[index];
                const response = await db.getReportByDealer({ dealer: element, date })
                item.data.push(response)
            }

            res.status(200).json({
                data: item,
                status: 200
            });
        } catch (error) {
            return fshp.handleError(res, 401, error)
        }
    };
    getDealerCondition = async (req, res) => {
        try {
            const { headers: { session } } = req
            if (!session) {
                return fshp.handleError(res, 401, 'Session value Error')
            }
            const response = await db.getDealerCondition('all')
            res.status(200).json({
                data: response,
                status: 200
            });
        } catch (error) {
            return fshp.handleError(res, 401, error)
        }
    };

    getStatusFile = async (req, res) => {
        try {
            const { headers: { session } } = req
            if (!session) {
                return fshp.handleError(res, 401, 'Session value Error')
            }
            let data = {}
            data.master_condition = await db.getMasterCondition()
            data.dealer_condition = await db.getDealerCondition()
            data.out_standing = await db.getOutStanding()
            data.payment = await db.getPayment()
            data.default_file = await db.getDefault()
            res.status(200).json({
                data: data,
                status: 200
            });
        } catch (error) {
            return fshp.handleError(res, 401, error)
        }
    };

    setMaster = async (req, res) => {
        try {
            const { headers: { session }, body: { rate_1, rate_2, rate_3, rate_4, user_id } } = req
            if (!session || !rate_1 || !rate_2 || !rate_3 || !rate_4 || !user_id) {
                return fshp.handleError(res, 401, 'Incomplete value Error')
            }
            await db.setMasterData({ rate_1, rate_2, rate_3, rate_4, user_id })
            const response = await db.getMasterData()
            res.status(200).json({
                data: response,
                status: 200
            });
        } catch (error) {
            return fshp.handleError(res, 401, error)
        }
    };
    setLoanType = async (req, res) => {
        try {
            const { headers: { session }, body: { item, user_id } } = req
            if (!session || !item || !user_id) {
                return fshp.handleError(res, 401, 'Session value Error')
            }
            for (let index = 0; index < item.length; index++) {
                const element = item[index];
                const param = {
                    vat: element.loan_type_vat,
                    tax: element.loan_type_tax,
                    user_id: user_id,
                    id: element.loan_type_id
                }
                await db.updateLoanType(param)
            }
            const response = await db.getLoanTypeData()
            res.status(200).json({
                data: response,
                status: 200
            });
        } catch (error) {
            return fshp.handleError(res, 401, error)
        }
    };



}
module.exports = Condition