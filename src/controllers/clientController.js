const clientService  = require('../services/clientService');

const getAllClients = (req, res) => {
    const allClients = clientService.getAllClients();

    res.send({ 
        status: 'OK',
        data: allClients,
     });
};

const getOneClient = (req, res) => {
    const {
        params: {clientId},
    } = req;

    if (!clientId) {
        return;
    }
    const client = clientService.getOneClient(clientId);
    res.send({ status: 'OK', data: client });
};

const createNewClient = (req, res) => {
    const { body } = req;
    if (
        !body.name ||
        !body.surname || 
        !body.date ||
        !body.deposit
    ) {
        return;
    }

    const newClient = {
        name: body.name,
        surname: body.surname,
        date: body.date,
        deposit: body.deposit,
    }

    const createdClient = clientService.createNewClient(
        newClient
    );

    res.status(201).send({
        status: 'OK',
        data: createdClient,
    });
};

const updateOneClient = (req, res) => {
    const {
        body,
        params: { clientId }
    } = req;

    if (!clientId) {
        return;
    }

    const updatedClient = clientService.updateOneClient(
        clientId,
        body
    );

    res.send({ status: 'OK', data: updatedClient });
};

const deleteOneClient = (req, res) => {
    const {
        params: { clientId },
    } = req;

    if (!clientId) {
        return;
    }

    clientService.deleteOneClient(clientId);
    res.status(204).send({ status: 'OK' });
};

module.exports = {
    getAllClients,
    getOneClient,
    createNewClient,
    updateOneClient,
    deleteOneClient,
};