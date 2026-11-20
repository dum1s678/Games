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

const games = [
    { title: "Каркассон", players: 4, borrower: [], quantity: 4},
    { title: "Доббль", players: 6, borrower: ['Аня'], quantity: 5},
    { title: "Шахматы", players: 2, borrower: [], quantity: 3}
]

renderGameOptions();

function renderGames() {
    gameList.innerHTML = ''
    games.forEach((el) => {
        const li = document.createElement('li')
        const freeGameCopy = el.quantity - el.borrower.length
        
        if (showHint.checked === true) {
            if (freeGameCopy > 0) {
                li.append(`${el.title} - ${el.players} - Свободно - ${freeGameCopy} шт.`)
                gameList.append(li)
            }
        }
        else {
            if (el.borrower.length === 0) {
                li.append(`${el.title} - ${el.players} - Свободно - ${freeGameCopy} шт.`)
            } else {
                li.append(`${el.title} - ${el.players} - взял(а) ${el.borrower.join(', ')} - ${freeGameCopy} шт.`)
            }
            gameList.append(li)
        }
    });
}

function renderGameOptions() {
    selectGame.innerHTML = ''
    let count = 0
    
    games.forEach((el) => {
        const option = document.createElement('option')
        option.textContent = el.title
        option.value = count
        selectGame.append(option)
        count++
    })
    renderGames();
}

function clear() {
    message.innerHTML = ''
    errorName.innerHTML = ''
}

borrowButton.addEventListener('click', () => {
    clear();
    let selectedGame = games[Number(selectGame.value)]
    const name = borrowerName.value.trim()
    
    if (name === '') {
        errorName.innerHTML = 'Введите имя'
        return
    }
    if (selectedGame.borrower.includes(name)) {
        message.innerHTML = 'Игра уже выдана'
        return
    }
    if (selectedGame.borrower.length >= selectedGame.quantity) {
        message.innerHTML = "Все копии игры уже выданы"
        return
    }
    
    selectedGame.borrower.push(name)
    renderGames()
})
renderGameOptions();

returnButton.addEventListener('click', () => {
    clear();
    let selectedGame = games[Number(selectGame.value)]
    const name = borrowerName.value.trim()
    const idx = selectedGame.borrower.indexOf(name)
    
    if (name === '') {
        errorName.innerHTML = "Введите имя"
        return
    }
    if (idx === -1) {
        message.innerHTML = "Этот игрок не брал игру"
        return
    }
    
    selectedGame.borrower.splice(idx, 1)
    renderGames();
})

addButton.addEventListener('click', () => {
    const nameGameValue = nameGame.value
    const quantityPlayersValue = quantityPlayers.value
    if (nameGameValue !== '' && quantityPlayersValue > 0) {
        const newGame = {
            title: nameGameValue,
            players: quantityPlayersValue,
            borrower: [],
            quantity: quantityPlayersValue
        }
        games.push(newGame)
    }
    renderGames();
    renderGameOptions();
})

showHint.addEventListener('change', () => {
    renderGames();
})

renderGames();
