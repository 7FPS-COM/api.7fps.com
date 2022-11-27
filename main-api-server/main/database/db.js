const {Sequelize} = require('sequelize')

module.exports = new Sequelize(
    process.env.DB_USERS_NAME, // Database name
    process.env.DB_USERS_USER, // Username
    process.env.DB_USERS_PASSWORD, // Password
    {
        dialect: 'postgres',
        host: process.env.DB_USERS_HOST,
        port: process.env.DB_USERS_PORT,
        logging: false
    }
)