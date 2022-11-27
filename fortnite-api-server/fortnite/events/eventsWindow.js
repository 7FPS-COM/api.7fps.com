const fetchAPI = require('../middleware/fetchAPI')

const eventsWindow = async (windowId) => {
    const uri = `https://fortniteapi.io/v1/events/window?windowId=${windowId}`
    const credentials = process.env.FORTNITE_API_KEY || ""
    const response = await fetchAPI(uri, credentials)

    return response
}

module.exports = eventsWindow