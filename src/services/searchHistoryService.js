const axios = require('axios');
const errorHandler = require('../middleware/errorHandler');
const { convertFirestoreTimestampToDate, convertDateToFirestoreTimestamp } = require('../utils/historyUtils');
const { json } = require('body-parser');

// Base URL de la API externa
const BASE_URL = process.env.BASE_URL_API_USER;

const searchHistoryService = {
    // Obtener historial de búsqueda con un límite
    async getSearchHistoryWithLimit(uid, limit, orderDirection = 'asc') {
        try {
            const response = await axios.get(`${BASE_URL}/search-history/${uid}/limit`, {
                params: { limit, orderDirection },
            });
            if(!response?.data?.success) return { success: false, data: response.data };
            response?.data?.data.forEach(element => {
                element.fecha_busqueda = convertFirestoreTimestampToDate(element?.fecha_busqueda);
                return element;
            });
            return { success: true, data: response.data };
        } catch (error) {
            return errorHandler(error);
        }
    },

    // Obtener historial de búsqueda de los últimos días
    async getSearchHistoryByDays(uid, days, orderDirection = 'asc') {
        try {
            const response = await axios.get(`${BASE_URL}/search-history/${uid}/${days}`);
            if(!response?.data?.success) return { success: false, data: response.data };
            response?.data?.data.forEach(element => {
                element.fecha_busqueda = convertFirestoreTimestampToDate(element?.fecha_busqueda);
                return element;
            });
            return { success: true, data: response.data };
        } catch (error) {
            return errorHandler(error);
        }
    },

    // Obtener todo el historial de búsqueda
    async getAllSearchHistory(uid, orderDirection = 'asc') {
        try {
            const response = await axios.get(`${BASE_URL}/search-history/${uid}`, {
                params: { orderDirection },
            });
            console.log("🚀 ~ getAllSearchHistory ~ response:", response.data)
            if(!response?.data?.success) return { success: false, data: response.data };
            if(response?.data?.data.length === 0) return { success: true, data: [] };
            response?.data?.data.forEach(element => {
                console.log("🚀 ~ getAllSearchHistory ~ element1:", element)
                element.fecha_busqueda = convertFirestoreTimestampToDate(element?.fecha_busqueda);
                return element;
            });
            return { success: true, data: response.data };
        } catch (error) {
            return errorHandler(error);
        }
    },

    // Agregar un nuevo registro al historial de búsqueda
    async addSearchHistoryRecord(uid, data) {
        try {
            console.log("🚀 ~ addSearchHistoryRecord ~ data:", data)
            data.fecha_busqueda = convertDateToFirestoreTimestamp(data.fecha_busqueda);   
            console.log("🚀 ~ addSearchHistoryRecord ~ data:", data)
            console.log("🚀 ~ addSearchHistoryRecord ~ `${BASE_URL}/search-history/${uid}`:", `${BASE_URL}/search-history/${uid}`)
            const response = await axios.post(`${BASE_URL}/search-history/${uid}`, data);
            return { success: true, data: response.data };
        } catch (error) {
            return errorHandler(error);
        }
    },

    // Eliminar un registro del historial de búsqueda
    async deleteSearchHistoryRecord(uid, recordId) {
        try {
            const response = await axios.delete(`${BASE_URL}/search-history/${uid}/${recordId}`);
            return { success: true, data: response.data };
        } catch (error) {
            return errorHandler(error);
        }
    },
};

module.exports = searchHistoryService;
