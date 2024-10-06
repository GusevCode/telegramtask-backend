const DB = require('./db.json')
const { saveToDatabase } = require('./utils');

const getAllClients = () => {
    return DB.clients;
}

const getOneClient = (clientId) => {
    const client = DB.clients.find(
        (client) => client.id === clientId
    );

    if (!client) {
        return;
    }

    return client;
}

const createNewClient = (newClient) => {
    const isAlreadyAdded = 
        DB.clients.findIndex(
            (client) => client.id === newClient.id
        ) > -1;

    if (isAlreadyAdded) {
        return;
    }

    DB.clients.push(newClient);
    saveToDatabase(DB);
    return newClient;
}

const updateOneClient = (clientId, changes) => {
    const indexForUpdate = DB.clients.findIndex(
        (client) => client.id === clientId
    );

    if (indexForUpdate === -1) {
        return;
    }

    const updatedClient = {
        ...DB.clients[indexForUpdate],
        ...changes,
    }

    DB.clients[indexForUpdate] = updatedClient;
    saveToDatabase(DB);
    return updatedClient;
}

const deleteOneClient = (clientId) => {
    const indexForDeletion = DB.clients.findIndex(
        (client) => client.id === clientId
    );

    if (indexForDeletion === -1) {
        return;
    }

    DB.clients.splice(indexForDeletion, 1);
    saveToDatabase(DB);
}

module.exports = {
    getOneClient,
    getAllClients,
    createNewClient,
    updateOneClient,
    deleteOneClient,
};