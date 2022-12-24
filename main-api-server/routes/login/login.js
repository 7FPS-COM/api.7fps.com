const Router = require('express')
const getTokenResponseData = require('../../main/auth/getTokenResponseData')
const getUserConnections = require('../../main/auth/getUserConnections')
const getUserData = require('../../main/auth/getUserData')
const getUserGuilds = require('../../main/auth/getUserGuilds')
const createUser = require('../../main/user/createUser')
const {users, discord_tokens} = require('../../main/database/models/models')
const updateUser = require('../../main/user/updateUser')
const createAccessToken = require('../../main/user/createAccessToken')
const router = new Router()



router.get('/', async (req, res) => {
    const DISCORD_GENERATED_URL = process.env.DISCORD_GENERATED_URL || null
    const CLIENT_DOMAIN_NAME = process.env.CLIENT_DOMAIN_NAME || 'http://localhost'

    if(!req.query.code) {
        return res.redirect(DISCORD_GENERATED_URL)
    }

    if(req.query.code) {
        try {
            const token_data = await getTokenResponseData(req.query.code)
            console.log({token_data})
            if(!token_data.access_token) {
                console.log({access_token: token_data.access_token})
                throw 'no access token'
            }
            const access_token = token_data.access_token
            const refresh_token = token_data.refresh_token
            const token_type = token_data.token_type

            const user_data = await getUserData({token_type: token_type, access_token: access_token})
            if(!user_data.username) {
                throw 'no username'
            }

            await discord_tokens.create({discord_id: user_data.id, access_token: access_token, refresh_token: refresh_token, token_type: token_type})

            const userFound = await users.findOne({where: {discord_id: user_data.id}})

            const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
            const user_agent = req.headers['user-agent']

            if(userFound) {
                await updateUser(userFound, user_data)

                const access_token = await createAccessToken(user_data.id, ip, user_agent)
                return res
                        .cookie('token', access_token, { expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365) })
                        .redirect(`${CLIENT_DOMAIN_NAME}?login=success`)
            }

            if(!userFound) {
                const result = await createUser(user_data)
                
                const access_token = await createAccessToken(user_data.id, ip, user_agent)
                return res
                        .cookie('token', access_token)
                        .redirect(`${CLIENT_DOMAIN_NAME}?login=success`)
            }



            
        } catch (error) {
            return res.redirect(DISCORD_GENERATED_URL)
        }
    }

    if(req.query.access_token) {
        const token_type = req.query.token_type || 'Bearer'

        const userData = await getUserData({token_type: token_type, access_token: req.query.access_token})
        const userGuilds = await getUserGuilds({token_type: token_type, access_token: req.query.access_token})
        const userConnections = await getUserConnections({token_type: token_type, access_token: req.query.access_token})

        return res.json({userData, userGuilds, userConnections})
    }

    return res.send(req.query.code)
})


module.exports = router;