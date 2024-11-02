const summaryService = require('../services/summaryService');

const getTableDataByYear = async (req, res) => {
    const {
        params: {year},
    } = req;

    if (!year) {
        return;
    }

    const data = await summaryService.getTableDataByYear(year);

    res.send({
        status: 'OK',
        data: data,
    });
};

module.exports = {
    getTableDataByYear,
};