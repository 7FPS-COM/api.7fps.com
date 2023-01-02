const Router = require('express')
const router = new Router()

router.use('/login', require('./login/login'));
router.use('/logout', require('./logout/logout'));
router.use('/notes', require('./notes/notesRouter'));
router.use('/user', require('./user/userRouter'))
router.use('/restart/backend', require('./restart/restartBackend'))
router.use('/restart/frontend', require('./restart/restartFrontend'))

module.exports = router;