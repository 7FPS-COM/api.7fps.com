const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const lootList = sequelize.define('lootList', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    loot: {type: DataTypes.JSON}
})

const lootHistory = sequelize.define('lootHistory', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    before: {type: DataTypes.JSON},
    after: {type: DataTypes.JSON}
})

const events = sequelize.define('events', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    uri: {type: DataTypes.STRING, unique: true},
    data: {type: DataTypes.JSON}
})

const windows = sequelize.define('windows', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    windowId: {type: DataTypes.STRING, unique: true},
    data: {type: DataTypes.JSON, allowNull: true}
})


module.exports = {
    lootList,
    lootHistory,
    events,
    windows
}