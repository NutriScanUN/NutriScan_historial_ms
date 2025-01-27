const axios = require('axios');

// Base URL de la API externa
const BASE_URL = process.env.BASE_URL_API_USER;

const consumptionHistoryService = {
    // Obtener todo el historial de consumo de un usuario
    async getAllConsumptionHistory(uid, orderDirection = 'asc') {
        try {
            const response = await axios.get(`${BASE_URL}/consumption-history/${uid}/all`, {
                params: { orderDirection },
            });
            return { success: true, data: response.data };
        } catch (error) {
            return handleApiError(error);
        }
    },

    // Obtener historial de consumo de los últimos días
    async getConsumptionHistoryByDays(uid, days, orderDirection = 'asc') {
        try {
            const response = await axios.get(`${BASE_URL}/consumption-history/${uid}/days`, {
                params: { days, orderDirection },
            });
            return { success: true, data: response.data };
        } catch (error) {
            return handleApiError(error);
        }
    },

    // Agregar un nuevo registro al historial de consumo
    async addConsumptionHistoryRecord(uid, data) {
        try {
            const response = await axios.post(`${BASE_URL}/consumption-history/${uid}`, data);
            return { success: true, data: response.data };
        } catch (error) {
            return handleApiError(error);
        }
    },

    // Eliminar un registro del historial de consumo
    async deleteConsumptionHistoryRecord(uid, recordId) {
        try {
            const response = await axios.delete(`${BASE_URL}/consumption-history/${uid}/${recordId}`);
            return { success: true, data: response.data };
        } catch (error) {
            return handleApiError(error);
        }
    },
};


module.exports = consumptionHistoryService;
