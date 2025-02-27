function convertFirestoreTimestampToDate(timestamp) {
    if (!timestamp?._seconds) return null;
    
    const date = new Date(timestamp._seconds * 1000);
    return date.toLocaleString('es-CO', { timeZone: 'America/Bogota' });
}

function convertDateToFirestoreTimestamp(dateString) {
    const date = new Date(dateString);
    return { seconds: Math.floor(date.getTime() / 1000), nanoseconds: 0 };
}

module.exports = {
    convertFirestoreTimestampToDate,
    convertDateToFirestoreTimestamp
  };
  