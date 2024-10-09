const eventService = require('../services/eventService');

const getAllEvents = (req, res) => {
    const allEvents = eventService.getAllEvents();

    res.send({
        status: 'OK',
        data: allEvents,
    });
};

const getOneEvent = (req, res) => {
    const {
        params: {eventId}
    } = req;

    if (!eventId) {
        return;
    }

    const event = eventService.getOneEvent(eventId);
    res.send({ status: 'OK', data: event });
}

const createNewEvent = (req, res) => {
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

    const createdEvent = eventService.createNewEvent(
        newEvent
    );

    res.status(201).send({
        status: 'OK',
        data: createdEvent,
    });
}

const updateOneEvent = (req, res) => {
    const {
        body,
        params: { eventId }
    } = req;

    if (!eventId) {
        return;
    }

    const updatedEvent = eventService.updateOneEvent(
        eventId,
        body
    );

    res.send({ status: 'OK', data: updatedEvent });
}

const deleteOneEvent = (req, res) => {
    const {
        params: { eventId },
    } = req;

    if (!eventId) {
        return;
    }

    eventService.deleteOneEvent(eventId);
    res.status(204).send({ status: 'OK' });
}


const getAllClients = (req, res) => {
    const {
        params: { eventId },
    } = req;

    if (!eventId) {
        return;
    }

    const clients = eventService.getAllClients(eventId);
    res.send( {
        status: 'OK',
        data: clients,
    });
}

const addClient = (req, res) => {
    const {
        params: {eventId}
    } = req;

    if (!eventId) {
        return;
    }

    const { body } = req;

    if (
        !body.id
    ) {
        return;
    }

    const clientToAdd = {
        id: body.id,
    }

    const addedClient = eventService.addClient(
        eventId, clientToAdd
    );

    res.status(201).send({
        status: 'OK',
        data: addedClient,
    });
}

const getAllExpenses = (req, res) => {
    const {
        params: {eventId},
    } = req;

    if (!eventId) {
        return;
    }

    const expenses = eventService.getAllExpenses(eventId);
    res.send({
        status: 'No',
        data: expenses,
    });
}

const addExpense = (req, res) => {
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

    const addedExpense = eventService.addExpense(eventId, expenseToAdd);

    res.status(201).send({
        status: 'OK',
        data: addedExpense,
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