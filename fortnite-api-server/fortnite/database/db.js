const {Sequelize} = require('sequelize')

module.exports = new Sequelize(
    process.env.DB_FORTNITE_NAME, // Database name
    process.env.DB_FORTNITE_USER, // Username
    process.env.DB_FORTNITE_PASSWORD, // Password
    {
        dialect: 'postgres',
        host: process.env.DB_FORTNITE_HOST,
        port: process.env.DB_FORTNITE_PORT,
        logging: false
    }
)