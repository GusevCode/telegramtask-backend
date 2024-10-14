const { DB_URL, DB_NAME } = require('./config');

const MongoClient = require('mongodb').MongoClient;
const mongoClient = new MongoClient(DB_URL);

const getAllPromotionExpensesByYearAndMonth = async (yearNumber, monthNumber) => {
    let result = [];

    try {
        await mongoClient.connect();
        const db = mongoClient.db(DB_NAME);
        const collection = db.collection('promotion_expenses');
        
        result = await collection.find({year: yearNumber, month: monthNumber}).toArray();
        
        result.forEach(expense => {
            delete expense["_id"];
        });
    } catch(err) {

    } finally {
        mongoClient.close();
    }

    return result;
};

const createNewPromotionExpense = async (promotion) => {
    const result = promotion;

    try {
        await mongoClient.connect();
        const db = mongoClient.db(DB_NAME);
        const collection = db.collection('promotion_expenses');

        const isAlreadyAdded = (await collection.find({id: promotion.id}).toArray()).at(0);

        if (typeof isAlreadyAdded === "undefined") {
            const res = await collection.insertOne(promotion);
        }

    } catch (err) {
        console.log(err);
    } finally {
        mongoClient.close();
    }

    return result;
};

const updatePromotionExpense = async (promotionId, changes) => {
    let result = changes;

    try {
        await mongoClient.connect();
        const db = mongoClient.db(DB_NAME);
        const collection = db.collection('promotion_expenses');

        const isAlready = (await collection.find({id: promotionId}).toArray()).at(0);

        if (typeof isAlready !== "undefined") {
            const res = await collection.findOneAndUpdate({id: promotionId}, { $set: changes });
        }

        result = (await collection.find({id: promotionId}).toArray()).at(0);

    } catch (err) {
        console.log(err);
    } finally {
        mongoClient.close();
    }

    return result;
};

const deletePromotionExpense = async (promotionId) => {
    try {
        await mongoClient.connect();
        const db = mongoClient.db(DB_NAME);
        const collection = db.collection('promotion_expenses');

        const res = await collection.deleteOne({id: promotionId});
    } catch (err) {
        console.log(err);
    } finally {
        mongoClient.close();
    }
};

module.exports = {
    getAllPromotionExpensesByYearAndMonth,
    createNewPromotionExpense,
    updatePromotionExpense,
    deletePromotionExpense,
};