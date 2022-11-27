function didTimePassed(timeBetween, prevTime, currentTime) {
    const difference = currentTime - prevTime
    
    if(difference < timeBetween) {
        return false
    } else {
        return true
    }
}

module.exports = didTimePassed