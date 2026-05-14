document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('login-user').value;
    const password = document.getElementById('login-pass').value;

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();

        if (response.ok) {
            // Запоминаем, что пользователь вошел
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userName', username);
            
            window.location.href = '/stats'; // Идем смотреть статистику
        } else {
            alert("Неверный логин или пароль");
        }
    } catch (error) {
        console.error("Ошибка при входе:", error);
    }
});