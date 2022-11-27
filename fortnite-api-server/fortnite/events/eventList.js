const fetchAPI = require('../middleware/fetchAPI')

const eventList = async (lang = 'en', region = 'EU') => {
    region = region.toUpperCase()
    const uri = `https://fortniteapi.io/v1/events/list?lang=${lang}&region=${region}`
    const credentials = process.env.FORTNITE_API_KEY || ""
    const response = await fetchAPI(uri, credentials, {lang: lang, region: region})

    return response
}

module.exports = eventList