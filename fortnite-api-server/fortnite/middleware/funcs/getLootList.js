const didTimePassed = require("../utils/didTimePassed");
const millisecondsToSeconds = require("../utils/millisecondsToSeconds");
const database = require('../../database/models/models')

async function getLootList() {
    const secondsBetweenUpdates = process.env.SECONDS_BETWEEN_UPDATES || 600

    try {
        const databaseRecord = await database.lootList.findOne({
            order: [ [ 'createdAt', 'DESC' ]],
        });

        if(!databaseRecord) {
            return false
        }

        const prevTime = millisecondsToSeconds(new Date(databaseRecord.updatedAt).getTime())
        const currentTime = millisecondsToSeconds(Date.now())
        const timePassed = didTimePassed(secondsBetweenUpdates, prevTime, currentTime)

        if(!timePassed) {
            return databaseRecord.loot
        }
        if(timePassed) {
            return false
        }

    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports = getLootList