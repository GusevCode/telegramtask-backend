const express = require('express');
const taxController = require('../../controllers/taxController');

const router = express.Router();

router.get(':year/:month', taxController.getTax);
router.post('/', taxController.createTax);
router.patch(':year/:month', taxController.updateTax);
router.delete(':year/:month', taxController.deleteTax);

module.exports = router;