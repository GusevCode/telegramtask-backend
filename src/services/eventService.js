const { v4: uuid } = require('uuid');
const Event = require('../database/Event')

const getAllEvents = async () => {
    const allEvents = await Event.getAllEvents();
    return allEvents;
};

const getOneEvent = async (eventId) => {
    const event = await Event.getOneEvent(eventId);
    return event;
}

const createNewEvent = async (newEvent) => {
    const eventToInsert = {
        id: uuid(),
        ...newEvent,
        clients: [],
        expenses: []
    }

    const createdEvent = await Event.createNewEvent(
        eventToInsert,
    );

    return createdEvent;
}

const updateOneEvent = async (eventId, changes) => {
    const updatedEvent = await Event.updateOneEvent(
        eventId, 
        changes
    );
    return updatedEvent;
}

const deleteOneEvent = async (eventId) => {
    await Event.deleteOneEvent(eventId);
}

const getAllClients = async (eventId) => {
    const clients = await Event.getAllClients(eventId);
    return clients;
}

const addClient = async (eventId, client) => {
    return await Event.addClient(eventId, client);
}

const getAllExpenses = async (eventId) => {
    return await Event.getAllExpenses(eventId);
}

const addExpense = async (eventId, newExpense) => {

    const expenseToAdd = {
        id: uuid(),
        ...newExpense,
    }

    return await Event.addExpense(eventId, expenseToAdd);
}

const getOneExpense = async (eventId, expenseId) => {
    return await Event.getOneExpense(eventId, expenseId);
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