const eventList = require("../../fortnite/events/eventList")

const list = async (req, res) => {
    if(!req.query.lang || !req.query.region) return res.json({result: false, message: 'lang and region are required'})

    const {lang, region} = req.query

    const data = await eventList(lang, region)
    if(data === false) return res.json({result: false, error: 'FortniteAPI is not responding'})

    if(req.query.last !== undefined) {
        let last = 21

        last = isNaN(req.query.last) ? last : req.query.last

        data.events = data.events.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.endTime) - new Date(a.endTime);
          });

        
        if(data.events.length >= last)
        data.events = data.events.slice(0, last)
    }

    if(req.query.upcomingEvents == 'true') {
        data.events = data.events.filter(item => new Date(item.endTime) > new Date())
    }

    return res.json(data)
}

module.exports = list