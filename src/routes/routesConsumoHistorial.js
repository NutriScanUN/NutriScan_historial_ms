const express = require('express');
const router = express.Router();
const consumptionHistoryService = require('../services/consumptionHistoryService');
const errorHandler = require('../middleware/errorHandler');

router.get('/:uid/all', async (req, res, next) => {
    try {
        const { uid } = req.params;
        const { orderDirection = 'asc' } = req.query;
        const result = await consumptionHistoryService.getAllConsumptionHistory(uid, orderDirection);
        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(404).json(result);
        }
    } catch (error) {
        next(error);
    }
});

router.get('/:uid/days', async (req, res, next) => {
    try {
        const { uid } = req.params;
        const { days } = req.query;
        const result = await consumptionHistoryService.getConsumptionHistoryByDays(uid, parseInt(days), 'asc');
        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(404).json(result);
        }
    } catch (error) {
        next(error);
    }
});

router.post('/:uid', async (req, res, next) => {
    try {
        const { uid } = req.params;
        const data = req.body;
        const result = await consumptionHistoryService.addConsumptionHistoryRecord(uid, data);
        if (result.success) {
            res.status(201).json(result);
        } else {
            res.status(400).json(result);
        }
    } catch (error) {
        next(error);
    }
});

router.delete('/:uid/:recordId', async (req, res, next) => {
    try {
        const { uid, recordId } = req.params;
        const result = await consumptionHistoryService.deleteConsumptionHistoryRecord(uid, recordId);
        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(404).json(result);
        }
    } catch (error) {
        next(error);
    }
});

// Middleware de manejo de errores
router.use(errorHandler);

module.exports = router;
