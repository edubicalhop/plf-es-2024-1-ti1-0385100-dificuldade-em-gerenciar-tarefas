document.addEventListener('DOMContentLoaded', (event) => {
    console.log('Grafico.js carregado');
    const ctx = document.getElementById('taskChart').getContext('2d');

    const updateChart = () => {
        console.log('Atualizando gráfico');
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        console.log('Tarefas:', tasks);
        const completed = tasks.filter(task => task.status === 'completed').length;
        const pending = tasks.filter(task => task.status === 'pending').length;
        const notCompleted = tasks.filter(task => task.status === 'not completed').length;

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Concluídas', 'Pendentes', 'Não Concluídas'],
                datasets: [{
                    label: '# de Tarefas',
                    data: [completed, pending, notCompleted],
                    backgroundColor: ['#4CAF50', '#FFC107', '#F44336'],
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
    }

    updateChart();
});