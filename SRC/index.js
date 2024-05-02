import Chart from 'chart.js/auto';

const fetchData = async () => {
    try {
        const response = await fetch('https://criptoya.com/api/btc/ars/0.5');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const renderChart = async () => {
    const data = await fetchData();
    const labels = Object.keys(data);
    const values = Object.values(data);
    
    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Bitcoin to ARS',
                data: values,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
};

renderChart();
