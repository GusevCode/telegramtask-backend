const clientService  = require('../services/clientService');

const getAllClients = async (req, res) => {
    const allClients = await clientService.getAllClients();

    res.send({ 
        status: 'OK',
        data: allClients,
     });
};

const getOneClient = async (req, res) => {
    const {
        params: {clientId},
    } = req;

    if (!clientId) {
        return;
    }
    const client = await clientService.getOneClient(clientId);
    res.send({ status: 'OK', data: client });
};

const createNewClient = async (req, res) => {
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

    const createdClient = await clientService.createNewClient(
        newClient
    );

    res.status(201).send({
        status: 'OK',
        data: createdClient,
    });
};

const updateOneClient = async (req, res) => {
    const {
        body,
        params: { clientId }
    } = req;

    if (!clientId) {
        return;
    }

    const updatedClient = await clientService.updateOneClient(
        clientId,
        body
    );

    res.send({ status: 'OK', data: updatedClient });
};

const deleteOneClient = async (req, res) => {
    const {
        params: { clientId },
    } = req;

    if (!clientId) {
        return;
    }

    await clientService.deleteOneClient(clientId);
    res.status(204).send({ status: 'OK' });
};

module.exports = {
    getAllClients,
    getOneClient,
    createNewClient,
    updateOneClient,
    deleteOneClient,
};