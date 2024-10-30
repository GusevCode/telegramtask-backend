const earningService = require('../services/earningService');

const getTableDataByYearAndMonth = async (req, res) => {
    const {
        params: {year, month},
    } = req;

    if (!year || !month) {
        return;
    }

    const data = await earningService.getTableDataByYearAndMonth(year, month);

    res.send({
        status: 'OK',
        data: data,
    });
};

module.exports = {
    getTableDataByYearAndMonth,
};