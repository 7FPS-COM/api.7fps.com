const {notes} = require('../../../../main/database/models/models')
const getNoteListObj = require('../../../../main/notes/getNoteListObj')

const updateNoteRecord = async (req, res) => {
    const user = res.locals.user
    const user_data = res.locals.user_data
    const settings = res.locals.settings

    let noteId = req.params.noteId || null
    if(noteId === null) return res.status(406).json({auth: true, found: false})

    const note = await notes.findOne({where: { discord_id: user.discord_id, note_id: noteId }})

    if(!note) return res.status(404).json({auth: true, found: false})

    try {

        let title = req.body.title || note.title
        let content = req.body.content || note.content
        let is_share = req.body.is_share || note.is_share

        await note.update({title: title, content: content, is_share: is_share})

        const [notes_data, noteList] = await getNoteListObj(user.discord_id)

        const updatedNote = noteList.filter(note => noteId === note.note_id )[0]

        return res.json({
            user: user_data,
            notes_settings: settings,
            notes: notes_data,
            updatedNote: {
                note_id: updatedNote.note_id,
                title: updatedNote.title,
                content: updatedNote.content,
                is_share: updatedNote.is_share
            }
    })
        
    } catch (error) {
        return res.status(500).json({error: true})
    }
}

module.exports = updateNoteRecord;