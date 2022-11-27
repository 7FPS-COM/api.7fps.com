const generateToken = require("../utils/generateToken")
const {access_tokens} = require("../database/models/models")

const createAccessToken = async (id, ip, user_agent) => {
    const token = generateToken()

    try {
        const result = await access_tokens.create({
            discord_id: id,
            token: token,
            ip: ip,
            user_agent: user_agent
        })

        if(result) return token
        else return false
    } catch (error) {
        console.log(error.message)
        return false
    }

}

module.exports = createAccessToken