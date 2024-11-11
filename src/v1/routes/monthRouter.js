const express = require('express');
const monthController = require('../../controllers/monthController');

const router = express.Router();

router.get('/expenses/promotions/:yearNumber/:monthNumber', monthController.getAllPromotionExpensesByYearAndMonth);
router.post('/expenses/promotions/', monthController.createPromotionExpense);
router.patch('/expenses/promotions/:promotionId', monthController.updatePromotionExpense);
router.delete('/expenses/promotions/:promotionId', monthController.deletePromotionExpense);

router.get('/expenses/orgs/:yearNumber/:monthNumber', monthController.getAllOrgExpensesByYearAndMonth);
router.post('/expenses/orgs/', monthController.createOrgExpense);
router.patch('/expenses/orgs/:orgId', monthController.updateOrgExpense);
router.delete('/expenses/orgs/:orgId', monthController.deleteOrgExpense);

router.get('/expenses/investitions/:yearNumber/:monthNumber', monthController.getAllInvestitionExpensesByYearAndMonth);
router.post('/expenses/investitions/', monthController.createInvestitionExpense);
router.patch('/expenses/investitions/:investitionId', monthController.updateInvestitionExpense);
router.delete('/expenses/investitions/:investitionId', monthController.deleteInvestitionExpense);

router.get('/profits/:yearNumber/:monthNumber', monthController.getAllProfitsByYearAndMonth);
router.post('/profits/', monthController.createProfit);
router.patch('/profits/:profitId', monthController.updateProfit);
router.delete('/profits/:profitId', monthController.deleteProfit);

module.exports = router;