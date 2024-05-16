let projects = getProjectsFromLocalStorage();
const predefinedTasks = ['Tarefa 1', 'Tarefa 2', 'Tarefa 3', 'Tarefa 4', 'Tarefa 5'];

function getProjectsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('projects')) || [];
}

function saveProjectsToLocalStorage() {
    localStorage.setItem('projects', JSON.stringify(projects));
}

function createProjectListItem(project, index) {
    const listItem = document.createElement('li');

    const projectText = document.createElement('h2');
    projectText.textContent = project.name;
    listItem.appendChild(projectText);

    listItem.appendChild(createTaskList(project.tasks));
    const deleteButton = createDeleteButton(index);
    listItem.appendChild(deleteButton);
    listItem.appendChild(createEditButton(project, index, projectText, listItem, deleteButton));

    return listItem;
}

function createTaskList(tasks) {
    const taskList = document.createElement('ul');
    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.textContent = task;
        taskList.appendChild(taskItem);
    });
    return taskList;
}

function createDeleteButton(index) {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Deletar';
    deleteButton.className = 'delete-button';
    deleteButton.addEventListener('click', function() {
        projects.splice(index, 1);
        saveProjectsToLocalStorage();
        renderProjects();
    });
    return deleteButton;
}

function createEditButton(project, index, projectText, listItem, deleteButton) {
    const editButton = document.createElement('button');
    editButton.textContent = 'Editar';
    editButton.className = 'edit-button';
    editButton.addEventListener('click', function() {
        listItem.replaceChild(createEditInput(project), projectText);
        listItem.removeChild(editButton);
        deleteButton.style.display = 'none'; // Esconde o botão de deletar
        listItem.appendChild(createEditTasksContainer(project, index, deleteButton));
    });
    return editButton;
}

function createEditInput(project) {
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.value = project.name;
    editInput.className = 'edit-input';
    return editInput;
}

function createEditTasksContainer(project, index, deleteButton) {
    const editTasksContainer = document.createElement('div');
    project.tasks.forEach(task => {
        editTasksContainer.appendChild(createTaskCheckbox(task, true));
    });

    predefinedTasks.forEach(task => {
        if (!project.tasks.includes(task)) {
            editTasksContainer.appendChild(createTaskCheckbox(task, false));
        }
    });

    editTasksContainer.appendChild(createSaveButton(index, deleteButton));
    return editTasksContainer;
}

function createTaskCheckbox(task, isChecked) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = task;
    checkbox.value = task;
    checkbox.checked = isChecked;
    checkbox.className = 'task-checkbox';

    const label = document.createElement('label');
    label.htmlFor = task;
    label.appendChild(document.createTextNode(task));

    const container = document.createElement('div');
    container.appendChild(checkbox);
    container.appendChild(label);
    container.appendChild(document.createElement('br'));  // quebra de linha para layout

    return container;
}

function createSaveButton(index, deleteButton) {
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Salvar';
    saveButton.className = 'save-button';
    saveButton.addEventListener('click', function() {
        const editInput = document.querySelector('.edit-input');
        if (editInput.value.trim() !== '') {
            projects[index].name = editInput.value;

            // Atualiza as tarefas
            projects[index].tasks = [];
            predefinedTasks.forEach(task => {
                const checkbox = document.getElementById(task);
                if (checkbox.checked) {
                    projects[index].tasks.push(task);
                }
            });

            saveProjectsToLocalStorage();
            renderProjects();
        } else {
            alert('O nome do projeto não pode estar em branco.');
        }
        deleteButton.style.display = 'block'; // Mostra o botão de deletar novamente
    });
    return saveButton;
}

function renderProjects() {
    const projectList = document.getElementById('project-list');
    projectList.innerHTML = '';

    projects.forEach((project, index) => {
        projectList.appendChild(createProjectListItem(project, index));
    });
}

document.getElementById('new-project-button').addEventListener('click', function() {
    const projectName = document.getElementById('new-project-input').value;
    if (projectName) {
        const newProject = {
            name: projectName,
            tasks: []
        };

        const tasksContainer = document.getElementById('predefined-tasks');
        tasksContainer.innerHTML = '';  // limpa quaisquer checkboxes existentes

        predefinedTasks.forEach(task => {
            tasksContainer.appendChild(createTaskCheckbox(task, false));
        });

        // Adiciona um botão para confirmar a seleção de tarefas
        const confirmButton = document.createElement('button');
        confirmButton.textContent = 'Confirmar';
        confirmButton.className = 'confirm-button';
        confirmButton.addEventListener('click', function() {
            predefinedTasks.forEach(task => {
                const checkbox = document.getElementById(task);
                if (checkbox.checked) {
                    newProject.tasks.push(task);
                }
            });

            projects.push(newProject);
            document.getElementById('new-project-input').value = '';
            saveProjectsToLocalStorage();
            renderProjects();

            // Limpa as tarefas e o botão de confirmação
            tasksContainer.innerHTML = '';
        });

        tasksContainer.appendChild(confirmButton);
    }
});

renderProjects();