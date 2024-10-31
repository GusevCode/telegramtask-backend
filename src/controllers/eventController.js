const eventService = require('../services/eventService');

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
        return;
    }

    const event = await eventService.getOneEvent(eventId);
    res.send({ status: 'OK', data: event });
}

const createNewEvent = async (req, res) => {
    const { body } = req;
    if (
        !body.name ||
        !body.date
    ) {
        return;
    }

    const newEvent = {
        name: body.name,
        date: body.date,
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
        return;
    }

    const { body } = req;

    if (
        !body.id ||
        !body.deposit 
    ) {
        return;
    }

    const clientToAdd = {
        id: body.id,
        deposit: body.deposit,
    }

    const addedClient = await eventService.addClient(
        eventId, clientToAdd
    );

    res.status(201).send({
        status: 'OK',
        data: addedClient,
    });
}

const getAllExpenses = async (req, res) => {
    const {
        params: {eventId},
    } = req;

    if (!eventId) {
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
        return;
    }

    const { body } = req;

    if (
        !body.date ||
        !body.name ||
        !body.sum
    ) {
        return;
    }

    const expenseToAdd = {
        name: body.name,
        date: body.date,
        sum: body.sum        
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
        return;
    }

    const expense = await eventService.getOneExpense(eventId, expenseId);
    res.status(201).send({
        status: 'OK',
        data: expense,
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
};