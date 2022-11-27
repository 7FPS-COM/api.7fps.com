const didTimePassed = require("../utils/didTimePassed");
const millisecondsToSeconds = require("../utils/millisecondsToSeconds");
const database = require('../../database/models/models')
const regionExists = require('../utils/regionExists')
const languageExists = require('../utils/languageExists')

async function getEvents(options = {}) {
    if(!options.lang) {
        return false
    }
    if(!languageExists(options.lang)) {
        return false
    }
    if(!options.region) {
        return false
    }
    if(!regionExists(options.region)) {
        return false
    }

    const {lang, region} = options
    const uri = `https://fortniteapi.io/v1/events/list?lang=${lang}&region=${region}`

    const secondsBetweenUpdates = process.env.SECONDS_BETWEEN_UPDATES || 600

    try {
        const databaseRecord = await database.events.findOne({
            where: {uri: uri}
        });

        if(!databaseRecord) {
            return false
        }


        const prevTime = millisecondsToSeconds(new Date(databaseRecord.updatedAt).getTime())
        const currentTime = millisecondsToSeconds(Date.now())
        const timePassed = didTimePassed(secondsBetweenUpdates, prevTime, currentTime)

        if(!timePassed) {
            return databaseRecord.data
        }
        if(timePassed) {
            return false
        }

    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports = getEvents