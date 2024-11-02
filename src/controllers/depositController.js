const depositService = require('../services/depositService');

const avaibleTypes = ['in', 'out'];

const getDeposit = async (req, res) => {
    const {
        params: {type, year, month},
    } = req;

    if (!type || !year || !month) {
        return;
    }

    if (!avaibleTypes.includes(type)) {
        return;
    }

    const deposit = await depositService.getDeposit(type, year, month);

    res.send({
        status: 'OK',
        data: deposit,
    });
};

const createDeposit = async(req, res) => {
    const {
        params: {type},
        body
    } = req;

    if (!type) {
        return;
    }

    if (!avaibleTypes.includes(type)) {
        return;
    }

    if (!body.date || !body.sum) {
        return;
    }

    const newDeposit = {
        date: body.date,
        sum: body.sum,
    };

    const createdDeposit = await depositService.createDeposit(type, newDeposit);

    res.send({
        status: 'OK',
        data: createdDeposit,
    });
};

const updateDeposit = async(req, res) => {
    const {
        params: {type, year, month},
        body
    } = req;

    if (!type || !year || !month) {
        return;
    }

    if (!avaibleTypes.includes(type)) {
        return;
    }

    const updatedDeposit = await depositService(type, year, month, body);

    res.send({
        status: 'OK',
        data: updatedDeposit,
    });
};

const deleteDeposit = async(req, res) => {
    const {
        params: {type, year, month},
    } = req;

    if (!type || !year || !month) {
        return;
    }

    if (!avaibleTypes.includes(type)) {
        return;
    }

    await depositService.deleteDeposit(type, year, month);

    res.status(204).send({ status: 'OK' });
};

module.exports = {
    getDeposit,
    createDeposit,
    updateDeposit,
    deleteDeposit,
};