const Router = require('express')
const router = new Router()

router.use('/login', require('./login/login'));
router.use('/logout', require('./logout/logout'));
router.use('/notes', require('./notes/notesRouter'));
router.use('/user', require('./user/userRouter'))

module.exports = router;