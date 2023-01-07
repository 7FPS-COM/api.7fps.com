const Router = require('express')
const getStats = require('../../main/stats/getStats')
const router = new Router()


router.get('/', async (req, res) => {
    const data = await getStats()

    return res.json(data)
})


module.exports = router;