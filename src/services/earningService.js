const Event = require('../database/Event');
const Month = require('../database/Month');

const getTableDataByYearAndMonth = async (year, month) => {
    let events = await Event.getAllEventsByYearAndMonth(year, month);

    events.map((elem) => {
        elem.amountOfClients = elem['clients'].length;
        elem.amountOfNewClients = null;
        
        elem.totalIncome = 0;

        elem['clients'].forEach(client => {
            elem.totalIncome += Number(client.deposit);
        });
        elem.totalExpenses = 0;

        elem['expenses'].forEach(expense => {
            elem.totalExpenses += Number(expense.sum);
        });

        elem.profit = elem.totalIncome - elem.totalExpenses;
        elem.ch = elem.profit / elem.amountOfClients;

        delete elem['_id'];
        delete elem['id'];
        delete elem['date'];
        delete elem['clients'];
        delete elem['expenses'];
    });

    let additionalIncomes = await Month.getAllProfitsByYearAndMonth(year, month);

    additionalIncomes.forEach(income => {
        delete income['id'];
        delete income['year'];
        delete income['month'];
        delete income['day'];
    });

    let totalReport = {
        amountOfClients: 0,
        amountOfNewClients: null,
        incomeSum: 0,
        expensesSum: 0,
        profitSum: 0,
        totalCh: 0,

        promotionExpensesSum: 0,
        orgExpensesSum: 0,
        investitionExpensesSum: 0,
    };

    events.forEach(event => {
        totalReport.amountOfClients += Number(event.amountOfClients);
        // totalReport.amountOfNewClients 
        totalReport.incomeSum += Number(event.totalIncome);
        totalReport.expensesSum += Number(event.totalExpenses);
        totalReport.profitSum += Number(event.profit);
    });

    totalReport.totalCh = totalReport.profitSum / totalReport.amountOfClients;

    /*
    let promoExpenses = await Month.getAllPromotionExpensesByYearAndMonth(year, month);
    let orgExpenses = await Month.getAllOrgExpensesByYearAndMonth(year, month);
    let investitionExpenses = await Month.getAllInvestitionExpensesByYearAndMonth(year, month);

    promoExpenses.forEach((expense) => {
        totalReport.promotionExpensesSum += Number(expense.sum);
    });

    orgExpenses.forEach((expense) => {
        totalReport.orgExpensesSum += Number(expense.sum);
    });

    investitionExpenses.forEach((expense) => {
        totalReport.investitionExpensesSum = Number(expense.sum);
    });
    
    */

    const result = {
        events: events,
        incomes: additionalIncomes,
        totalReport,
    };
    
    return result;
};

module.exports = {
    getTableDataByYearAndMonth,
}