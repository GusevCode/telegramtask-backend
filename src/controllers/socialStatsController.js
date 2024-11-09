const statsService = require('../services/socialStatsService');

const avaibleSocnets = ['vk', 'telegram', 'chats'];

const getAllStatsByYearAndMonth = async (req, res) => {
    const {
        params: {socnet, yearNumber, monthNumber}
    } = req;

    if (!socnet || !yearNumber || !monthNumber) {
        return;
    }

    if (!avaibleSocnets.includes(socnet)) {
        return;
    }

    let stats = await statsService.getAllStatsByYearAndMonth(socnet, yearNumber, monthNumber);

    if (stats === undefined) {
        stats = [];
    }

    res.send({
        status: 'OK',
        data: stats,
    });
};

const createNewStat = async (req, res) => {
    const {
        params: {socnet},
        body 
    } = req;

    if (
        !body.date ||
        !body.count
    ) {
        return;
    }

    if (!avaibleSocnets.includes(socnet)) {
        return;
    }

    const newStat = {
        date: body.date,
        count: body.count,
    };

    const createdStat = await statsService.createNewStat(
        socnet, 
        newStat,
    );

    res.status(201).send({
        status: 'OK',
        data: createdStat,
    });
};

const updateStat = async (req, res) => {
    const {
        params: {socnet, id},
        body 
    } = req;

    if (
        !body.date ||
        !body.count
    ) {
        return;
    }

    if (!avaibleSocnets.includes(socnet)) {
        return;
    }

    let updatedStat = await statsService.updateStat(
        socnet.trim(),
        id.trim(),
        body.trim(),
    );

    if (updatedStat === undefined) {
        updatedStat = {};
    }

    res.send({
        status: 'OK',
        data: updatedStat,
    });
};

const deleteStat = async (req, res) => {
    const {
        params: {socnet, id},
    } = req;

    if (!avaibleSocnets.includes(socnet)) {
        return;
    }

    await statsService.deleteStat(socnet, id);

    res.status(204).send({ status: 'OK' });
};

module.exports = {
    getAllStatsByYearAndMonth,
    createNewStat, 
    updateStat,
    deleteStat,
};