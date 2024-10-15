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

const getAllOrgExpensesByYearAndMonth = async (yearNumber, monthNumber) => {
    const expenses = await Month.getAllOrgExpensesByYearAndMonth(yearNumber, monthNumber);
    return expenses;
};

const createNewOrgExpense = async (orgExpense) => {
    const date = new Date(orgExpense.date);

    const orgToInsert = {
        id: uuid(),
        name: orgExpense.name,
        sum: orgExpense.sum,
        year: String(date.getFullYear()),
        month: String(date.getMonth() + 1),
        day: String(date.getDate()),
    }

    const createdOrg = await Month.createNewOrgExpense(orgToInsert);

    return createdOrg;
};

const updateOrgExpense = async (orgId, changes) => {
    const updatedExpense = await Month.updateOrgExpense(
        orgId,
        changes,
    );
    
    return updatedExpense;
};

const deleteOrgExpense = async (orgId) => {
    await Month.deleteOrgExpense(orgId);
};

const getAllInvestitionExpensesByYearAndMonth = async (yearNumber, monthNumber) => {
    const expenses = await Month.getAllInvestitionExpensesByYearAndMonth(yearNumber, monthNumber);
    return expenses;
};

const createNewInvestitionExpense = async (investitionExpense) => {
    const date = new Date(investitionExpense.date);

    const investitionToInsert = {
        id: uuid(),
        name: investitionExpense.name,
        sum: investitionExpense.sum,
        year: String(date.getFullYear()),
        month: String(date.getMonth() + 1),
        day: String(date.getDate()),
    }

    const createdInvestition = await Month.createNewInvestitionExpense(investitionToInsert);

    return createdInvestition;
};

const updateInvestitionExpense = async (investitionId, changes) => {
    const updatedExpense = await Month.updateInvestitionExpense(
        investitionId,
        changes,
    );
    
    return updatedExpense;
};

const deleteInvestitionExpense = async (investitionId) => {
    await Month.deleteInvestitionExpense(investitionId);
};

const getAllProfitsByYearAndMonth = async (yearNumber, monthNumber) => {
    const profits = Month.getAllProfitsByYearAndMonth(yearNumber, monthNumber);
    return profits;
};

const createNewProfit = async (profit) => {
    const date = new Date(profit.date);

    const profitToInsert = {
        id: uuid(),
        name: profit.name,
        sum: profit.sum,
        year: String(date.getFullYear()),
        month: String(date.getMonth() + 1),
        day: String(date.getDate()),
    }

    const createdProfit = await Month.createNewProfit(profitToInsert);

    return createdProfit;
};

const updateProfit = async (profitId, changes) => {
    const updatedProfit = await Month.updateProfit(
        profitId, 
        changes,
    );

    return updatedProfit;
};

const deleteProfit = async (profitId) => {
    await Month.deleteProfit(profitId);
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