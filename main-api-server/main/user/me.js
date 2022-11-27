function me(user) {
    if(user === null) {
        return { auth: false }
    } else {
        const data = {
            discord_id: user.discord_id,
            discord_username: user.discord_username,
            discord_discriminator: user.discord_discriminator,
            discord_avatar: user.discord_avatar,
            discord_email: user.discord_email,
            ban_until: user.ban_until,
            user_role: user.user_role,
        }

        return { auth: true, ...data }
    }
}

module.exports = me