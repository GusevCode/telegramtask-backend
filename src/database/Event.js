const { getDb } = require('./db');
const { v4: uuid } = require('uuid');

const Client = require('./Client');

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

const updateClient = async (eventId, clientId, changes) => {
    const result = changes;

    try {
        const db = await getDb();
        const collection = db.collection('events');
        

        // Выполняем запрос на обновление
        let result = (await collection.find(
            {
                id: eventId,
            }
        ).toArray()).at(0);

        if (typeof result !== "undefined") {
            let flag = 0;

            result.clients.forEach((client) => {
                if (client.id == clientId) {
                    flag = 1;
                    client.amount_of_payment = changes.amount_of_payment;
                }
            });

            if (flag > 0) {
                let res = (await collection.findOneAndUpdate(
                    {id: eventId},
                    {$set: result}
                ));
            }

        }

        
        console.log(result);

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
        
        if (!res)
        {
            return null;
        }

        res.clients.forEach(client => {
            result.push({
                ...client,
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

        const foundClient = await Client.getClientByFullname(client.fullname);

        if (typeof foundClient === 'undefined') {
            const date = new Date();

            const clientToInsert = {
                id: uuid(),
                fullname: client.fullname,
                amount_of_payment: client.amount_of_payment,
                discount_percent: client.discount_percent,
                discount_description: client.discount_description,
                year: String(date.getFullYear()),
                month: String(date.getMonth() + 1),
                day: String(date.getDate()),
                isNew: true,
            }

            const clientToClientDB = {
                id: clientToInsert.id,
                fullname: client.fullname,
                year: String(date.getFullYear()),
                month: String(date.getMonth() + 1),
                day: String(date.getDate()),
            }

            await Client.createNewClient(clientToClientDB);
            const res = await collection.findOneAndUpdate({id: eventId}, {$push: {clients: {...clientToInsert}}});
        } else {
            const date = new Date();

            const clientToInsert = {
                id: foundClient.id,
                fullname: foundClient.fullname,
                amount_of_payment: client.amount_of_payment,
                discount_percent: client.discount_percent,
                discount_description: client.discount_description,
                year: String(date.getFullYear()),
                month: String(date.getMonth() + 1),
                day: String(date.getDate()),
                isNew: false,
            }

            const res = await collection.findOneAndUpdate({id: eventId}, {$push: {clients: {...clientToInsert}}});
        }
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
    
    updateClient,
}