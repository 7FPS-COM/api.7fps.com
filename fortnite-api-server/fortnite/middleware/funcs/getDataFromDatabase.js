const getEvents = require("./getEvents")
const getLootList = require("./getLootList")
const getRequestType = require("./getRequestType")

async function getDataFromDatabase(uri, options = {}) {
    const requestType = getRequestType(uri)
    if(requestType === 'lootList') {
        const lootList = await getLootList()
        return lootList
    }

    if(requestType === 'events') {
        if(!options.region) {
            return false
        }
        const events = await getEvents(options)
        return events
    }
    return false
}

module.exports = getDataFromDatabase