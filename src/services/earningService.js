const Event = require('../database/Event');
const Month = require('../database/Month');
const Deposit = require('../database/Deposit');
const Tax = require('../database/Tax');

const getTableDataByYearAndMonth = async (year, month) => {
    let events = await Event.getAllEventsByYearAndMonth(year, month);

    let isEvent = false;

    events.map((elem) => {
        isEvent = true;
        elem.amountOfClients = elem['clients'].length;
        elem.amountOfNewClients = 0;

        elem['clients'].forEach(client => {
            if (client.isNew) {
                elem.amountOfNewClients++;
            }
        });
        
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

    if (!isEvent) {
        return null;
    }

    let additionalIncomes = await Month.getAllProfitsByYearAndMonth(year, month);

    additionalIncomes.forEach(income => {
        delete income['id'];
        delete income['year'];
        delete income['month'];
        delete income['day'];
    });

    let totalReport = {
        amountOfClients: 0,         // Всего клиентов
        amountOfNewClients: 0,      // Всего новых клиентов
        incomeSum: 0,               // Всего денег пришло
        expensesSum: 0,             // Всего расход
        profitSum: 0,               // Всего прибыль
        totalCh: 0,                 // Всего CH

        promotionExpensesSum: 0,    // Всего расходов на продвижение
        orgExpensesSum: 0,          // Всего расходов на орг
        investitionExpensesSum: 0,  // Всего расходов на инвестиции 

        netIncome: 0,               // Чистая прибыль
        humanActivities: 0,         // Человеко-меро
        humanPayedActivities: null, // Из них платных
        averageExtraChargeCommon: 0,      // Средняя наценка общая
        averageExtraChargePayed: null,    // Средняя наценка платные
        
        depositIn: 0,
        depositOut: 0,
        tax: 0,

        totalCheckout: 0,

        amountOfEvents: 0,
    };

    events.forEach(event => {
        totalReport.amountOfEvents += 1;
        totalReport.amountOfClients += Number(event.amountOfClients);
        totalReport.amountOfNewClients += Number(event.amountOfNewClients);
        totalReport.incomeSum += Number(event.totalIncome);
        totalReport.expensesSum += Number(event.totalExpenses);
        totalReport.profitSum += Number(event.profit);
    });

    additionalIncomes.forEach(income => {
        totalReport.profitSum += Number(income.sum);
    });

    totalReport.totalCh = totalReport.profitSum / totalReport.amountOfClients;

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
        totalReport.investitionExpensesSum += Number(expense.sum);
    });
    
    totalReport.netIncome = totalReport.incomeSum -
                            totalReport.promotionExpensesSum - 
                            totalReport.orgExpensesSum -
                            totalReport.investitionExpensesSum;

    totalReport.humanActivities = totalReport.amountOfClients;

    totalReport.averageExtraChargeCommon = totalReport.profitSum / totalReport.amountOfClients;

    let depositIn = await Deposit.getDeposit('in', year, month);
    let depositOut = await Deposit.getDeposit('out', year, month);

    let tax = await Tax.getTax(year, month);

    if (typeof depositIn !== 'undefined') {
        totalReport.depositIn = Number(depositIn.sum);
        console.log('here');
    }

    if (typeof depositOut !== 'undefined') {
        totalReport.depositOut = Number(depositOut.sum);
        console.log('here');
    }
    
    if (typeof tax !== 'undefined') {
        totalReport.tax = tax;
        console.log('here');
    }

    totalReport.totalCheckout = Number(totalReport.netIncome) +
                                Number(totalReport.depositIn) -
                                Number(totalReport.depositOut) -
                                Number(totalReport.tax);

    const result = {
        events: events,
        incomes: additionalIncomes,
        totalReport,
    };
    
    return result;
};

module.exports = {
    getTableDataByYearAndMonth,
};