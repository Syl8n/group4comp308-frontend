const cardArray = [
    {
        name: 'stethoscope',
        img: 'images/stethoscope.png',
    },
    {
        name: 'doctor',
        img: 'images/doctor.png',
    },
    {
        name: 'case',
        img: 'images/case.png',
    },
    {
        name: 'heart',
        img: 'images/heart.png',
    },
    {
        name: 'hospital',
        img: 'images/hospital.png'
    },
    {
        name: 'ambulance',
        img: 'images/ambulance.png'
    },
    {
        name: 'stethoscope',
        img: 'images/stethoscope.png',
    },
    {
        name: 'doctor',
        img: 'images/doctor.png',
    },
    {
        name: 'case',
        img: 'images/case.png',
    },
    {
        name: 'heart',
        img: 'images/heart.png',
    },
    {
        name: 'hospital',
        img: 'images/hospital.png'
    },
    {
        name: 'ambulance',
        img: 'images/ambulance.png'
    }
]

cardArray.sort(() => 0.5 - Math.random())

const gridDisplay = document.querySelector('#grid')
const resultDisplay = document.querySelector('#result')
let cardsChosen = []
let cardsChosenIds = []
const cardsWon =[]

function createBoard () {
    for (let i = 0; i < cardArray.length; i++ ){
        const card = document.createElement('img')
        card.setAttribute('src', 'images/blank.png')
        card.setAttribute('data-id', i)
        card.addEventListener('click', flipCard)
        gridDisplay.append(card)
    }
}

createBoard()

function checkMatch() {
    const cards = document.querySelectorAll('img')
    const optionOneId = cardsChosenIds[0]
    const optionTwoId = cardsChosenIds[1]
    console.log(cards)
    console.log('check for match!')
    if (optionOneId == optionTwoId) {
        alert ('You have clicked the same image!')
        cards[optionOneId].setAttribute('src', 'images/blank.png')
        cards[optionTwoId].setAttribute('src', 'images/blank.png')
    }

    if (cardsChosen[0] == cardsChosen[1] && optionOneId != optionTwoId)  {
        alert ('You found a match!')
       cards[optionOneId].setAttribute('src', 'images/white.png')
       cards[optionTwoId].setAttribute('src', 'images/white.png')
       cards[optionOneId].removeEventListener('click', flipCard)
       cards[optionTwoId].removeEventListener('click', flipCard)
       cardsWon.push(cardsChosen)
    } else {
        cards[optionOneId].setAttribute('src', 'images/blank.png')
        cards[optionTwoId].setAttribute('src', 'images/blank.png')
    }
    resultDisplay.textContent = cardsWon.length

    cardsChosen = []
    cardsChosenIds = []

    if(cardsWon.length == cardArray.length/2) {
        resultDisplay.textContent = 'Congratulations you found them all!'
    }
}

function flipCard() {
   const cardId = this.getAttribute('data-id')
   cardsChosen.push(cardArray[cardId].name)
   cardsChosenIds.push(cardId)
   console.log(cardsChosen)
   console.log(cardsChosenIds)
    this.setAttribute('src', cardArray[cardId].img)
    if (cardsChosen.length === 2) {
        setTimeout( checkMatch, 500)
    }
}












