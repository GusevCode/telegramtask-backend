const express = require('express');
const eventController = require('../../controllers/eventController');

const router = express.Router();

router.get('/', eventController.getAllEvents);
router.get('/:eventId', eventController.getOneEvent);

router.post('/', eventController.createNewEvent);
router.patch('/:eventId', eventController.updateOneEvent);
router.delete('/:eventId', eventController.deleteOneEvent);

router.get('/:eventId/clients', eventController.getAllClients);
router.post('/:eventId/clients', eventController.addClient); 
router.patch('/:eventId/clients/:clientId', eventController.updateClient);

router.get('/:eventId/clients/download', eventController.downloadListOfClientsByEventId);

router.get('/:eventId/expenses', eventController.getAllExpenses);
router.post('/:eventId/expenses', eventController.addExpense);

module.exports = router;