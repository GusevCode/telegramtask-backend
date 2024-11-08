const { getDb } = require('./db');

const getDeposit = async(type, year, month) => {
    let result = {};

    try {
        const db = await getDb();
        const collection = db.collection('deposits');

        result = (await collection.find({type: type, year: year, month: month}).toArray()).at(0);
    } catch (err) {
        console.log(err);
    }

    return result;
};

const createDeposit = async (type, deposit) => {
    const result = deposit;

    try {
        const db = await getDb();
        const collection = db.collection('deposits');

        const isAlreadyAdded = (await collection.find({type: type, year: deposit.year, month: deposit.month}).toArray()).at(0);

        if (typeof isAlreadyAdded === "undefined") {
            const res = await collection.insertOne(deposit);
        } else {
            await collection.findOneAndUpdate({type: type, year: deposit.year, month: deposit.month}, { $set: { ...deposit } });
        }
    } catch (err) {
        console.log(err);
    }

    return result;
};

const updateDeposit = async (type, year, month, changes) => {
    let result = changes;

    try {
        const db = await getDb();
        const collection = db.collection('deposits');

        const isAlready = (await collection.find({type: type, year: year, month: month}).toArray()).at(0);

        if (typeof isAlready !== "undefined") {
            const res = await collection.findOneAndUpdate({type: type, year: year, month: month}, { $set: changes });
        }

        result = (await collection.find({type: type, year: year, month: month}).toArray()).at(0);
    } catch (err) {
        console.log(err);
    }

    return result;
};

const deleteDeposit = async (type, year, month) => {
    try {
        const db = await getDb();
        const collection = db.collection('deposits');

        const res = await collection.deleteOne({type: type, year: year, month: month});
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getDeposit,
    createDeposit,
    updateDeposit,
    deleteDeposit,
};