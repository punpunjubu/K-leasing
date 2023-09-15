const db = require('../../db/database')
const fshp = require('../help')
const moment = require('moment')

class ImportData {
    _nconf;
    constructor(nconf) {
        this._nconf = nconf
    }
    setDataImport = async (req, res) => {
        try {
            const { headers: { session }, body: { dataImport, type, user_id } } = req
            if (!session || !dataImport || !type || !user_id) {
                return fshp.handleError(res, 401, 'Incomplete value Error')
            }
            if (type === 'master_data') {
                await db.setDataMasterData(dataImport, user_id)
                res.status(200).json({
                    data: 'success',
                    status: 200
                });
            }else if (type === 'master_data_spec') {
                await db.setDataMasterSpecData(dataImport, user_id)
                res.status(200).json({
                    data: 'success',
                    status: 200
                });
            }  else if (type === 'out_standing') {
                await db.setDataOutStanding(dataImport, user_id)
                res.status(200).json({
                    data: 'success',
                    status: 200
                });
            } else if (type === 'payment') {
                await db.setDataPayment(dataImport, user_id)
                res.status(200).json({
                    data: 'success',
                    status: 200
                });
            } else if (type === 'default') {
                await db.setDataDefault(dataImport, user_id)
                res.status(200).json({
                    data: 'success',
                    status: 200
                });
            } else if (type === 'dealer_condition') {
                await db.setDataDealerCondition(dataImport, user_id)
                res.status(200).json({
                    data: 'success',
                    status: 200
                });
            } else {
                return fshp.handleError(res, 401, 'Type Error')
            }
        } catch (error) {
            return fshp.handleError(res, 401, error)
        }


    };

}
module.exports = ImportData