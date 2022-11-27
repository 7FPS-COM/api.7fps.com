const getUserByDiscordId = require("./getUserByDiscordId")
const getUserDiscordIdByToken = require("./getUserDiscordIdByToken")


async function getUserByToken(req) {
    try {
        if(!req.cookies.token) {
            return null
        }
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
        const user_agent = req.headers['user-agent'] || null
        if(user_agent === null) return null
        const user_discord_id = await getUserDiscordIdByToken(req.cookies.token, ip, user_agent)
        if(user_discord_id) {
            const user = await getUserByDiscordId(user_discord_id)
            return user
        } else {
            return null
        }

    } catch (error) {
        return null
    }
}

module.exports = getUserByToken