const axios = require('axios');
const errorHandler = require('../middleware/errorHandler');
const { convertDateToFirestoreTimestamp, convertFirestoreTimestampToDate } = require('../utils/historyUtils');

// Base URL de la API externa
const BASE_URL = process.env.BASE_URL_API_USER;

const consumptionHistoryService = {
    // Obtener todo el historial de consumo de un usuario
    async getAllConsumptionHistory(uid, orderDirection = 'asc') {
        try {
            const response = await axios.get(`${BASE_URL}/consumption-history/${uid}/all`, {
                params: { orderDirection },
            });
            if(!response?.data?.success) return { success: false, data: response.data };
            response?.data?.data.forEach(element => {
                element.fecha_consumo = convertFirestoreTimestampToDate(element?.fecha_consumo);
                element.nutrientes_ingeridos = JSON.stringify(element.nutrientes_ingeridos);
                return element;
            });
            return { success: true, data: response.data };
        } catch (error) {
            return errorHandler(error);
        }
    },

    // Obtener historial de consumo de los últimos días
    async getConsumptionHistoryByDays(uid, days, orderDirection = 'asc') {
        try {
            const response = await axios.get(`${BASE_URL}/consumption-history/${uid}/${days}`, {
                params: { days, orderDirection },
            });
            if(!response?.data?.success) return { success: false, data: response.data };
            response?.data?.data.forEach(element => {
                element.fecha_consumo = convertFirestoreTimestampToDate(element?.fecha_consumo);
                element.nutrientes_ingeridos = JSON.stringify(element.nutrientes_ingeridos);
                return element;
            });
            return { success: true, data: response.data };
        } catch (error) {
            return errorHandler(error);
        }
    },

    // Agregar un nuevo registro al historial de consumo
    async addConsumptionHistoryRecord(uid, data) {
        try {
            data.fecha_consumo = convertDateToFirestoreTimestamp(data.fecha_consumo);   
            data.nutrientes_ingeridos = JSON.parse(data.nutrientes_ingeridos);   
            console.log("🚀 ~ addConsumptionHistoryRecord ~ data:", data)
            const response = await axios.post(`${BASE_URL}/consumption-history/${uid}`, data);
            return { success: true, data: response.data };
        } catch (error) {
            return errorHandler(error);
        }
    },

    // Eliminar un registro del historial de consumo
    async deleteConsumptionHistoryRecord(uid, recordId) {
        try {
            const response = await axios.delete(`${BASE_URL}/consumption-history/${uid}/${recordId}`);
            return { success: true, data: response.data };
        } catch (error) {
            return errorHandler(error);
        }
    },
};


module.exports = consumptionHistoryService;
