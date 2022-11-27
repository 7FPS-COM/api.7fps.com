function regionExists(region) {
    return ["EU", "NAE", "NAW", "ASIA", "ME", "BR", "OCE"].includes(region)
}

module.exports = regionExists