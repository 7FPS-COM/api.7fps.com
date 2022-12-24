const sequelize = require('./db.js')
require('./models/models.js')

const start = async () => {
    try {
        // await sequelize.drop()
        await sequelize.authenticate()
        await sequelize.sync()
    } catch(error) {
        console.log(error)
    }
}

start()