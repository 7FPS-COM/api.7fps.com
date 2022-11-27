const {notes} = require('../database/models/models')

const getNoteListObj = async (discord_id) => {
    try {
        const noteList = await notes.findAll({where: { discord_id: discord_id }})
        const data = noteList.map(note => {
            return {
                note_id: note.note_id,
                title: note.title,
                is_share: note.is_share,
                last_update: note.updatedAt
            }
        })
        return [data, noteList]
    } catch (error) {
        console.warn(error)
        return null
    }
}

module.exports = getNoteListObj