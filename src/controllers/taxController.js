const taxService = require('../services/taxService');

const getTax = async (req, res) => {
    const {
        params: {year, month},
    } = req;

    if (!year || !month) {
        return;
    }

    const tax = await taxService.getTax(year, month);

    if (tax === undefined) {
        tax = {};
    }

    res.send({
        status: 'OK',
        data: tax,
    });
};

const createTax = async (req, res) => {
    const {
        body
    } = req;

    if (!body.date || !body.sum) {
        return;
    }

    const newTax = {
        date: body.date.trim(),
        sum: body.sum.trim(),
    }

    const createdTax = await taxService.createTax(newTax);

    if (createTax === undefined) {
        createTax = {};
    }

    res.send({
        status: 'OK',
        data: createdTax,
    });
};

const updateTax = async (req, res) => {
    const {
        params: {year, month},
        body,
    }  = req;

    if (!year || !month) {
        return;
    }

    const updatedTax = await taxService.updateTax(year, month, body);

    if (updateTax === undefined) {
        updateTax = {};
    }

    res.send({
        status: 'OK',
        data: updatedTax,
    });
};

const deleteTax = async (req, res) => {
    const {
        params: {year, month},
    } = req;

    if (!year || !month) {
        return;
    }

    await taxService.deleteTax(year, month);

    res.status(204).send({ status: 'OK' });
};

module.exports = {
    getTax,
    createTax,
    updateTax,
    deleteTax,
};