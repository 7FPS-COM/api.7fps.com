const fetchAPI = require('../middleware/fetchAPI')

const lootList = async () => {
    const uri = 'https://fortniteapi.io/v1/loot/list?lang=en'
    const credentials = process.env.FORTNITE_API_KEY || ""
    const response = await fetchAPI(uri, credentials)

    return response
}

module.exports = lootList