


const db = require('../../db/database')
const fshp = require('../help')
const moment = require('moment')
const _ = require('lodash')

class User {
    _nconf;
    constructor(nconf) {
        this._nconf = nconf
    }
    getUser = async (req, res) => {
        try {
            const { headers: { session }, query: { user_id } } = req
            if (!session || !user_id) {
                return fshp.handleError(res, 401, 'Incomplete value Error')
            }
            const param = {
                session,
                user_id
            }
            const response = await db.getUser(param, 'user')
            if (!response.length) {
                return fshp.handleError(res, 401, 'Invalid value Error')
            }
            let last_login = moment(response[0].user_last_login)
            var duration = moment.duration(moment().diff(last_login));
            const days = Math.floor(duration.asDays());
            const hours = Math.floor(duration.hours());
            // const minutes = duration.minutes();

            if (days > 0 || hours >= 1) {
                await db.updateUserSession({ token: null, id: response[0].user_id })
            } else {
                await db.updateLogin({ id: response[0].user_id })
            }
            res.status(200).json({
                data: response[0],
                status: 200
            });
        } catch (error) {
            return fshp.handleError(res, 401, error)
        }
    }
    userLogin = async (req, res) => {
        try {
            const { body: { username, password } } = req
            if (!username || !password) {
                return fshp.handleError(res, 401, 'Login Error')
            }
            const isUser = await db.getUser({ username }, 'username')
            if (!isUser.length) {
                return fshp.handleError(res, 401, 'This user does not exist')
            }
            let item = isUser[0]
            fshp.comparePassword(password, item.user_password, async (err, isPasswordMatch) => {
                if (err) {
                    return fshp.handleError(res, 401, err)
                }

                if (isPasswordMatch) {
                    const keySession = fshp.generateKey(20)
                    await db.updateUserSession({ token: keySession, id: item.user_id })
                    item.user_token = keySession
                    delete item.user_password
                    req.session.token = keySession
                    req.session.save();
                    res.status(200).json({
                        data: item,
                        status: 200
                    })
                } else {
                    return fshp.handleError(res, 401, 'This user does not exist')
                }
            })

        } catch (error) {
            return fshp.handleError(res, 401, error)
        }
    }
    userRegister = async (req, res) => {
        try {
            const {
                body: {
                    username,
                    password,
                    name,
                    email,
                    mobile_number,
                }
            } = req
            if (!username || !password || !name) {
                return fshp.handleError(res, 401, 'Incomplete information')
            }
            const isUserName = await db.checkUserName({ username })
            if (isUserName.length) {
                return fshp.handleError(res, 401, 'This user is already in use.')
            }
            // status 
            // 1 = active
            // 9 = block
            // 0 = delete
            const item = {
                username,
                password,
                name,
                email: email || '',
                mobile_number: mobile_number || 0,
                type: 'user',
                status: 1
            }
            fshp.cryptPassword(password, async (err, hash) => {
                if (err) {
                    return fshp.handleError(res, 401, err)
                }
                if (hash) {
                    item.id = `${moment().unix()}-${fshp.generateKey(2)}`
                    item.password = hash
                    await db.setUser(item)
                    res.status(200).json({
                        data: 'succeed',
                        status: 200
                    });
                }
            })

        } catch (error) {
            return fshp.handleError(res, 401, error)
        }
    }

    getConnect = async (req, res) => {
        try {
            const { headers: { session } } = req
            if (_.isUndefined(session) || !session) {
                return res.status(200).json({
                    data: {},
                    status: 200
                });
            }

            if (req.session.token === session) {
                const response = await db.getUser({ session: req.session.token }, 'session')
                if (!response.length) {
                    res.status(200).json({
                        data: {},
                        status: 200
                    });
                } else {
                    await db.updateLogin({ id: response[0].user_id })
                    const minute = this._nconf.get('security:max_age')

                    const hour = (minute / 1000) / 60
                    // req.session.cookie.maxAge = 5 * 60 * 1000;
                    // req.session.save();
                    res.status(200).json({
                        data: response[0],
                        status: 200
                    });
                }
                // req.session.token
                // req.session.save();
            } else {
                // req.session.token = req.sessionID
                // req.session.save();
                res.status(200).json({
                    data: {},
                    status: 200
                });
            }
            // req.session.token = req.sessionID
            // req.session.save();

        } catch (error) {
            return fshp.handleError(res, 401, error)
        }

    }
    logout = async (req, res) => {
        try {
            const { headers: { session }, query: { id } } = req
            if (_.isUndefined(session) || !session || !id) {
                return fshp.handleError(res, 401, 'Error data logout')
            }
            await db.updateLogout({ user_id: id })
            req.session.destroy((err) => {
                if (err) {
                    return fshp.handleError(res, 401, err)
                } else {
                    res.clearCookie(this._nconf.get('security:name'));
                    res.status(200).json({
                        data: {},
                        status: 200
                    });
                }
            });
        } catch (error) {
            return fshp.handleError(res, 401, error)
        }
    }
    resetpassword = async (req, res) => {
        try {
            const { headers: { session }, body: {
                user_id,
                password,
                newpassword,
            } } = req
            if (_.isUndefined(session) || !session || !user_id || !password || !newpassword) {
                return fshp.handleError(res, 401, 'Error input data')
            }
            const param = {
                session,
                user_id
            }
            const response = await db.getUser(param, 'user')
            if (!response.length) {
                return fshp.handleError(res, 401, 'Invalid value Error')
            }
            fshp.comparePassword(password, response[0].user_password, async (err, isPasswordMatch) => {
                if (err) {
                    return fshp.handleError(res, 401, err)
                }
                if (isPasswordMatch) {
                    fshp.cryptPassword(newpassword, async (err, hash) => {
                        if (err) {
                            return fshp.handleError(res, 401, err)
                        }
                        if (hash) {
                            await db.reSetPassword({ id: response[0].user_id, pw: hash })
                            res.status(200).json({
                                data: 'succeed',
                                status: 200
                            });
                        }
                    })
                } else {
                    return fshp.handleError(res, 401, 'Password does not match')
                }
            })

        } catch (error) {
            return fshp.handleError(res, 401, error)
        }
    }
}
module.exports = User