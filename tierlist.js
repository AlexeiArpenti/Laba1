function filterRole(role) {
    // 1. Управляем кнопками
    const buttons = document.querySelectorAll('.role-filter-menu button');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        // Если текст кнопки совпадает с ролью (или по другому признаку), подсвечиваем её
        if (btn.getAttribute('onclick').includes(role)) {
            btn.classList.add('active');
        }
    });

    // 2. Показываем только нужные строки
    const rows = document.querySelectorAll('.role-row');
    rows.forEach(row => {
        if (row.classList.contains(role)) {
            row.style.display = 'table-row';
        } else {
            row.style.display = 'none';
        }
    });
}

// Запуск при загрузке страницы
document.addEventListener("DOMContentLoaded", function() {
    filterRole('top'); // Сразу включаем Топ
});