const { v4: uuid } = require('uuid');
const Stats = require('../database/SocialStats');

const getAllStatsByYearAndMonth = async (socnet, yearNumber, monthNumber) => {
    const stats = await Stats.getAllStatsByYearAndMonth(socnet, yearNumber, monthNumber);
    return stats;
};

const createNewStat = async(socnet, stat) => {
    const date = new Date(stat.date);

    const statToInsert = {
        id: uuid(),
        count: stat.count,
        year: String(date.getFullYear()),
        month: String(date.getMonth() + 1),
        day: String(date.getDate()),
    }

    const createdStat = await Stats.createNewStat(socnet, statToInsert);

    return createdStat;
};

const updateStat = async (socnet, id, changes) => {
    const updatedStat = await Stats.updateStat(socnet, id, changes);
    return updatedStat;
};

const deleteStat = async (socnet, id) => {
    await Stats.deleteStat(socnet, id);
};

module.exports = {
    getAllStatsByYearAndMonth,
    createNewStat,
    updateStat,
    deleteStat, 
};