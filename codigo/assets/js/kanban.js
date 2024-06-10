document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('add-project-form');
    const projectNameInput = document.getElementById('project-name');
    const projectStatusSelect = document.getElementById('project-status');
    const projectEndDateInput = document.getElementById('project-end-date');

    const pendingList = document.getElementById('pending-list');
    const activeList = document.getElementById('active-list');
    const finishedList = document.getElementById('finished-list');

    const projects = JSON.parse(localStorage.getItem('kanban-projects')) || [];

    const friends = ['Amigo 1', 'Amigo 2', 'Amigo 3', 'Amigo 4', 'Amigo 5'];

    const renderProjects = () => {
        pendingList.innerHTML = '';
        activeList.innerHTML = '';
        finishedList.innerHTML = '';

        projects.forEach((project, index) => {
            const li = document.createElement('li');
            li.className = 'project';

            const endDate = new Date(project.endDate);
            const formattedEndDate = endDate.toLocaleDateString('pt-BR');

            li.textContent = `${project.name} - Data de finalização: ${formattedEndDate}`;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Deletar';
            deleteButton.addEventListener('click', () => {
                projects.splice(index, 1);
                localStorage.setItem('kanban-projects', JSON.stringify(projects));
                renderProjects();
            });

            const shareButton = document.createElement('button');
            shareButton.textContent = 'Editar colaboradores';
            shareButton.addEventListener('click', () => {
                const existingFriendList = li.querySelector('.friend-list');
                if (existingFriendList) {
                    li.removeChild(existingFriendList);
                } else {
                    const friendList = document.createElement('ul');
                    friendList.classList.add('friend-list');
                    friends.forEach(friend => {
                        const friendLi = document.createElement('li');
                        friendLi.textContent = friend;

                        friendLi.addEventListener('click', () => {
                            const addedFriend = document.createElement('p');
                            addedFriend.textContent = `Amigo adicionado: ${friend}`;

                            const removeButton = document.createElement('button');
                            removeButton.textContent = 'Remover';
                            removeButton.addEventListener('click', () => {
                                li.removeChild(addedFriend);
                                friendList.appendChild(friendLi);

                                const friendIndex = project.friends.indexOf(friend);
                                if (friendIndex > -1) {
                                    project.friends.splice(friendIndex, 1);
                                    localStorage.setItem('kanban-projects', JSON.stringify(projects));
                                }
                            });

                            addedFriend.appendChild(removeButton);
                            li.appendChild(addedFriend);
                            friendList.removeChild(friendLi);

                            if (!project.friends.includes(friend)) {
                                project.friends.push(friend);
                                localStorage.setItem('kanban-projects', JSON.stringify(projects));
                            }
                        });
                        friendList.appendChild(friendLi);
                    });
                    li.appendChild(friendList);
                }
            });

            project.friends.forEach(friend => {
                const addedFriend = document.createElement('p');
                addedFriend.textContent = `Amigo adicionado: ${friend}`;

                const removeButton = document.createElement('button');
                removeButton.textContent = 'Remover';
                removeButton.addEventListener('click', () => {
                    li.removeChild(addedFriend);

                    const friendIndex = project.friends.indexOf(friend);
                    if (friendIndex > -1) {
                        project.friends.splice(friendIndex, 1);
                        localStorage.setItem('kanban-projects', JSON.stringify(projects));
                    }

                    renderProjects();
                });

                addedFriend.appendChild(removeButton);
                li.appendChild(addedFriend);
            });

            const statusButton = document.createElement('button');
            statusButton.textContent = 'Mudar status';
            statusButton.addEventListener('click', () => {
                if (project.status === 'pending') {
                    project.status = 'active';
                } else if (project.status === 'active') {
                    project.status = 'finished';
                } else if (project.status === 'finished') {
                    project.status = 'pending';
                }

                localStorage.setItem('kanban-projects', JSON.stringify(projects));
                renderProjects();
            });

            li.appendChild(deleteButton);
            li.appendChild(shareButton);
            li.appendChild(statusButton);

            if (project.status === 'pending') {
                pendingList.appendChild(li);
            } else if (project.status === 'active') {
                activeList.appendChild(li);
            } else if (project.status === 'finished') {
                finishedList.appendChild(li);
            }
        });
    };

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = projectNameInput.value;
        const status = projectStatusSelect.value;
        const endDate = projectEndDateInput.value;

        if (!name.trim()) {
            return;
        }

        projects.push({ name, status, endDate, friends: [] });
        localStorage.setItem('kanban-projects', JSON.stringify(projects));

        projectNameInput.value = '';
        projectStatusSelect.value = 'pending';
        projectEndDateInput.value = '';

        renderProjects();
    });

    renderProjects();
});