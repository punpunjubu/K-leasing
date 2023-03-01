const crypto = require('crypto');
const bcrypt = require('bcrypt');
const generateKey = (num = 10) => {
    return crypto.randomBytes(num).toString('hex');
};
const cryptPassword = (password, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        if (err)
            return callback(err);
        bcrypt.hash(password, salt, (err, hash) => {
            return callback(err, hash);
        });
    });
};
const comparePassword = (plainPass, hashword, callback) => {
    bcrypt.compare(plainPass, hashword, (err, isPasswordMatch) => {
        return err == null ?
            callback(null, isPasswordMatch) :
            callback(err);
    });
};
const encodeBase64 = (originalString) => {
    const bufferObj = Buffer.from(originalString, "utf8");
    return bufferObj.toString("base64");
}
const decodeBase64 = (base64string) => {
    const bufferObj = Buffer.from(base64string, "base64");
    return bufferObj.toString("utf8");
}
const replacer = (string, type) => {
    return string.replace(/([^\d]*)(\d*)([^\w]*)/, (match, p1, p2, p3, offset, string) => {
        // p1 is nondigits, p2 digits, and p3 non-alphanumerics
        switch (type) {
            case 'number':
                return p2
            case 'non-alphanumerics':
                return p3
            default:
                return p1
        }
    })
}
const isPatternEmail = (string) => {
    const value = string.trim();
    const shouldDisplayError = regexTestFails(value, "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,3}$")
    if (shouldDisplayError) {
        return false;
    }
    return true
    
}
const regexTestFails = (value, ruleValue) => {
    return !RegExp(ruleValue, 'g').test(value);
}

const handleError = (res, code, error) => {
    const message = (typeof error === 'string' ? error : (error.desc || error.message)) || JSON.stringify(error)
    return res.status(code).json({ status: code, error: message })
}

module.exports = {
    generateKey,
    cryptPassword,
    comparePassword,
    encodeBase64,
    decodeBase64,
    replacer,
    isPatternEmail,
    handleError
};