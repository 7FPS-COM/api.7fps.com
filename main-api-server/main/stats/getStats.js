const {users} = require('../database/models/models')

async function getStats() {
    try {
        const data = await users.findAll()
        
        return {
            totalUsers: getCountOfRegisteredUsers(data),
            todayUsers: getCountOfRegisteredUsersToday(data)
        }
    } catch (error) {
        return null
    }
}

function getCountOfRegisteredUsers(data) {
    return data.length
}

function getCountOfRegisteredUsersToday(data) {
    return data.filter(e => {
        const today = new Date()
        const regDay = new Date(e.createdAt)
        return today === regDay
    }).length
}

function getDate(dateObj) {
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    return year + "/" + month + "/" + day;
}

module.exports = getStats