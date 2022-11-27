const Router = require('express')
const router = new Router()


router.use('/@me', require('./@me/index'));



module.exports = router;