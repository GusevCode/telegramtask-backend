const DB = require('./db.json');
const { saveToDatabase } = require('./utils');

const getAllEvents = () => {
    return DB.events;
}

const getOneEvent = (eventId) => {
    const event = DB.events.find(
        (event) => event.id === eventId
    );

    if (!event) {
        return;
    }

    return event;
}

const createNewEvent = (newEvent) => {
    const isAlreadyAdded = 
        DB.events.findIndex(
            (event) => event.id === newEvent.id
        ) > -1;

    if (isAlreadyAdded) {
        return;
    }

    DB.events.push(newEvent);
    saveToDatabase(DB);
    return newEvent;
}

const updateOneEvent = (eventId, changes) => {
    const indexForUpdate = DB.events.findIndex(
        (event) => event.id === eventId
    );

    if (indexForUpdate === -1) {
        return;
    }

    const updatedEvent = {
        ...DB.events[indexForUpdate],
        ...changes,
    }

    DB.events[indexForUpdate] = updatedEvent;
    saveToDatabase(DB);
    return updatedEvent;
}

const deleteOneEvent = (eventId) => {
    const indexForDeletion = DB.events.findIndex(
        (event) => event.id === eventId
    );

    if (indexForDeletion === -1) {
        return;
    }

    DB.events.splice(indexForDeletion, 1);
    saveToDatabase(DB);
}

const getAllClients = (eventId) => {
    const event = DB.events.find(
        (event) => event.id === eventId
    );

    if (!event) {
        return;
    }

    return event.clients;
}

const addClient = (eventId, client) => {
    const eventIdx = DB.events.findIndex(
        (event) => event.id === eventId
    );

    if (eventIdx === -1) {
        return;
    }

    DB.events[eventIdx].clients.push(client);
    saveToDatabase(DB);
    return client;
}

const getAllExpenses = (eventId) => {
    const eventIdx = DB.events.findIndex(
        (event) => event.id === eventId
    );

    if (eventIdx === -1) {
        return;
    }

    return DB.events[eventIdx].expenses;
}

const addExpense = (eventId, expense) => {
    const eventIdx = DB.events.findIndex(
        (event) => event.id === eventId
    );

    if (eventIdx === -1) {
        return;
    }

    DB.events[eventIdx].expenses.push(expense);
    saveToDatabase(DB);
    return expense;
}

const getOneExpense = (eventId, expenseId) => {
    const eventIdx = DB.events.findIndex (
        (event) => eventId === event.id,
    );

    if (eventIDx === -1) {
        return;
    }

    const expenseIdx = DB.events[eventIdx].expenses.findIndex(
        (expense) => expense.id == expenseId,
    )

    return DB.events[eventIdx].expenses[expenseIdx];
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
}