const taxService = require('../services/taxService');

const getTax = async (req, res) => {
    const {
        params: {year, month},
    } = req;

    if (!year || !month) {
        return;
    }

    const tax = await taxService.getTax(year, month);

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
        date: body.date,
        sum: body.sum,
    }

    const createdTax = await taxService.createTax(newTax);

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