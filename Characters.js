function searchChampion() {
    let input = document.getElementById('champSearch').value.toLowerCase();
    let champions = document.querySelectorAll('.champion');

    champions.forEach(champ => {
        let name = champ.querySelector('p').innerText.toLowerCase();
        
        if (name.includes(input)) {
            champ.style.display = "flex"; 
        } else {
            champ.style.display = "none"; 
        }
    });
}