const express = require('express');
const depositController = require('../../controllers/depositController');

const router = express.Router();

// in, out
router.get('/:type/:year/:month', depositController.getDeposit);
router.post('/:type', depositController.createDeposit);
router.patch('/:type/:year/:month', depositController.updateDeposit);
router.delete('/:type/:year/:month', depositController.deleteDeposit);

module.exports = router;