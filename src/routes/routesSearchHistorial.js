const express = require('express');
const router = express.Router();
const searchHistoryService = require('../services/searchHistoryService');
const errorHandler = require('../middleware/errorHandler');

router.get('/:uid/limit', async (req, res, next) => {
    try {
        const { uid } = req.params;
        const { limit, orderDirection = 'asc' } = req.query;
        const result = await searchHistoryService.getSearchHistoryWithLimit(uid, parseInt(limit), orderDirection);
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
        const result = await searchHistoryService.getSearchHistoryByDays(uid, parseInt(days), 'asc');
        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(404).json(result);
        }
    } catch (error) {
        next(error);
    }
});

router.get('/:uid/all', async (req, res, next) => {
    try {
        const { uid } = req.params;
        const { orderDirection = 'asc' } = req.query;
        const result = await searchHistoryService.getAllSearchHistory(uid, orderDirection);
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
        const result = await searchHistoryService.addSearchHistoryRecord(uid, data);
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
        const result = await searchHistoryService.deleteSearchHistoryRecord(uid, recordId);
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
