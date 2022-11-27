const getUserByToken = require("../getUserByToken")
const me = require("../me")

async function authData(req, res, next) {
    const user = await getUserByToken(req)
    const user_data = me(user)
    
    res.locals.auth = user_data.auth
    res.locals.user = user
    res.locals.user_data = user_data

    next()
}

module.exports = authData