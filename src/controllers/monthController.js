const monthService = require('../services/monthService');

const getAllPromotionExpensesByYearAndMonth = async (req, res) => {
    const {
        params: {yearNumber, monthNumber}
    } = req;

    if (!yearNumber || !monthNumber) {
        return;
    }

    const expenses = await monthService.getAllPromotionExpensesByYearAndMonth(yearNumber, monthNumber);

    res.send({
        status: 'OK',
        data: expenses,
    });
};

const createPromotionExpense = async (req, res) => {
    const { body } = req;

    if (
        !body.date ||
        !body.name || 
        !body.sum
    ) {
        return;
    }

    const newPromotionExpense = {
        date: body.date,
        name: body.name,
        sum: body.sum
    }

    const createdPromotionExpense = await monthService.createNewPromotionExpense(
        newPromotionExpense
    );

    res.status(201).send({
        status: 'OK',
        data: createdPromotionExpense,
    });
};

const updatePromotionExpense = async (req, res) => {
    const {
        body,
        params: { promotionId }
    } = req;

    if (!promotionId) {
        return;
    }

    const updatedPromotionExpense = await monthService.updatePromotionExpense(
        promotionId,
        body,
    );

    res.send({
        status: 'OK',
        data: updatedPromotionExpense,
    });
};

const deletePromotionExpense = async (req, res) => {
    const {
        params: { promotionId },
    } = req;

    if (!promotionId) {
        return;
    }

    await monthService.deletePromotionExpense(promotionId);

    res.status(204).send({ status: 'OK' });
};

const getAllOrgExpensesByYearAndMonth = async (req, res) => {
    const {
        params: {yearNumber, monthNumber}
    } = req;

    if (!yearNumber || !monthNumber) {
        return;
    }

    const expenses = await monthService.getAllOrgExpensesByYearAndMonth(yearNumber, monthNumber);

    res.send({
        status: 'OK',
        data: expenses,
    });
};

const createOrgExpense = async (req, res) => {
    const { body } = req;

    if (
        !body.date ||
        !body.name || 
        !body.sum
    ) {
        return;
    }

    const newOrgExpense = {
        date: body.date,
        name: body.name,
        sum: body.sum
    }

    const createdOrgExpense = await monthService.createNewOrgExpense(
        newOrgExpense
    );

    res.status(201).send({
        status: 'OK',
        data: createdOrgExpense,
    });
};

const updateOrgExpense = async (req, res) => {
    const {
        body,
        params: { orgId }
    } = req;

    if (!orgId) {
        return;
    }

    const updatedOrgExpense = await monthService.updateOrgExpense(
        orgId,
        body,
    );

    res.send({
        status: 'OK',
        data: updatedOrgExpense,
    });
};

const deleteOrgExpense = async (req, res) => {
    const {
        params: { orgId },
    } = req;

    if (!orgId) {
        return;
    }

    await monthService.deleteOrgExpense(orgId);

    res.status(204).send({ status: 'OK' });
};

const getAllInvestitionExpensesByYearAndMonth = async (req, res) => {
    const {
        params: {yearNumber, monthNumber}
    } = req;

    if (!yearNumber || !monthNumber) {
        return;
    }

    const expenses = await monthService.getAllInvestitionExpensesByYearAndMonth(yearNumber, monthNumber);

    res.send({
        status: 'OK',
        data: expenses,
    });
};

const createInvestitionExpense = async (req, res) => {
    const { body } = req;

    if (
        !body.date ||
        !body.name || 
        !body.sum
    ) {
        return;
    }

    const newInvestExpense = {
        date: body.date,
        name: body.name,
        sum: body.sum
    }

    const createdInvestExpense = await monthService.createNewInvestitionExpense(
        newInvestExpense
    );

    res.status(201).send({
        status: 'OK',
        data: createdInvestExpense,
    });
};

const updateInvestitionExpense = async (req, res) => {
    const {
        body,
        params: { investitionId }
    } = req;

    if (!investitionId) {
        return;
    }

    const updatedInvestExpense = await monthService.updateInvestitionExpense(
        investitionId,
        body,
    );

    res.send({
        status: 'OK',
        data: updatedInvestExpense,
    });
};

const deleteInvestitionExpense = async (req, res) => {
    const {
        params: { orgId },
    } = req;

    if (!orgId) {
        return;
    }

    await monthService.deleteInvestitionExpense(orgId);

    res.status(204).send({ status: 'OK' });
};

const getAllProfitsByYearAndMonth = async (req, res) => {
    const {
        params: { yearNumber, monthNumber }
    } = req;

    if (!yearNumber || !monthNumber) {
        return;
    }

    const profits = await monthService.getAllProfitsByYearAndMonth(yearNumber, monthNumber);

    res.send({
        status: 'OK',
        data: profits,
    });
};

const createProfit = async (req, res) => {
    const { body } = req;

    if (
        !body.date ||
        !body.name || 
        !body.sum
    ) {
        return;
    }

    const newProfit = {
        date: body.date,
        name: body.name,
        sum: body.sum,
    }

    const createdProfit = await monthService.createNewProfit(
        newProfit,  
    );

    res.status(201).send({
        status: 'OK',
        data: createdProfit,
    });
};

const updateProfit = async (req, res) => {
    const {
        body,
        params: { profitId },
    } = req;

    if (!profitId) {
        return;
    }

    const updatedProfit = await monthService.updateProfit(
        profitId,
        body,
    );

    res.send({
        status: 'OK',
        data: updatedProfit,
    });
};

const deleteProfit = async (req, res) => {
    const {
        params: { profitId },
    } = req;

    if (!profitId) {
        return;
    }

    await monthService.deleteProfit(profitId);

    res.status(204).send({status: 'OK'});
}

module.exports = {
    getAllPromotionExpensesByYearAndMonth,
    createPromotionExpense,
    updatePromotionExpense,
    deletePromotionExpense,

    getAllOrgExpensesByYearAndMonth,
    createOrgExpense,
    updateOrgExpense,
    deleteOrgExpense,

    getAllInvestitionExpensesByYearAndMonth,
    createInvestitionExpense,
    updateInvestitionExpense,
    deleteInvestitionExpense,

    getAllProfitsByYearAndMonth,
    createProfit,
    updateProfit,
    deleteProfit,
};