const sequelize = require('./db')
require('./models/models')

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