const Router = require('express')
const router = new Router()

router.use(require('../../main/user/middleware/authDataRequired.js'))
router.use(require('../../main/notes/middleware/getNotesSettings'))

//    [GET] /notes/list
router.get('/list', require('./actions/list/list'))

//    [PUT] /notes/settings
router.put('/settings', require('./settings/put'))

//    [GET] /notes/:noteId
router.get('/:noteId', require('./actions/getNote/getNote'))

// [DELETE] /notes
router.delete('/:noteId', require('./actions/delete/delete'))

//    [PUT] /notes
router.put('/:noteId', require('./actions/put/put'))

//   [POST] /notes
router.post('/', require('./actions/post/post'))


module.exports = router;