// api.js

export const fetchCryptoData = async () => {
    try {
        const response = await fetch('https://api.coinlore.net/api/tickers/');
        
        if (!response.ok) {
            throw new Error('Error al obtener los datos de la API');
        }
        
        const data = await response.json();
        console.log(data); // Verificar los datos en la consola
        return data;
    } catch (error) {
        console.error('Error fetching data:', error.message);
        return null;
    }
};
