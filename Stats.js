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