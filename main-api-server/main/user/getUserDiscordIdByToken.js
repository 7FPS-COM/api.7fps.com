const {access_tokens} = require('../database/models/models')

const getUserDiscordIdByToken = async (token, ip, user_agent) => {
    let db_access_tokens_result
    
    try {
        db_access_tokens_result = await access_tokens.findOne({where: {token: token}})
    } catch (error) {
        return null
    }

    if(db_access_tokens_result === null) {
        return null
    } else {
        if(db_access_tokens_result.ip !== ip) {
            if(db_access_tokens_result.user_agent === user_agent) {
                return db_access_tokens_result.discord_id
            } else {
                return null
            }
        }
        if(db_access_tokens_result.user_agent !== user_agent) {
            if(db_access_tokens_result.ip === ip) {
                return db_access_tokens_result.discord_id
            } else {
                return null
            }
        }
        return db_access_tokens_result.discord_id
    }
}

module.exports = getUserDiscordIdByToken