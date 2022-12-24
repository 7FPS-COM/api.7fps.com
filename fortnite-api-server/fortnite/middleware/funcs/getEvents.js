const didTimePassed = require("../utils/didTimePassed");
const millisecondsToSeconds = require("../utils/millisecondsToSeconds");
const database = require('../../database/models/models')
const regionExists = require('../utils/regionExists')
const languageExists = require('../utils/languageExists')

async function getEvents(options = {}) {
    const utcDate = new Date().toUTCString();
    if(!options.lang) {
        console.log(`${utcDate}: no lang parameter`)
        return false
    }
    if(!languageExists(options.lang)) {
        console.log(`${utcDate}: wrong lang parameter`)
        return false
    }
    if(!options.region) {
        return false
    }
    if(!regionExists(options.region)) {
        console.log(`${utcDate}: wrong region parameter`)
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
            console.log(`${utcDate}: no database record`)
            return false
        }


        const prevTime = millisecondsToSeconds(new Date(databaseRecord.updatedAt).getTime())
        const currentTime = millisecondsToSeconds(Date.now())
        const timePassed = didTimePassed(secondsBetweenUpdates, prevTime, currentTime)

        if(!timePassed) {
            console.log(`${utcDate}: time did not passed - last update ${currentTime - prevTime} seconds ago`)
            console.log(`${uri}`)
            return databaseRecord.data
        }
        if(timePassed) {
            console.log(`${utcDate}: ${currentTime - prevTime} seconds passed. Need an update.`)
            console.log(`${uri}`)
            return false
        }

    } catch (error) {
        console.log(error)
        console.log(`${uri}`)
        return false
    }
}

module.exports = getEvents