const Router = require('express')
const router = new Router()

router.get('/loot/list', require('./loot/list'))

router.get('/events/list', require('./events/list'))
router.get('/events/window', require('./events/window'))

module.exports = router