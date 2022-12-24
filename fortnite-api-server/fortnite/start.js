const sequelize = require('./database/db.js')
require('./database/models/models.js')

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
    } catch(error) {
        console.log(error)
    }
}

start()