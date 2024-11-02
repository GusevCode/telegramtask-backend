const { getDb } = require('./db');

const getAllPromotionExpensesByYearAndMonth = async (yearNumber, monthNumber) => {
    let result = [];

    try {
        const db = await getDb();
        const collection = db.collection('promotion_expenses');
        
        result = await collection.find({year: yearNumber, month: monthNumber}).toArray();

        result.forEach(expense => {
            delete expense["_id"];
        });
    } catch(err) {
        console.log(err);
    }

    return result;
};

const createNewPromotionExpense = async (promotion) => {
    const result = promotion;

    try {
        const db = await getDb();
        const collection = db.collection('promotion_expenses');

        const isAlreadyAdded = (await collection.find({id: promotion.id}).toArray()).at(0);

        if (typeof isAlreadyAdded === "undefined") {
            const res = await collection.insertOne(promotion);
        }

    } catch (err) {
        console.log(err);
    }

    return result;
};

const updatePromotionExpense = async (promotionId, changes) => {
    let result = changes;

    try {
        const db = await getDb();
        const collection = db.collection('promotion_expenses');

        const isAlready = (await collection.find({id: promotionId}).toArray()).at(0);

        if (typeof isAlready !== "undefined") {
            const res = await collection.findOneAndUpdate({id: promotionId}, { $set: changes });
        }

        result = (await collection.find({id: promotionId}).toArray()).at(0);

    } catch (err) {
        console.log(err);
    }

    return result;
};

const deletePromotionExpense = async (promotionId) => {
    try {
        const db = await getDb();
        const collection = db.collection('promotion_expenses');

        const res = await collection.deleteOne({id: promotionId});
    } catch (err) {
        console.log(err);
    }
};

const getAllOrgExpensesByYearAndMonth = async (yearNumber, monthNumber) => {
    let result = [];

    try {
        const db = await getDb();
        const collection = db.collection('org_expenses');
        
        result = await collection.find({year: yearNumber, month: monthNumber}).toArray();
        
        result.forEach(expense => {
            delete expense["_id"];
        });
    } catch(err) {
        console.log(err);
    }

    return result;
};

const createNewOrgExpense = async (org) => {
    const result = org;

    try {
        const db = await getDb();
        const collection = db.collection('org_expenses');

        const isAlreadyAdded = (await collection.find({id: org.id}).toArray()).at(0);

        if (typeof isAlreadyAdded === "undefined") {
            const res = await collection.insertOne(org);
        }

    } catch (err) {
        console.log(err);
    }

    return result;
};

const updateOrgExpense = async (orgId, changes) => {
    let result = changes;

    try {
        const db = await getDb();
        const collection = db.collection('org_expenses');

        const isAlready = (await collection.find({id: orgId}).toArray()).at(0);

        if (typeof isAlready !== "undefined") {
            const res = await collection.findOneAndUpdate({id: orgId}, { $set: changes });
        }

        result = (await collection.find({id: orgId}).toArray()).at(0);

    } catch (err) {
        console.log(err);
    }

    return result;
};

const deleteOrgExpense = async (orgId) => {
    try {
        const db = await getDb();
        const collection = db.collection('org_expenses');

        const res = await collection.deleteOne({id: orgId});
    } catch (err) {
        console.log(err);
    }
};

const getAllInvestitionExpensesByYearAndMonth = async (yearNumber, monthNumber) => {
    let result = [];

    try {
        const db = await getDb();
        const collection = db.collection('investition_expenses');
        
        result = await collection.find({year: yearNumber, month: monthNumber}).toArray();
        
        result.forEach(expense => {
            delete expense["_id"];
        });
    } catch(err) {
        console.log(err);
    }

    return result;
};

const createNewInvestitionExpense = async (investition) => {
    const result = investition;

    try {
        const db = await getDb();
        const collection = db.collection('investition_expenses');

        const isAlreadyAdded = (await collection.find({id: investition.id}).toArray()).at(0);

        if (typeof isAlreadyAdded === "undefined") {
            const res = await collection.insertOne(investition);
        }

    } catch (err) {
        console.log(err);
    }

    return result;
};

const updateInvestitionExpense = async (investitionId, changes) => {
    let result = changes;

    try {
        const db = await getDb();
        const collection = db.collection('investition_expenses');

        const isAlready = (await collection.find({id: investitionId}).toArray()).at(0);

        if (typeof isAlready !== "undefined") {
            const res = await collection.findOneAndUpdate({id: investitionId}, { $set: changes });
        }

        result = (await collection.find({id: investitionId}).toArray()).at(0);

    } catch (err) {
        console.log(err);
    }

    return result;
};

const deleteInvestitionExpense = async (investitionId) => {
    try {
        const db = await getDb();
        const collection = db.collection('investition_expenses');

        const res = await collection.deleteOne({id: investitionId});
    } catch (err) {
        console.log(err);
    }
};

const getAllProfitsByYearAndMonth = async (yearNumber, monthNumber) => {
    let result = [];

    try {
        const db = await getDb();
        const collection = db.collection('profits');
        
        result = await collection.find({year: yearNumber, month: monthNumber}).toArray();
        
        result.forEach(profit => {
            delete profit["_id"];
        });
    } catch(err) {
        console.log(err);
    }

    return result;
};

const createNewProfit = async (profit) => {
    const result = profit;

    try {
        const db = await getDb();
        const collection = db.collection('profits');

        const isAlreadyAdded = (await collection.find({id: profit.id}).toArray()).at(0);

        if (typeof isAlreadyAdded === "undefined") {
            const res = await collection.insertOne(profit);
        }

    } catch (err) {
        console.log(err);
    }

    return result;
};

const updateProfit = async (profitId, changes) => {
    let result = changes;

    try {
        const db = await getDb();
        const collection = db.collection('profits');

        const isAlready = (await collection.find({id: profitId}).toArray()).at(0);

        if (typeof isAlready !== "undefined") {
            const res = await collection.findOneAndUpdate({id: profitId}, { $set: changes });
        }

        result = (await collection.find({id: profitId}).toArray()).at(0);

    } catch (err) {
        console.log(err);
    }

    return result;
};

const deleteProfit = async (profitId) => {
    try {
        const db = await getDb();
        const collection = db.collection('profits');

        const res = await collection.deleteOne({id: profitId});
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    getAllPromotionExpensesByYearAndMonth,
    createNewPromotionExpense,
    updatePromotionExpense,
    deletePromotionExpense,

    getAllOrgExpensesByYearAndMonth,
    createNewOrgExpense,
    updateOrgExpense,
    deleteOrgExpense,

    getAllInvestitionExpensesByYearAndMonth,
    createNewInvestitionExpense,
    updateInvestitionExpense,
    deleteInvestitionExpense,

    getAllProfitsByYearAndMonth,
    createNewProfit,
    updateProfit,
    deleteProfit,
};