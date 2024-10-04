const { v4: uuid } = require('uuid');
const Client = require('../database/Client');

const getAllClients = () => {
    const allClients = Client.getAllClients();

    return allClients;
};

const getOneClient = () => {
    return;
};

const createNewClient = () => {
    const clientToInsert = {
        ...createNewClient,
        id: uuid(),
    }
    
    const createdClient = Client.createNewClient(
        clientToInsert,
    );
    
    return createdClient;
};

const updateOneClient = () => {
    return;
};

const deleteOneClient = () => {
    return;
};

module.exports = {
    getAllClients,
    getOneClient,
    createNewClient,
    updateOneClient,
    deleteOneClient,
};