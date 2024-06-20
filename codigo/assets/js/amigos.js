let friends = JSON.parse(localStorage.getItem('friends')) || [];

function renderFriends() {
    const friendsList = document.getElementById('friends-list');
    friendsList.innerHTML = '';

    friends.forEach(friend => {
        const li = document.createElement('li');
        li.textContent = friend;
        li.onclick = () => removeFriend(friend);
        friendsList.appendChild(li);
    });
}

function addFriend() {
    const friendInput = document.getElementById('friend-name');
    const friendName = friendInput.value.trim();

    if (friendName !== '') {
        friends.push(friendName);
        localStorage.setItem('friends', JSON.stringify(friends)); // Armazenar no Local Storage
        renderFriends();
        friendInput.value = '';
    }
}

function removeFriend(name) {
    friends = friends.filter(friend => friend !== name);
    localStorage.setItem('friends', JSON.stringify(friends)); // Atualizar no Local Storage
    renderFriends();
}

function searchFriend() {
    const query = document.getElementById('search-friend').value.trim().toLowerCase();
    const filteredFriends = friends.filter(friend => friend.toLowerCase().includes(query));
    renderFilteredFriends(filteredFriends);
}

function renderFilteredFriends(filteredFriends) {
    const friendsList = document.getElementById('friends-list');
    friendsList.innerHTML = '';

    filteredFriends.forEach(friend => {
        const li = document.createElement('li');
        li.textContent = friend;
        li.onclick = () => removeFriend(friend);
        friendsList.appendChild(li);
    });
}

// Renderizar amigos na inicialização
renderFriends();