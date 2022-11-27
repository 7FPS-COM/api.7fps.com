const lootList = require("../../fortnite/loot/lootList")


const list = async (req, res) => {
    const data = await lootList()

    if(req.query.enabled === 'true') {
        data.weapons = data.weapons.filter(item => item.enabled)
    }

    if(req.query.enabled === 'false') {
        data.weapons = data.weapons.filter(item => !item.enabled)
    }

    return res.json(data)
}

module.exports = list