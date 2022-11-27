const Router = require('express');
const getUserByRequest = require('../../../main/user/getUserByToken');
const me = require('../../../main/user/me');
const router = new Router()

router.get('/', async (req, res) => {
    const user = await getUserByRequest(req)
    return res.json(me(user))
})

module.exports = router;