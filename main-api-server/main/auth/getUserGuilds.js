const { default: fetch } = require("node-fetch");
const getJSONResponse = require("./getJSONResponse");

const getUserGuilds = async (oauthData = {token_type: '', access_token: ''}) => {
    const response = await fetch('https://discord.com/api/users/@me/guilds', {
        headers: {
            authorization: `${oauthData.token_type} ${oauthData.access_token}`,
        },
    });

    const userGuilds = await getJSONResponse(response.body)

    return userGuilds
} 


module.exports = getUserGuilds