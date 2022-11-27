const {users} = require('../database/models/models')

async function updateUser(user, discord_data) {
    const {id, username, discriminator, avatar, email} = discord_data
    try {
        const result = await users.update({discord_id: id, discord_username: username, discord_discriminator: discriminator, discord_avatar: avatar, discord_email: email})
        return result
    } catch (error) {
        return false
    }
}

module.exports = updateUser