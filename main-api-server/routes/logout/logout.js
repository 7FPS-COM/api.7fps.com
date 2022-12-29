const Router = require('express')
const router = new Router()


router.get('/', async (req, res) => {
    const PROTOCOL = process.env.PROTOCOL || 'http'
    const CLIENT_DOMAIN_NAME = `${PROTOCOL}://${process.env.CLIENT_DOMAIN_NAME}?logout=success` || 'http://localhost'
    return res.clearCookie('token').redirect(CLIENT_DOMAIN_NAME)
})


module.exports = router;