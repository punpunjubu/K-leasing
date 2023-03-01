if (process.env.NODE_ENV === 'development') {
    require("babel-core/register");
    require("babel-polyfill");
}

const express = require('express')
const cors = require('cors')
const nconf = require('nconf');
const session = require('express-session')
const bodyParser = require('body-parser');
const uuid = require('uuid').v4
const FileStore = require('session-file-store')(session);
const app = express()

var cookieParser = require('cookie-parser');
const config = require(`./configs/server.json`);
nconf.defaults(config);
const PORT = nconf.get('server:port');
const RouterController = require('./api/routes');
const moment = require('moment-timezone');
moment().tz("Asia/Bangkok");

const fileStoreOptions = {
    maxTimeout: 60000,
    path: "./sessions",
    reapInterval: 60 * 10,
};

app.use(cookieParser());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.set('trust proxy', 1);
app.use(session({
    // genid: (req) => {
    //     return uuid() // use UUIDs for session IDs
    // },
    // store: new FileStore(fileStoreOptions),
    secret: nconf.get('security:key_session'),
    resave: false,
    saveUninitialized: true,
    // cookie: {
    //     secure: app.get('env') === 'production',
    //     maxAge: nconf.get('security:max_age')
    // },
    name: nconf.get('security:name')
}));

app.use(cors({
    origin: ['http://localhost:3200', 'http://localhost:3000','http://209.97.171.30:3200'],
    methods: ['GET', 'POST'],
    credentials: true
}))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

new RouterController(app, nconf);

app.listen(PORT, (error) => {
    if (error) {
        console.error(error); // eslint-disable-line no-console
    } else {
        console.log(`Server start port: ${PORT}`)
    }
})