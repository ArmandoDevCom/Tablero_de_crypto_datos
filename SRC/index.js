// index.js

import { fetchCryptoData } from './api.js';

const ctxPie = document.getElementById('pieChart').getContext('2d');
const ctxBar = document.getElementById('barChart').getContext('2d');

const generatePieChart = (labels, dataValues) => {
    new Chart(ctxPie, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'Market Cap (USD)',
                data: dataValues,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: true,
                    position: 'right'
                },
                tooltip: {
                    enabled: true
                }
            }
        }
    });
};

const generateBarChart = (labels, dataValues) => {
    new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Market Cap (USD)',
                data: dataValues,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value, index, values) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
};

const init = async () => {
    const data = await fetchCryptoData();
    
    if (data) {
        // Obtener las 5 criptomonedas más valiosas para el gráfico de pastel
        const top5Labels = data.data.slice(0, 5).map(coin => coin.symbol);
        const top5DataValues = data.data.slice(0, 5).map(coin => parseFloat(coin.market_cap_usd));
        
        // Obtener las siguientes 50 criptomonedas más valiosas (exceptuando las primeras 5) para el gráfico de barras
        const next50Labels = data.data.slice(5, 55).map(coin => coin.symbol);
        const next50DataValues = data.data.slice(5, 55).map(coin => parseFloat(coin.market_cap_usd));
        
        generatePieChart(top5Labels, top5DataValues);
        generateBarChart(next50Labels, next50DataValues);
    }
};

init();
