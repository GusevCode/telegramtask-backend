const eventService = require('../services/eventService');
const fs = require('fs');

const getAllEvents = async (req, res) => {
    const allEvents = await eventService.getAllEvents();

    res.send({
        status: 'OK',
        data: allEvents,
    });
};

const getOneEvent = async (req, res) => {
    const {
        params: {eventId}
    } = req;

    if (!eventId) {
        res.status(400).send();
        return;
    }

    const event = await eventService.getOneEvent(eventId);
    res.send({ status: 'OK', data: event });
}

const createNewEvent = async (req, res) => {
    const { body } = req;
    if (
        !body.name ||
        !body.date ||
        !body.type
    ) {
        res.status(400).send();
        return;
    }

    const newEvent = {
        name: body.name.trim(),
        date: body.date.trim(),
        type: body.type.trim(),
    }

    const createdEvent = await eventService.createNewEvent(
        newEvent
    );

    res.status(201).send({
        status: 'OK',
        data: createdEvent,
    });
}

const updateOneEvent = async (req, res) => {
    const {
        body,
        params: { eventId }
    } = req;

    if (!eventId) {
        res.status(400).send();
        return;
    }

    const updatedEvent = await eventService.updateOneEvent(
        eventId,
        body
    );

    res.send({ status: 'OK', data: updatedEvent });
}

const deleteOneEvent = async (req, res) => {
    const {
        params: { eventId },
    } = req;

    if (!eventId) {
        res.status(400).send();
        return;
    }

    await eventService.deleteOneEvent(eventId);
    res.status(204).send({ status: 'OK' });
}


const getAllClients = async (req, res) => {
    const {
        params: { eventId },
    } = req;

    if (!eventId) {
        res.status(400).send();
        return;
    }

    const clients = await eventService.getAllClients(eventId);
    res.send({
        status: 'OK',
        data: clients,
    });
}

const addClient = async (req, res) => {
    const {
        params: {eventId}
    } = req;

    if (!eventId) {
        res.status(400).send();
        return;
    }

    const { body } = req;

    if (
        !body.fullname 
    ) {
        res.status(400).send();
        return;
    }

    let clientToAdd = {
        fullname: body.fullname.trim(),
        amount_of_payment: "0",
        discount_percent: "0",
        discount_description: "",
    }

    if (body.discount_percent && body.discount_description) {
        clientToAdd.discount_percent = body.discount_percent;
        clientToAdd.discount_description = body.discount_description;
    }

    if (body.amount_of_payment) {
        clientToAdd.amount_of_payment = body.amount_of_payment.trim();
    }

    const addedClient = await eventService.addClient(
        eventId, clientToAdd
    );

    res.status(201).send({
        status: 'OK',
        data: addedClient,
    });
}

const updateClient = async (req, res) => {
    const {
        body,
        params: {eventId, clientId},
    } = req;

    if (!eventId || !clientId) {
        res.status(400).send();
        return;
    }

    const updatedClient = await eventService.updateClient(
        eventId,
        clientId,
        body
    );

    res.send({ status: 'OK', data: updatedClient });
}

const getAllExpenses = async (req, res) => {
    const {
        params: {eventId},
    } = req;

    if (!eventId) {
        res.status(400).send();
        return;
    }

    const expenses = await eventService.getAllExpenses(eventId);
    res.send({
        status: 'OK',
        data: expenses,
    });
}

const addExpense = async (req, res) => {
    const {
        params: { eventId },
    } = req;

    if (!eventId) {
        res.status(400).send();
        return;
    }

    const { body } = req;

    if (
        !body.date ||
        !body.name ||
        !body.sum
    ) {
        res.status(400).send();
        return;
    }

    const expenseToAdd = {
        name: body.name.trim(),
        date: body.date.trim(),
        sum: body.sum.trim()        
    }

    const addedExpense = await eventService.addExpense(eventId, expenseToAdd);

    res.status(201).send({
        status: 'OK',
        data: addedExpense,
    });
}

const getOneExpense = async (req, res) => {
    const {
        params: { eventId, expenseId },
    } = req;

    if (!eventId || !expenseId) {
        res.status(400).send();
        return;
    }

    const expense = await eventService.getOneExpense(eventId, expenseId);
    res.status(201).send({
        status: 'OK',
        data: expense,
    });
}

const downloadListOfClientsByEventId = async (req, res) => {
    const {
        params: { eventId },
    } = req;    

    if (!eventId) {
        res.status(400).send();
        return;
    }

    const filePath = await eventService.getClientsListFilePath(eventId);
    res.download(filePath, (err) => {
        if (err) {
            console.log(err);
        } else {
            fs.unlink(filePath, (q) => {
                if (q) {
                    console.log(q);
                }
                res.status(200).send();
            })
        }
    });
}

module.exports = {
    getAllEvents,
    getOneEvent,
    createNewEvent,
    updateOneEvent,
    deleteOneEvent,

    getAllClients,
    addClient,
    
    getAllExpenses,
    addExpense,

    downloadListOfClientsByEventId,
    updateClient,
};