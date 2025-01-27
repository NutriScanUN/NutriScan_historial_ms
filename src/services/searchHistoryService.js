const axios = require('axios');

// Base URL de la API externa
const BASE_URL = process.env.BASE_URL_API_USER;

const searchHistoryService = {
    // Obtener historial de búsqueda con un límite
    async getSearchHistoryWithLimit(uid, limit, orderDirection = 'asc') {
        try {
            const response = await axios.get(`${BASE_URL}/search-history/${uid}/limit`, {
                params: { limit, orderDirection },
            });
            return { success: true, data: response.data };
        } catch (error) {
            return handleApiError(error);
        }
    },

    // Obtener historial de búsqueda de los últimos días
    async getSearchHistoryByDays(uid, days, orderDirection = 'asc') {
        try {
            const response = await axios.get(`${BASE_URL}/search-history/${uid}/days`, {
                params: { days, orderDirection },
            });
            return { success: true, data: response.data };
        } catch (error) {
            return handleApiError(error);
        }
    },

    // Obtener todo el historial de búsqueda
    async getAllSearchHistory(uid, orderDirection = 'asc') {
        try {
            const response = await axios.get(`${BASE_URL}/search-history/${uid}/all`, {
                params: { orderDirection },
            });
            return { success: true, data: response.data };
        } catch (error) {
            return handleApiError(error);
        }
    },

    // Agregar un nuevo registro al historial de búsqueda
    async addSearchHistoryRecord(uid, data) {
        try {
            const response = await axios.post(`${BASE_URL}/search-history/${uid}`, data);
            return { success: true, data: response.data };
        } catch (error) {
            return handleApiError(error);
        }
    },

    // Eliminar un registro del historial de búsqueda
    async deleteSearchHistoryRecord(uid, recordId) {
        try {
            const response = await axios.delete(`${BASE_URL}/search-history/${uid}/${recordId}`);
            return { success: true, data: response.data };
        } catch (error) {
            return handleApiError(error);
        }
    },
};

module.exports = searchHistoryService;
