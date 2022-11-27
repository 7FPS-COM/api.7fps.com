const Router = require('express')
const router = new Router()


router.get('/', async (req, res) => {
    const CLIENT_DOMAIN_NAME = `${process.env.CLIENT_DOMAIN_NAME}?logout=success` || 'http://localhost'
    return res.clearCookie('token').redirect(CLIENT_DOMAIN_NAME)
})


module.exports = router;