const { notes_user_settings } = require("../../database/models/models")

async function getNotesSettings(req, res, next) {
    const user = res.locals.user || null

    try {
        var settings = await notes_user_settings.findOne({where: {discord_id: user.discord_id}})
        if(!settings) {
            await notes_user_settings.create({discord_id: user.discord_id})
            settings = await notes_user_settings.findOne({where: {discord_id: user.discord_id}})
        }
        res.locals.settings = JSON.parse(settings.settings)
        res.locals.settingsRow = settings

    } catch (error) {
        res.locals.settings = null
        res.locals.settingsRow = null
    }

    next()
}

module.exports = getNotesSettings