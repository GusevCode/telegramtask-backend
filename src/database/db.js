const { DB_URL, DB_NAME } = require('./config');

const MongoClient = require('mongodb').MongoClient;

let mongoClient;

const getDb = async () => {
    if (!mongoClient) {
        mongoClient = new MongoClient(DB_URL);
        await mongoClient.connect();
        console.log('Connected to MongoDB');
        db = mongoClient.db(DB_NAME);
    }
    return db;
};

const closeConnection = async () => {
    if (mongoClient ) {
        await mongoClient.close();
        mongoClient = null;
        db = null;
        console.log('MongoDB connection closed');
    }
};

process.on('SIGINT', closeConnection);

module.exports = { getDb, closeConnection };