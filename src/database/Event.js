const { DB_URL, DB_NAME } = require('./config');

const MongoClient = require('mongodb').MongoClient;
const mongoClient = new MongoClient(DB_URL);

const getAllEvents = async () => {
    let result = [];
    try {
        await mongoClient.connect();
        const db = mongoClient.db(DB_NAME);
        const collection = db.collection('events');

        result = await collection.find().toArray();

        result.forEach(event => {
            delete event["_id"];
        });

    } catch(err) {
        console.log(err);
    } finally {
        mongoClient.close();
    }

    return result;
}

const getOneEvent = async (eventId) => {
    let result = {};

    try {
        await mongoClient.connect();
        const db = mongoClient.db(DB_NAME);
        const collection = db.collection('events');

        result = (await collection.find({id: eventId}).toArray()).at(0);
        delete result["_id"];
    } catch (err) {
        console.log(err);
    } finally {
        mongoClient.close();
    }

    return result;
}

const createNewEvent = async (newEvent) => {
    const result = newEvent;

    try {
        await mongoClient.connect();
        const db = mongoClient.db(DB_NAME);
        const collection = db.collection('events');

        const isAlreadyAdded = (await collection.find({id: newEvent.id}).toArray()).at(0);

        if (typeof isAlreadyAdded === "undefined") {
            const res = await collection.insertOne(newEvent);
        }

        delete result["_id"];

    } catch (err) {
        console.log(err);
    } finally {
        mongoClient.close();
    }

    return result;
}

const updateOneEvent = async (eventId, changes) => {
    const result = changes;

    try {
        await mongoClient.connect();
        const db = mongoClient.db(DB_NAME);
        const collection = db.collection('events');

        const isAlreadyAdded = (await collection.find({id: eventId}).toArray()).at(0);

        if (typeof isAlreadyAdded !== "undefined") {
            const res = await collection.findOneAndUpdate({id: eventId}, { $set: changes });
        }

        result = (await collection.find({id: eventId}).toArray()).at(0);

    } catch (err) {
        console.log(err);
    } finally {
        mongoClient.close();
    }

    return result;
}

const deleteOneEvent = async (eventId) => {
    try {
        await mongoClient.connect();
        const db = mongoClient.db(DB_NAME);
        const collection = db.collection('events');

        const res = await collection.deleteOne({id: eventId});
    } catch (err) {
        console.log(err);
    } finally {
        mongoClient.close();
    }
}

const getAllClients = async (eventId) => {
    let result = [];

    try {
        await mongoClient.connect();
        const db = mongoClient.db(DB_NAME);
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
    } finally {
        mongoClient.close();
    }

    return result;
}

const addClient = async (eventId, client) => { 
    let result = client;

    try {
        await mongoClient.connect();
        const db = mongoClient.db(DB_NAME);
        const collection = db.collection('events');
        
        const idToInsert = client.id;
        const res = collection.findOneAndUpdate({id: eventId}, {$push: {clients: {id: idToInsert}}});
    } catch (err) {
        console.log(err);
    } finally {
        mongoClient.close();
    }

    return result;
}

const getAllExpenses = async (eventId) => {
    let result = [];

    try {
        await mongoClient.connect();
        const db = mongoClient.db(DB_NAME);
        const collection = db.collection('events');

        const res = (await collection.find({id: eventId}).toArray()).at(0);
        delete res["_id"];

        return res.expenses;

    } catch (err) {
        console.log(err);
    } finally {
        mongoClient.close();
    }

    return result;
}

const addExpense = async (eventId, expense) => {
    let result = expense;

    try {
        await mongoClient.connect();
        const db = mongoClient.db(DB_NAME);
        const collection = db.collection('events');
        
        console.log(expense);

        const res = collection.findOneAndUpdate({id: eventId}, {$push: {expenses: {...expense}}})
    } catch (err) {
        console.log(err);
    } finally {
        mongoClient.close();
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
}