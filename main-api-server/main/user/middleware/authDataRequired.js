const getUserByToken = require("../getUserByToken")
const me = require("../me")

// TODO: auth data without required (authData.js)

async function authDataRequired(req, res, next) {
    const user = await getUserByToken(req)
    const user_data = me(user)
    if(user_data.auth === false) return res.status(401).json({user: user_data})
    
    res.locals.auth = user_data.auth
    res.locals.user = user
    res.locals.user_data = user_data

    next()
}

module.exports = authDataRequired