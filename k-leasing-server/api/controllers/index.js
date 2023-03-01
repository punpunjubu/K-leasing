


const db = require('../../db/database')
const fshp = require('../help')
const moment = require('moment')

var session;
class Controller {
    _nconf;
    constructor(nconf) {
        this._nconf = nconf
    }
    getStandardRequest = (req, res) => {
        res.status(200).send({ Status: 'Cannot Process Request' });
    };

    getIndex = (req, res) => {
        res.status(200).send('OK');
    }
  
    destroy = (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                console.error(err);
            } else {
                res.clearCookie('my.connect.sid');
                res.redirect('/');
            }
        });
    };

    

}
module.exports = Controller