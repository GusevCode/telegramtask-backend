const { getDb } = require('./db');

const getTax = async(year, month) => {
    let result = {};

    try {
        const db = await getDb();
        const collection = db.collection('taxes');

        result = (await collection.find({year: year, month: month}).toArray()).at(0);
    } catch (err) {
        console.log(err);
    }
    
    return result;
}

const createTax = async (tax) => {
    const result = tax;

    try {
        const db = await getDb();
        const collection = db.collection('taxes');

        const isAlreadyAdded = (await collection.find({year: tax.year, month: tax.month}).toArray()).at(0);

        if (typeof isAlreadyAdded === "undefined") {
            const res = await collection.insertOne(tax);
        } else {
            await collection.findOneAndUpdate({type: type, year: tax.year, month: tax.month}, { $set: { ...tax } });
        }
    } catch (err) {
        console.log(err);
    }

    return result;
}

const updateTax = async (year, month, changes) => {
    let result = changes;

    try {
        const db = await getDb();
        const collection = db.collection('taxes');

        const isAlready = (await collection.find({year: year, month: month})).toArray().at(0);

        if (typeof isAlready !== "undefined") {
            const res = await collection.findOneAndUpdated({year: year, month: month}, { $set: changes });
        }

        result = (await collection.find({year: year, month: month})).toArray().at(0);

    } catch (err) {
        console.log(err);
    }


    return result;
};

const deleteTax = async (year, month) => {
    try {
        const db = await getDb();
        const collection = db.collection('taxes');

        const res = await collection.deleteOne({year: year, month: month});
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    getTax,
    createTax,
    updateTax,
    deleteTax,
};