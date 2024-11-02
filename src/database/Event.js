const { getDb } = require('./db');

const getAllEvents = async () => {
    let result = [];
    try {
        const db = await getDb();
        const collection = db.collection('events');

        result = await collection.find().toArray();

        result.forEach(event => {
            delete event["_id"];
        });

    } catch(err) {
        console.log(err);
    }

    return result;
}

const getOneEvent = async (eventId) => {
    let result = {};

    try {
        const db = await getDb();
        const collection = db.collection('events');

        result = (await collection.find({id: eventId}).toArray()).at(0);
        delete result["_id"];
    } catch (err) {
        console.log(err);
    }

    return result;
}

const getAllEventsByYearAndMonth = async (year, month) => {
    let result = {};
    
    try {
        const db = await getDb();
        const collection = db.collection('events');

        result = (await collection.find({"date.year": year, "date.month": month}).toArray());
    } catch (err) {
        console.log(err);
    }

    return result;
}

const createNewEvent = async (newEvent) => {
    const result = newEvent;

    try {
        const db = await getDb();
        const collection = db.collection('events');

        const isAlreadyAdded = (await collection.find({id: newEvent.id}).toArray()).at(0);

        if (typeof isAlreadyAdded === "undefined") {
            const res = await collection.insertOne(newEvent);
        }

        delete result["_id"];

    } catch (err) {
        console.log(err);
    }

    return result;
}

const updateOneEvent = async (eventId, changes) => {
    const result = changes;

    try {
        const db = await getDb();
        const collection = db.collection('events');

        const isAlreadyAdded = (await collection.find({id: eventId}).toArray()).at(0);

        if (typeof isAlreadyAdded !== "undefined") {
            const res = await collection.findOneAndUpdate({id: eventId}, { $set: changes });
        }

        result = (await collection.find({id: eventId}).toArray()).at(0);

    } catch (err) {
        console.log(err);
    }

    return result;
}

const deleteOneEvent = async (eventId) => {
    try {
        const db = await getDb();
        const collection = db.collection('events');

        const res = await collection.deleteOne({id: eventId});
    } catch (err) {
        console.log(err);
    }
}

const getAllClients = async (eventId) => {
    let result = [];

    try {
        const db = await getDb();
        const collection = db.collection('events');

        const res = (await collection.find({id: eventId}).toArray()).at(0);
        delete res["_id"];

        res.clients.forEach(client => {
            result.push({
                id: client,
            });
        });

    } catch (err) {
        console.log(err);
    }

    return result;
}

const addClient = async (eventId, client) => { 
    let result = client;

    try {
        const db = await getDb();
        const collection = db.collection('events');
        
        const res = await collection.findOneAndUpdate({id: eventId}, {$push: {clients: {id: client.id, deposit: client.deposit, isNew: client.isNew}}});
    } catch (err) {
        console.log(err);
    }

    return result;
}

const getAllExpenses = async (eventId) => {
    let result = [];

    try {
        const db = await getDb();
        const collection = db.collection('events');

        const res = (await collection.find({id: eventId}).toArray()).at(0);
        delete res["_id"];

        return res.expenses;

    } catch (err) {
        console.log(err);
    }

    return result;
}

const addExpense = async (eventId, expense) => {
    let result = expense;

    try {
        const db = await getDb();
        const collection = db.collection('events');
        
        console.log(expense);

        const res = collection.findOneAndUpdate({id: eventId}, {$push: {expenses: {...expense}}})
    } catch (err) {
        console.log(err);
    }

    return result;
}

const getOneExpense = (eventId, expenseId) => {
    console.log('Not yet implemented');
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

    getAllEventsByYearAndMonth,
}