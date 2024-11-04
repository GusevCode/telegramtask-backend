const { v4: uuid } = require('uuid');
const Deposit = require('../database/Deposit');

const getDeposit = async (type, year, month) => {
    const deposit = await Deposit.getDeposit(type, year, month);
    return deposit;
};

const createDeposit = async (type, deposit) => {
    const date = new Date(deposit.date);

    const depositToInsert = {
        id: uuid(),
        type: deposit.type,
        sum: deposit.sum,
        year: String(date.getFullYear()),
        month: String(date.getMonth() + 1),
        day: String(date.getDate()),
    };

    const createdDeposit = await Deposit.createDeposit(type, depositToInsert);

    return createdDeposit;

};

const updateDeposit = async (type, year, month, changes) => {
    const updatedDeposit = await Deposit.updateDeposit(type, year, month, changes);
    return updatedDeposit;
};

const deleteDeposit = async (type, year, month) => {
    await Deposit.deleteDeposit(type, year, month);
};


module.exports = {
    getDeposit,
    createDeposit,
    updateDeposit,
    deleteDeposit,
};