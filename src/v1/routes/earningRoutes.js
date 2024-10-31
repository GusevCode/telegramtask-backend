const express = require('express');
const earningController = require('../../controllers/earningController');

const router = express.Router();

router.get('/:year/:month', earningController.getTableDataByYearAndMonth);

module.exports = router;