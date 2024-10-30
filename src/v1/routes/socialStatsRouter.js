const express = require('express');
const statsController = require('../../controllers/socialStatsController');

const router = express.Router();

/*
    socnet - vk, telegram, chats
*/
router.get('/:socnet/:yearNumber/:monthNumber', statsController.getAllStatsByYearAndMonth);
//add check for this day or add seconds
router.post('/:socnet/', statsController.createNewStat);
router.patch('/:socnet/:id/', statsController.updateStat);
router.delete('/:socnet/:id/', statsController.deleteStat);


module.exports = router;