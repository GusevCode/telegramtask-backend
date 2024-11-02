const express = require('express');
const summaryController = require('../../controllers/summaryController');

const router = express.Router();

router.get('/:year', summaryController.getTableDataByYear);

module.exports = router;