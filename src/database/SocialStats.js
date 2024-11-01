const { getDb } = require('./db');

const getAllStatsByYearAndMonth = async (socnet, yearNumber, monthNumber) => {
    let result = [];

    try {
        const db = await getDb();
        const collection = db.collection(`${socnet}_stats`);
        
        result = await collection.find({year: yearNumber, month: monthNumber}).toArray();
        
        result.forEach(stat => {
            delete stat["_id"];
        });
    } catch(err) {
        console.log(err);
    }

    return result;
};

const createNewStat = async (socnet, stat) => {
    const result = stat;

    try {
        const db = await getDb();
        const collection = db.collection(`${socnet}_stats`);

        const isAlreadyAdded = (await collection.find({id: stat.id}).toArray()).at(0);

        if (typeof isAlreadyAdded === "undefined") {
            const res = await collection.insertOne(stat);
        }

    } catch (err) {
        console.log(err);
    }

    return result;
};

const updateStat = async (socnet, id, changes) => {
    let result = changes;

    try {
        const db = await getDb();
        const collection = db.collection(`${socnet}_stats`);

        const isAlready = (await collection.find({id: id}).toArray()).at(0);

        if (typeof isAlready !== "undefined") {
            const res = await collection.findOneAndUpdate({id: id}, { $set: changes });
        }

        result = (await collection.find({id: id}).toArray()).at(0);

    } catch (err) {
        console.log(err);
    }

    return result;
};

const deleteStat = async (socnet, id) => {
    try {
        const db = await getDb();
        const collection = db.collection(`${socnet}_stats`);

        const res = await collection.deleteOne({id: id});
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    getAllStatsByYearAndMonth,
    createNewStat,
    updateStat,
    deleteStat,
};