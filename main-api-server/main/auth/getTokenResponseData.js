const { default: fetch } = require("node-fetch")
const getJSONResponse = require("./getJSONResponse")

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID || null
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET || null
const DISCORD_REDIRECT_URL = process.env.DISCORD_REDIRECT_URL || null

const getTokenResponseData = async (code) => {
    const response = await fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        body: new URLSearchParams({
            client_id: DISCORD_CLIENT_ID,
            client_secret: DISCORD_CLIENT_SECRET,
            code: code,
            grant_type: 'authorization_code',
            redirect_uri: DISCORD_REDIRECT_URL,
            scope: 'identify',
        }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
    const tokenData = await getJSONResponse(response.body)
    return tokenData
}

module.exports = getTokenResponseData