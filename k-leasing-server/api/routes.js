
const UserController = require('./controllers/User');
const ImportDataController = require('./controllers/ImportData');
const Controller = require('./controllers');
const ConditionController = require('./controllers/Condition');
class RouterController {
    constructor(app,nconf) {
        const user = new UserController(nconf);
        const controller = new Controller(nconf);
        const importData = new  ImportDataController(nconf)
        const condition = new  ConditionController(nconf);
        app.get('/', controller.getIndex);
        app.get('/destroy', controller.destroy);
        app.get('/connect', user.getConnect);
        app.get('/getUser', user.getUser);
        app.get('/logout', user.logout);
        app.get('/getMaster', condition.getMaster);
        app.get('/getDealerCondition', condition.getDealerCondition);
        app.get('/getSearchReportByDealer', condition.getSearchReportByDealer);
        app.get('/getStatusFile', condition.getStatusFile);
        app.get('/getLoanType', condition.getLoanType);
        
        app.post('/login', user.userLogin);
        app.post('/register', user.userRegister);
        app.post('/setDataImport', importData.setDataImport);
        app.post('/setMaster', condition.setMaster);
        app.post('/getReportAll', condition.getReportAll);
        app.post('/setLoanType', condition.setLoanType);
        app.post('/resetpassword', user.resetpassword);
        app.get('*', controller.getStandardRequest);
    }
}
module.exports = RouterController