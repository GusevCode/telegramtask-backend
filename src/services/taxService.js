const { v4: uuid } = require('uuid');
const Tax = require('../database/Tax');

const getTax = async (year, month) => {
    const tax = await Tax.getTax(year, month);
    return tax;
};

const createTax = async (tax) => {
    const date = new Date(tax.date);

    const taxToInsert = {
        id: uuid(),
        sum: tax.sum,
        year: String(date.getFullYear()),
        month: String(date.getMonth() + 1),
        day: String(date.getDate()),
    };

    const createdTax = await Tax.createTax(taxToInsert);
    return createdTax;
};

const updateTax = async (year, month, changes) => {
    const updatedTax = await Tax.updateTax(year, month, changes);
    return updatedTax;
};

const deleteTax = async (year, month) => {
    await Tax.deleteTax(year, month);
};

module.exports = {
    getTax,
    createTax,
    updateTax,
    deleteTax,
};