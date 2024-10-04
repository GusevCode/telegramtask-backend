const DB = require('./db.json')
const { saveToDatabase } = require('./utils');

const getAllClients = () => {
    return DB.clients;
}

const createNewClient = (newClient) => {
    const isAlreadyAdded = 
        DB.clients.findIndex(
            (client) => client.name === client.name
        ) > -1;
        if (isAlreadyAdded) {
            return;
        }
        DB.clients.push(newClient);
        saveToDatabase(DB);
        return newClient;
}

module.exports = {
    getAllClients,
    createNewClient,
};