async function loadStats(userId) {
    try {
        const response = await fetch(`http://localhost:3000/api/stats/${userId}`);
        const data = await response.json();
        
        // Обновляем страницу данными из базы
        document.getElementById('wins').innerText = data.wins;
        document.getElementById('losses').innerText = data.losses;
    } catch (error) {
        console.error("Ошибка загрузки данных:", error);
    }
}

function checkAuth() {
    // Проверяем, есть ли в браузере сохраненный токен или никнейм
    const userToken = localStorage.getItem('userToken');
    const userName = localStorage.getItem('userName');

    const guestView = document.getElementById('guest-view');
    const authView = document.getElementById('auth-view');

    if (userToken) {
        // Если залогинен
        guestView.style.display = 'none';
        authView.style.display = 'block';
        document.getElementById('user-nickname').innerText = userName;
        
        // Здесь вызываем функцию, которая качает данные из MySQL через Backend
        loadUserStatsFromServer(userToken); 
    } else {
        // Если не залогинен
        guestView.style.display = 'block';
        authView.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', checkAuth);