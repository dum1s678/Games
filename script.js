const games = [
    { title: "Каркассон", players: 4, borrower: null },
    { title: "Доббль", players: 6, borrower: 'Аня' },
    { title: "Шахматы", players: 2, borrower: null }
]

const borrowButton = document.getElementById('borrowButton')
const returnButton = document.getElementById('returnButton')
const selectGame = document.getElementById('gameSelect')
const gameList = document.getElementById('gameList')
const borrowerName = document.getElementById('borrowerName')
const errorName = document.getElementById('ErrorName')
const message = document.getElementById('message')
const showHint = document.getElementById('showHint')
const addButton = document.getElementById('addButton')
const nameGame = document.getElementById('NameGame')
const quantityPlayers = document.getElementById('QuantityPlayers')

function renderGames() {
    gameList.innerHTML = ''
    games.forEach((el) => {
        const li = document.createElement('li')
        if (showHint.checked === true) {
            if (el.borrower === null) {
                li.append(`${el.title} - ${el.players} - Свободно`)
                gameList.append(li)
            }
        }
        else {
            if (el.borrower === null) {
                li.append(`${el.title} - ${el.players} - Свободно`)
            } else {
                li.append(`${el.title} - ${el.players} - взял(а) ${el.borrower}`)
            }
            gameList.append(li)
        }
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

addButton.addEventListener('click', () => {
    const nameGameValue = nameGame.value
    const quantityPlayersValue = quantityPlayers.value
    if (nameGameValue !== '' && quantityPlayersValue > 0) {
        const newGame = {
            title: nameGameValue,
            players: quantityPlayersValue,
            borrower: null
        }
        games.push(newGame)
    }
    renderGames();
})

showHint.addEventListener('change', () => {
    renderGames();
})

renderGames();

