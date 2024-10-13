const { v4: uuid } = require('uuid');
const Client = require('../database/Client');

const getAllClients = async () => {
    const allClients = await Client.getAllClients();
    return allClients;
};

const getOneClient = async (clientId) => {
    const client = await Client.getOneClient(clientId);
    return client;
};

const createNewClient = async (newClient) => {
    const clientToInsert = {
        id: uuid(),
        ...newClient,
    }
    
    const createdClient = await Client.createNewClient(
        clientToInsert,
    );
    
    return createdClient;
};

const updateOneClient = async (clientId, changes) => {
    const updatedClient = await Client.updateOneClient(
        clientId,
        changes
    );
    return updatedClient;
};

const deleteOneClient = async (clientId) => {
    await Client.deleteOneClient(clientId);
};

module.exports = {
    getAllClients,
    getOneClient,
    createNewClient,
    updateOneClient,
    deleteOneClient,
};