const jwt = require("jsonwebtoken")

exports.tokenGenerator = (payload, expiry) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: expiry
    })
}