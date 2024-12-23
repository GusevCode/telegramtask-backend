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
        res.status(400).send();
        return;
    }
    const client = await clientService.getOneClient(clientId);
    res.send({ status: 'OK', data: client });
};

const createNewClient = async (req, res) => {
    const { body } = req;
    if (
        !body.fullname ||
        !body.date
    ) {
        res.status(400).send();
        return;
    }

    const newClient = {
        fullname: body.fullname.trim(),
        date: body.date.trim(),
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
        res.status(400).send();
        return;
    }

    const updatedClient = await clientService.updateOneClient(
        clientId,
        body,
    );

    res.send({ status: 'OK', data: updatedClient });
};

const deleteOneClient = async (req, res) => {
    const {
        params: { clientId },
    } = req;

    if (!clientId) {
        res.status(400).send();
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