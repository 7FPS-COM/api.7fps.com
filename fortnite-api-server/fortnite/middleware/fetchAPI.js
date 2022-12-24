const fetch = require("node-fetch");
const getDataFromDatabase = require("./funcs/getDataFromDatabase");
const saveToDatabase = require("./funcs/saveToDatabase");

async function fetchAPI(uri, credentials, options = {}) {
    const utcDate = new Date().toUTCString();

    const dataFromDatabase = await getDataFromDatabase(uri, options)
    if(dataFromDatabase !== false) {
        return dataFromDatabase
    }

    try {
        const response = await fetch(uri, {
            method: "GET",
            headers: {
                Authorization: `${credentials}`,
            },
        });
    
        const data = await response.json();
        if(!data) {
            console.log(`${utcDate}: Fortnite API does not responding.`)
        }

        await saveToDatabase(uri, data)
        console.log(`${utcDate}: ${uri} has been saved to database.`)

        return data;
    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports = fetchAPI