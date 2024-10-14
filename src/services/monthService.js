const { v4: uuid } = require('uuid');
const Month = require('../database/Month');

const getAllPromotionExpensesByYearAndMonth = async (yearNumber, monthNumber) => {
    const expenses = await Month.getAllPromotionExpensesByYearAndMonth(yearNumber, monthNumber);
    return expenses;
};


const createNewPromotionExpense = async(promotionExpense) => {
    const date = new Date(promotionExpense.date);

    const promotionToInsert = {
        id: uuid(),
        name: promotionExpense.name,
        sum: promotionExpense.sum,
        year: String(date.getFullYear()),
        month: String(date.getMonth() + 1),
        day: String(date.getDate()),
    }

    const createdPromotion = await Month.createNewPromotionExpense(promotionToInsert);

    return createdPromotion;
};

const updatePromotionExpense = async (promotionId, changes) => {
    const updatedExpense = await Month.updatePromotionExpense(
        promotionId,
        changes,
    );
    
    return updatedExpense;
};

const deletePromotionExpense = async (promotionId) => {
    await Month.deletePromotionExpense(promotionId);
};


module.exports = {
    getAllPromotionExpensesByYearAndMonth,
    createNewPromotionExpense,
    updatePromotionExpense,
    deletePromotionExpense,

};