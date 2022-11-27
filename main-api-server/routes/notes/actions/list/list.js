const getNoteListObj = require("../../../../main/notes/getNoteListObj")


const getNoteList = async (req, res) => {
    const user = res.locals.user
    const user_data = res.locals.user_data
    const settings = res.locals.settings

    try {

        const [notes_data, noteList] = await getNoteListObj(user.discord_id)

        return res.json({
            user: user_data,
            notes_settings: settings,
            notes: notes_data
        })
        
    } catch (error) {
        return res.status(500).json({error: true})
    }
}


module.exports = getNoteList;