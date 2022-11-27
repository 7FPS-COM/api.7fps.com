const { notes } = require("../../../../main/database/models/models")
const getNoteListObj = require("../../../../main/notes/getNoteListObj")

const deleteNote = async (req, res) => {
    const user = res.locals.user
    const user_data = res.locals.user_data
    const settings = res.locals.settings

    try {

    let noteId = req.params.noteId || null
    if(noteId === null) return res.status(406).json({auth: true, found: false})

    const note = await notes.findOne({where: { discord_id: user.discord_id, note_id: noteId }})

    if(!note) return res.status(404).json({auth: true, found: false})

        await note.destroy()

        const [notes_data, noteList] = await getNoteListObj(user.discord_id)

        return res.json({
            user: user_data,
            notes_settings: settings,
            notes: notes_data
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: true})
    }
}

module.exports = deleteNote;