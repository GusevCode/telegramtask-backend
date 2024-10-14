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


module.exports = {
    getAllPromotionExpensesByYearAndMonth,
    createPromotionExpense,
    updatePromotionExpense,
    deletePromotionExpense,


};