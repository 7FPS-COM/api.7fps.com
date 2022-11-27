const sequelize = require('./database/db')
require('./database/models/models')

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
    } catch(error) {
        console.log(error)
    }
}

start()