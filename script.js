const games = [
    {title: "Каркассон", players: 4, borrower: null},
    {title: "Доббль", players: 6, borrower: 'Аня'},
    {title: "Шахматы", players: 2, borrower: null}
]

const borrowButton = document.getElementById('borrowButton')
const returnButton = document.getElementById('returnButton')
const selectGame = document.getElementById('gameSelect')
const gameList = document.getElementById('gameList')
const borrowerName = document.getElementById('borrowerName')
const errorName = document.getElementById('ErrorName')
const message = document.getElementById('message')
const showHint = document.getElementById('showHint')

function renderGames() {
    gameList.innerHTML = ''
    games.forEach((el) => {
        const li = document.createElement('li')
        if (el.borrower === null) {
            li.append(`${el.title} - ${el.players} - Свободно`)
        } else {
            li.append(`${el.title} - ${el.players} - взял(а) ${el.borrower}`)
        }  
        if (showHint.checked === true) {
            // Дописать код, начал делать второе
        }
        gameList.append(li)
        console.log(gameList)
    });
}

function clear() {
    message.innerHTML = ''
    errorName.innerHTML = ''
}

borrowButton.addEventListener('click', () => {
    clear();
    let selectedGame = games[Number(selectGame.value)]
    const borrowerNameValueTrim = borrowerName.value.trim()
    if (selectedGame.borrower !== null) {
        message.innerHTML = 'Игра уже выдана'
    }
    if (borrowerNameValueTrim === '') {
        errorName.innerHTML = 'Введите имя'
    }
    else if (selectedGame.borrower === null && borrowerName !== '') {
        selectedGame.borrower = borrowerNameValueTrim
    }
    renderGames();
})

returnButton.addEventListener('click', () => {
    clear();
    let selectedGame = games[Number(selectGame.value)]
    if (selectedGame.borrower !== null) {
        selectedGame.borrower = null
    }
    renderGames();
})

showHint.addEventListener('change', () => {
    renderGames();
})

renderGames();

