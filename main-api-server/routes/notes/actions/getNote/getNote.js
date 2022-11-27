const {notes} = require('../../../../main/database/models/models')

const getNote = async (req, res) => {
    const user = res.locals.user
    const user_data = res.locals.user_data
    const settings = res.locals.settings

    try {
        let noteId = req.params.noteId || null

        const note = await notes.findOne({where: { note_id: noteId }})

        if(!note) return res.status(404).json({found: false})
        if(note.is_share) {
            return res.json({
                note: {
                    note_id: note.note_id,
                    title: note.title,
                    content: note.content,
                    is_share: note.is_share
                }
            })
        }
        if(user === null) return res.status(401).json({found: true, auth: false})

        if(user.discord_id !== note.discord_id) return res.status(401).json({found: true, auth: false})

        return res.json({
            user: user_data,
            notes_settings: settings,
            note: {
                note_id: note.note_id,
                title: note.title,
                content: note.content,
                is_share: note.is_share
            }
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: true})
    }
}


module.exports = getNote;