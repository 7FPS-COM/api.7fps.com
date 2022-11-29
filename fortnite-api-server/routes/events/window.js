const eventsWindow = require("../../fortnite/events/eventsWindow")

const window = async (req, res) => {
    if(!req.query.windowId) return res.json({result: false, message: 'windowId required'})

    const {windowId} = req.query

    const data = await eventsWindow(windowId)
    if(data === false) return res.json({result: false, error: 'FortniteAPI is not responding'})

    return res.json(data)
}

module.exports = window