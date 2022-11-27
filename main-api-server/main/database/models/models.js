const sequelize = require('../db')
const {DataTypes} = require('sequelize')

// const empty = sequelize.define('lootList', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
// })

const users = sequelize.define('users', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    discord_id: {type: DataTypes.STRING(64), unique: true},
    discord_username: {type: DataTypes.STRING},
    discord_discriminator: {type: DataTypes.STRING},
    discord_avatar: {type: DataTypes.STRING},
    ban_until: {type: DataTypes.INTEGER, defaultValue: 0},
    user_role: {type: DataTypes.INTEGER, defaultValue: 1},
})

const access_tokens = sequelize.define('access_tokens', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    discord_id: {type: DataTypes.STRING(64)},
    token: {type: DataTypes.STRING},
    ip: {type: DataTypes.STRING},
    user_agent: {type: DataTypes.STRING},
})

const discord_tokens = sequelize.define('discord_tokens', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    discord_id: {type: DataTypes.STRING(64),},
    access_token: {type: DataTypes.STRING},
    refresh_token: {type: DataTypes.STRING},
    token_type: {type: DataTypes.STRING},
})

const notes = sequelize.define('notes', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    discord_id: {type: DataTypes.STRING(64),},
    title: {type: DataTypes.STRING(128), defaultValue: ''},
    content: {type: DataTypes.TEXT, defaultValue: ''},
    note_id: {type: DataTypes.STRING, unique: true},
    is_share: {type: DataTypes.BOOLEAN, defaultValue: false},
})

const notes_user_settings = sequelize.define('notes_user_settings', {
    id: {type: DataTypes.INTEGER, autoIncrement: true},
    discord_id: {type: DataTypes.STRING(64), primaryKey: true,},
    settings: {type: DataTypes.JSON, defaultValue: null},
    is_public_discord: {type: DataTypes.BOOLEAN, defaultValue: false}
})


// users.hasMany(discord_tokens, { 
//     onDelete: 'cascade',
//     hooks: true, 
//   })
// discord_tokens.belongsTo(users)

// users.hasMany(access_tokens, { 
//     onDelete: 'cascade',
//     hooks: true, 
//   })
// access_tokens.belongsTo(users)


module.exports = {
    users,
    access_tokens,
    discord_tokens,
    notes,
    notes_user_settings,
}