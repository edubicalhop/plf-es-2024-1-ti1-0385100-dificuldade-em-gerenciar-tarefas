document.addEventListener('DOMContentLoaded', (event) => {
    console.log('Tarefa.js carregado');
    const taskList = JSON.parse(localStorage.getItem('tasks')) || [
        { id: 1, name: 'Tarefa 1', status: 'pending' },
        { id: 2, name: 'Tarefa 2', status: 'not completed' },
        { id: 3, name: 'Tarefa 3', status: 'completed' }
    ];

    const ul = document.getElementById('taskList');
    taskList.forEach(task => {
        const li = document.createElement('li');
        li.classList.add('task-item');
        li.innerHTML = `
            <span>${task.name}</span>
            <select data-id="${task.id}">
                <option value="completed" ${task.status === 'completed' ? 'selected' : ''}>Concluída</option>
                <option value="pending" ${task.status === 'pending' ? 'selected' : ''}>Pendente</option>
                <option value="not completed" ${task.status === 'not completed' ? 'selected' : ''}>Não Concluída</option>
            </select>
        `;
        ul.appendChild(li);
    });

    ul.addEventListener('change', (event) => {
        if (event.target.tagName === 'SELECT') {
            const id = event.target.getAttribute('data-id');
            const task = taskList.find(t => t.id == id);
            task.status = event.target.value;

            localStorage.setItem('tasks', JSON.stringify(taskList));
            console.log('Tarefas atualizadas:', taskList);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(taskList));
    console.log('Tarefas iniciais:', taskList);
});