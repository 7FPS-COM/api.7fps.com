const { default: fetch } = require("node-fetch");
const getJSONResponse = require("./getJSONResponse");

const getUserConnections = async (oauthData = {token_type: '', access_token: ''}) => {
    const response = await fetch('https://discord.com/api/users/@me/connections', {
        headers: {
            authorization: `${oauthData.token_type} ${oauthData.access_token}`,
        },
    });

    const userConnections = await getJSONResponse(response.body)

    return userConnections
} 


module.exports = getUserConnections