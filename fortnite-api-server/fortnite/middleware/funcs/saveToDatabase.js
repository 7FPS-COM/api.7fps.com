const database = require('../../database/models/models')
const languageExists = require('../utils/languageExists')
const regionExists = require('../utils/regionExists')
const getRequestType = require('./getRequestType')

async function saveToDatabase(uri, data) {
    const requestType = getRequestType(uri)
    if(!requestType) {
        return false
    }

    if(requestType === 'lootList') {
        const lang = uri.match(/https:\/\/fortniteapi\.io\/v1\/loot\/list\?lang=(.*)/)[1]
        if(!languageExists(lang)) return false
        if(!data.result) return false

        try {
            await database.lootList.create({loot: data})
            return true
        } catch (error) {
            return false
        }
    }

    if(requestType === 'events') {
        const regexRes = uri.match(/https:\/\/fortniteapi\.io\/v1\/events\/list\?lang=(.*)&region=(.*)/)
        const [lang, region] = [regexRes[1], regexRes[2]]
        if(!languageExists(lang)) return false
        if(!regionExists(region)) return false

        if(data.result !== true) {
            return false
        }
        try {
            const databaseRecord = await database.events.findOne({
                where: {uri: uri}
            });

            if(!databaseRecord) {
                await database.events.create({uri: uri, data: data})
                return true
            }

            if(databaseRecord) {
                await database.events.update({data: data}, {where: {uri: uri}})
                return true
            }

           return false
        } catch (error) {
            return false
        }
    }

    return false
}

module.exports = saveToDatabase