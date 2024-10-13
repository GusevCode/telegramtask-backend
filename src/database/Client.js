const { DB_URL, DB_NAME } = require('./config');

const MongoClient = require('mongodb').MongoClient;
const mongoClient = new MongoClient(DB_URL);

const getAllClients = async () => {
    let result = [];
    try {
        await mongoClient.connect();
        const db = mongoClient.db(DB_NAME);
        const collection = db.collection('clients');

        result = await collection.find().toArray();

        result.forEach(client => {
            delete client["_id"];
        });
    } catch(err) {
        console.log(err);
    } finally {
        mongoClient.close();
    }

    return result;
}

const getOneClient = async (clientId) => {
    let result = {};

    try {
        await mongoClient.connect();
        const db = mongoClient.db(DB_NAME);
        const collection = db.collection('clients');

        result = (await collection.find({id: clientId}).toArray()).at(0);
        delete result["_id"];
    } catch (err) {
        console.log(err);
    } finally {
        mongoClient.close();
    }

    return result;
}

const createNewClient = async (newClient) => {
    const result = newClient;

    try {
        await mongoClient.connect();
        const db = mongoClient.db(DB_NAME);
        const collection = db.collection('clients');

        const isAlreadyAdded = (await collection.find({id: newClient.id}).toArray()).at(0);

        if (typeof isAlreadyAdded === "undefined") {
            const res = await collection.insertOne(newClient);
        }

    } catch (err) {
        console.log(err);
    } finally {
        mongoClient.close();
    }

    return result;
}

const updateOneClient = async (clientId, changes) => {
    const result = changes;

    try {
        await mongoClient.connect();
        const db = mongoClient.db(DB_NAME);
        const collection = db.collection('clients');

        const isAlready = (await collection.find({id: clientId}).toArray()).at(0);

        if (typeof isAlready !== "undefined") {
            const res = await collection.findOneAndUpdate({id: clientId}, { $set: changes });
        }

        result = (await collection.find({id: clientId}).toArray()).at(0);

    } catch (err) {
        console.log(err);
    } finally {
        mongoClient.close();
    }

    return result;
}

const deleteOneClient = async (clientId) => {
    try {
        await mongoClient.connect();
        const db = mongoClient.db(DB_NAME);
        const collection = db.collection('clients');

        const res = await collection.deleteOne({id: clientId});
    } catch (err) {
        console.log(err);
    } finally {
        mongoClient.close();
    }
}

module.exports = {
    getOneClient,
    getAllClients,
    createNewClient,
    updateOneClient,
    deleteOneClient,
};