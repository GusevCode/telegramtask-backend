const Event = require('../database/Event');
const Month = require('../database/Month');

const earningService = require('../services/earningService');

const getTableDataByYear = async (year) => {
    let result = [];
    for (let month = 1; month <= 12; month++) {
        earningsData = (await earningService.getTableDataByYearAndMonth(year, `${month}`));

        result[month] = {
            month: month,
            turnover: earningsData.totalReport.incomeSum, // Оборот
            profit: earningsData.totalReport.profitSum, // прибыль
            marginality: 0, // маржинальность (null)
            amountOfEvents: earningsData.totalReport.amountOfEvents, // Колличество ивентов
            amountOfHumanActivities: earningsData.totalReport.humanActivities, // ЧМ
            amountOfNewHumanActivities: earningsData.totalReport.amountOfNewClients, // ЧМ новые
            averageCheck: 0, // Средний чек (null)
            ch: 0, //ch (null)
            promotion: earningsData.totalReport.promotionExpensesSum, // Продвижение
            org: earningsData.totalReport.orgExpensesSum, // Орграсходы
            netIncome: 0, // Чистыми
            investitions: earningsData.totalReport.investitionExpensesSum, // Инвестиции
            tax: earningsData.totalReport.tax,     // Налоги
            total: 0, // Деньги в кассе
        };

        if (result[month].turnover != 0) {
            result[month].marginality = result[month].profit / result[month].turnover;  
        } else {
            result[month].marginality = 0;
        }

        if (result[month].amountOfHumanActivities != 0) {
            result[month].averageCheck = result[month].turnover / result[month].amountOfHumanActivities;
        } else {
            result[month].averageCheck = 0;
        }

        if (result[month].amountOfHumanActivities != 0) {
            result[month].ch = result[month].profit / result[month].amountOfHumanActivities;
        } else {
            result[month].ch = 0;
        }

        result[month].netIncome = result[month].profit - result[month].promotion - result[month].org;
        result[month].total = result[month].netIncome - result[month].investitions - result[month].tax;
    }
    return result;
};

module.exports = {
    getTableDataByYear,
}