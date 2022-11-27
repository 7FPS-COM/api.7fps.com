const { default: fetch } = require("node-fetch");
const getJSONResponse = require("./getJSONResponse");

const getUserData = async (oauthData = {token_type: '', access_token: ''}) => {
    const response = await fetch('https://discord.com/api/users/@me', {
        headers: {
            authorization: `${oauthData.token_type} ${oauthData.access_token}`,
        },
    });

    const userData = await getJSONResponse(response.body)

    return userData
} 


module.exports = getUserData