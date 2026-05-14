function calculateWinrate() {
    // Получаем значения из полей
    const wins = parseInt(document.getElementById('wins').value) || 0;
    const losses = parseInt(document.getElementById('losses').value) || 0;
    const resultElement = document.getElementById('wr-result');

    const totalGames = wins + losses;

    if (totalGames === 0) {
        resultElement.innerText = "0%";
        resultElement.style.color = "#f0e6d2";
        return;
    }

    // Считаем процент
    const winrate = ((wins / totalGames) * 100).toFixed(1);

    // Выводим результат
    resultElement.innerText = winrate + "%";

    // Меняем цвет в зависимости от результата
    if (winrate >= 50) {
        resultElement.style.color = "#10b981"; // Зеленый для 50%+
    } else {
        resultElement.style.color = "#ef4444"; // Красный для < 50%
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userName = localStorage.getItem('userName');

    const guestView = document.getElementById('guest-view');
    const authView = document.getElementById('auth-view');

    if (isLoggedIn === 'true' && userName) {
        // Пользователь авторизован
        guestView.style.display = 'none';
        authView.style.display = 'block';
        document.getElementById('user-nickname').innerText = userName;
        
        loadStatsFromServer(userName);
    } else {
        // Пользователь — гость
        guestView.style.display = 'block';
        authView.style.display = 'none';
    }
});

async function loadStatsFromServer(username) {
    try {
        const response = await fetch(`http://127.0.0.1:5000/api/stats/${username}`);
        if (response.ok) {
            const data = await response.json();
            
            // Обновляем данные на странице (примеры ID)
            if(document.getElementById('stat-wins')) {
                document.getElementById('stat-wins').innerText = data.wins;
                document.getElementById('stat-losses').innerText = data.losses;
                document.getElementById('stat-rank').innerText = data.rank_name;
            }
        }
    } catch (err) {
        console.error("Не удалось загрузить статистику из БД:", err);
    }
}

// Функция для выхода
function logout() {
    localStorage.clear();
    window.location.href = 'glavnaia.html';
}

document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logout-btn');

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            // Удаляем данные из localStorage
            localStorage.removeItem('userName'); 
            localStorage.removeItem('isLoggedIn');

            // Возвращаем на страницу входа
            window.location.href = '/login';
        });
    }
});