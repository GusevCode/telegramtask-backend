const clientService  = require('../services/clientService');

const getAllClients = (req, res) => {
    const allClients = clientService.getAllClients();

    res.send({ 
        status: 'OK',
        data: allClients,
     });
};

const getOneClient = (req, res) => {
    const client  = clientService.getOneClient();

    res.send('Get client by id');
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
    const updatedClient = clientService.updateOneClient();

    res.send('Update client');
};

const deleteOneClient = (req, res) => {
    const deletedClient = clientService.deleteOneClient();

    res.send('Delete client');
};

module.exports = {
    getAllClients,
    getOneClient,
    createNewClient,
    updateOneClient,
    deleteOneClient,
};