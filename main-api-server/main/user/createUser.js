const {users} = require('../database/models/models')

async function createUser(discord_data) {
    const {id, username, discriminator, avatar, email} = discord_data
    try {
        const result = await users.create({discord_id: id, discord_username: username, discord_discriminator: discriminator, discord_avatar: avatar})
        return result
    } catch (error) {
        return false
    }
}

module.exports = createUser