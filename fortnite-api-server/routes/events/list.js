const eventList = require("../../fortnite/events/eventList")

const list = async (req, res) => {
    if(!req.query.lang || !req.query.region) return res.json({result: false, message: 'lang and region are required'})

    const {lang, region} = req.query

    const data = await eventList(lang, region)
    if(data === false) return res.json({result: false, error: 'FortniteAPI is not responding'})

    if(req.query.upcomingEvents == 'true') {
        data.events = data.events.filter(item => new Date(item.endTime) > new Date())
    }

    return res.json(data)
}

module.exports = list