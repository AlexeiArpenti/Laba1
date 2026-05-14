document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('reg-user').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-pass').value;
    const confirm = document.getElementById('reg-pass-confirm').value;

    if (password !== confirm) {
        alert("Пароли не совпадают!");
        return;
    }

    const payload = {
        username: username,
        email: email,
        password: password
    };

    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (response.status === 201) {
            alert("Аккаунт успешно создан!");
            window.location.href = '/login'; // Переход на страницу входа
        } else {
            alert("Ошибка: " + result.message);
        }
    } catch (error) {
        console.error("Ошибка сети:", error);
        alert("Не удалось связаться с сервером.");
    }
});