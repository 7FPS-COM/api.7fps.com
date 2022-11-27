const {notes} = require('../../../../main/database/models/models')
const getNoteListObj = require('../../../../main/notes/getNoteListObj')
const generateNoteId = require('../../../../main/utils/generateNoteId')

const createNote = async (req, res) => {
    const user = res.locals.user
    const user_data = res.locals.user_data
    const settings = res.locals.settings

    let title = req.body.title || 'new note'

    try {

        await notes.create({
            discord_id: user.discord_id,
            title: title,
            note_id: generateNoteId()
        })

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

module.exports = createNote;