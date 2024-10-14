const express = require('express');
const monthController = require('../../controllers/monthController');

const router = express.Router();

router.get('/expenses/promotions/:yearNumber/:monthNumber', monthController.getAllPromotionExpensesByYearAndMonth);
router.post('/expenses/promotions/', monthController.createPromotionExpense);
router.patch('/expenses/promotions/:promotionId', monthController.updatePromotionExpense);
router.delete('/expenses/promotions/:promotionId', monthController.deletePromotionExpense);

// router.get('/', eventController.getAllEvents);
// router.get('/:eventId', eventController.getOneEvent);
// router.post('/', eventController.createNewEvent);
// router.patch('/:eventId', eventController.updateOneEvent);
// router.delete('/:eventId', eventController.deleteOneEvent);

// router.get('/:eventId/clients', eventController.getAllClients);
// router.post('/:eventId/clients', eventController.addClient); 

// router.get('/:eventId/expenses', eventController.getAllExpenses);
// // router.get('/:eventId/expenses/:expenseId', eventController.getOneExpense)
// router.post('/:eventId/expenses', eventController.addExpense);

module.exports = router;