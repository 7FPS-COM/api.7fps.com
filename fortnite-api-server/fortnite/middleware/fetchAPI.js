const fetch = require("node-fetch");
const getDataFromDatabase = require("./funcs/getDataFromDatabase");
const saveToDatabase = require("./funcs/saveToDatabase");

async function fetchAPI(uri, credentials, options = {}) {

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

        await saveToDatabase(uri, data)

        return data;
    } catch (error) {
        return false
    }
}

module.exports = fetchAPI