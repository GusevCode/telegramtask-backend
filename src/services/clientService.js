const { v4: uuid } = require('uuid');
const Client = require('../database/Client');

const getAllClients = () => {
    const allClients = Client.getAllClients();
    return allClients;
};

const getOneClient = (clientId) => {
    const client = Client.getOneClient(clientId);
    return client;
};

const createNewClient = (newClient) => {
    const clientToInsert = {
        id: uuid(),
        ...newClient,
    }
    
    const createdClient = Client.createNewClient(
        clientToInsert,
    );
    
    return createdClient;
};

const updateOneClient = (clientId, changes) => {
    const updatedClient = Client.updateOneClient(
        clientId,
        changes
    );
    return updatedClient;
};

const deleteOneClient = (clientId) => {
    Client.deleteOneClient(clientId);
};

module.exports = {
    getAllClients,
    getOneClient,
    createNewClient,
    updateOneClient,
    deleteOneClient,
};