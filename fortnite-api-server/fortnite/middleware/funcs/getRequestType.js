function getRequestType(uri) {
    const regex = {
        lootList : /https:\/\/fortniteapi\.io\/v1\/loot\/list\?lang=en/,
        events : /https:\/\/fortniteapi\.io\/v1\/events\/list\?lang=.*&region=.*/
    }

    if(uri.match(regex.lootList)) {
        return 'lootList'
    }

    if(uri.match(regex.events)) {
        return 'events'
    }

    return false
}

module.exports = getRequestType