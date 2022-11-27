const { notes_user_settings } = require("../../../main/database/models/models");

const updateSettings = async (req, res) => {
    const user = res.locals.user
    const user_data = res.locals.user_data
    var settings = res.locals.settingsRow

    if(user === null) return res.status(401).json({auth: false})
    try {
        if(settings === null) {
            settings = await notes_user_settings.findOne({where: {discord_id: user.discord_id}})
        }
        if(!settings) {
            await notes_user_settings.create({discord_id: user.discord_id})
            settings = await notes_user_settings.findOne({where: {discord_id: user.discord_id}})
        }
        
        let newSettings = req.body.settings || settings.settings
        await settings.update({settings: newSettings})

        try {
            return res.json({
                user: user_data,

                settings: JSON.parse(settings.settings)
            })
        } catch (error) {
            return res.json({
                user: user_data,
                settings: null,
                error: true,
                error_message: error.message
            })
        }

        

    } catch (error) {
        return res.status(500).json({error: error.message, settings: null})
    }
}


module.exports = updateSettings;