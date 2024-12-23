const { v4: uuid } = require('uuid');
const Event = require('../database/Event');
const fs = require('node:fs');

const getAllEvents = async () => {
    const allEvents = await Event.getAllEvents();
    return allEvents;
};

const getOneEvent = async (eventId) => {
    const event = await Event.getOneEvent(eventId);
    return event;
}

const createNewEvent = async (newEvent) => {
    const date = new Date(newEvent.date);

    const eventToInsert = {
        id: uuid(),
        name: newEvent.name,
        type: newEvent.type,
        date: {  
            year: String(date.getFullYear()),
            month: String(date.getMonth() + 1),
            day: String(date.getDate()),
        },
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

const updateClient = async (eventId, clientId, changes) => {
    const updatedClient = await Event.updateClient(
        eventId, clientId, changes
    );
    return updatedClient;
}

const deleteOneEvent = async (eventId) => {
    await Event.deleteOneEvent(eventId);
}

const getAllClients = async (eventId) => {
    let clients = await Event.getAllClients(eventId);
    if (clients)
        clients = clients.sort((a, b) => a.fullname.localeCompare(b.fullname)); 
    return clients;
}

const addClient = async (eventId, client) => {
    const clients = await getAllClients(eventId);

    if (!clients) {
        return null;
    }

    let isExsits = false;
    clients.forEach(it => {
        if (it.fullname == client.fullname) {
            isExsits = true;
        }
    });
    
    if (!isExsits) {
        return await Event.addClient(eventId, client);
    } 

    return client;
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

const getClientsListFilePath = async (eventId) => {
    const event = await Event.getOneEvent(eventId);
    const clients = await getAllClients(eventId);

    if (event) {

        let content = "";
        if (clients) {
            clients.forEach((client) => {
                content += client.fullname + "\n";
            });
        }

        const customUUID = uuid();
        // const filename = `${event.name} (${event.date.year}:${event.date.month}:${event.date.day})`;
        const filename = `${event.name} (${event.date.year}.${event.date.month}.${event.date.day}) [${customUUID}]`;
        const filepath = `./clients_gen/${filename}.txt`;

        fs.writeFileSync(filepath, content);
        return filepath;
    } else {
        return null;
    }
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

    getClientsListFilePath,
    updateClient,
};