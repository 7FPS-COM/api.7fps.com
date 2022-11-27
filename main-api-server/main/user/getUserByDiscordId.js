const {users} = require('../database/models/models')

async function getUserByDiscordId(discord_id) {
    try {
        const result = await users.findOne({where: {discord_id: discord_id}})
        return result
    } catch (error) {
        return false
    }
}

module.exports = getUserByDiscordId