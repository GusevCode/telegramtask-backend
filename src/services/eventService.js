const { v4: uuid } = require('uuid');
const Event = require('../database/Event')

const getAllEvents = () => {
    const allEvents = Event.getAllEvents();
    return allEvents;
};

const getOneEvent = (eventId) => {
    const event = Event.getOneEvent(eventId);
    return event;
}

const createNewEvent = (newEvent) => {
    const eventToInsert = {
        id: uuid(),
        ...newEvent,
    }

    const createdEvent = Event.createNewEvent(
        eventToInsert,
    );

    return createdEvent;
}

const updateOneEvent = (eventId, changes) => {
    const updatedEvent = Event.updateOneEvent(
        eventId, 
        changes
    );
    return updatedEvent;
}

const deleteOneEvent = (eventId) => {
    Event.deleteOneEvent(eventId);
}

const getAllClients = (eventId) => {
    const clients = Event.getAllClients(eventId);
    return clients;
}

const addClient = (eventId, client) => {
    return Event.addClient(eventId, client);
}

const getAllExpenses = (eventId) => {
    return Event.getAllExpenses(eventId);
}

const addExpense = (eventId, expenseToAdd) => {
    return Event.addExpense(eventId, expenseToAdd);
}

const getOneExpense = (eventId, expenseId) => {
    return Event.getOneExpense(eventId, expenseId);
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