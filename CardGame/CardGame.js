const GAME_STATE = {
  FirstCardAwaits: "FirstCardAwaits",
  SecondCardAwaits: "SecondCardAwaits",
  CardsMatchFailed: "CardsMatchFailed",
  CardsMatched: "CardsMatched",
  GameFinished: "GameFinished",
}
const Symbols = [
  'https://image.flaticon.com/icons/svg/105/105223.svg',
  'https://image.flaticon.com/icons/svg/105/105220.svg',
  'https://image.flaticon.com/icons/svg/105/105212.svg',
  'https://image.flaticon.com/icons/svg/105/105219.svg'
]
const utility = {
  shuffleArr(count) {
    const arr = Array.from(Array(count).keys())
    const randomArr = []
    while (arr.length > 0) {
      const randomSelect = Math.floor(Math.random() * arr.length)
      randomArr.push(arr.splice(randomSelect, 1))
    }
    return randomArr
  },
  getRandomNumberArray(count) {
    const arr = Array.from(Array(count).keys())
    for (let index = arr.length - 1; index > 0; index--) {
      let randomIndex = Math.floor(Math.random() * (index + 1)); //不可省略';' Math.floor(Math.random() * n)[...]
      [arr[index], arr[randomIndex]] = [arr[randomIndex], arr[index]]
    }
    return arr
  }
}
const view = {

  displayCards(cardArr) {
    const rootElement = document.querySelector('#cards')
    rootElement.innerHTML = cardArr.map(index => this.getCardElement(index)).join('')
  },
  getCardElement(index) {
    return `
    <div class="card-primary card-inside back" data-index="${index}"></div>
    `
  },
  getCardContent(index) {
    const number = this.transformNumber(index % 13 + 1)
    const symbolIndex = Math.floor(index / 13)
    return `
      <p>${number}</p>
      <img src=${Symbols[symbolIndex]} alt="">
      <p>${number}</p>
    `
  },
  transformNumber(number) {
    switch (number) {
      case 1: return 'A'
      case 11: return 'J'
      case 12: return 'Q'
      case 13: return 'K'
      default: return number
    }
  },
  flipCards(...cards){
    cards.map( card => {
      if (card.classList.contains('back')) {
        card.classList.remove('back')
        card.innerHTML = this.getCardContent(+card.dataset.index)
      } else if (!card.classList.contains('back')) {
        card.classList.add('back')
        card.innerHTML = null
      }
    })  
  },
  pairCards(...cards) {
    cards.map(card =>{
      card.classList.add('paired')
    })
  },
  renderScore(score) {
    document.querySelector(".score").innerHTML = `Score: ${score}`;
  },

  renderTriedTimes(times) {
    document.querySelector(".tried").innerHTML = `You've tried: ${times} times`;
  },
  appendWrongAnimation(...cards){
    cards.map(card => {
      card.classList.add('wrong')
      card.addEventListener('animationend', event => {
        // console.log(event.target)
        // console.log(this)
        // this.classList.remove('wrong')
        event.target.classList.remove('wrong')
      })
    })
  },
  showGameFinished(){
    const div = document.createElement('div')
    div.classList.add('completed')
    div.innerHTML = `
      <p>Complete!</p>
      <p>Score: ${model.score}</p>
      <p>You've tried: ${model.triedTimes} times</p>
    `
    const header = document.querySelector('#header')
    header.before(div)
  }
}
const model = {
  revealCards: [],
  isRevealedCardsMatched(){
    return this.revealCards[0].dataset.index % 13 === this.revealCards[1].dataset.index % 13
  },
  score: 250,
  triedTimes: 0
}

const controller = {
  currentSTATE: GAME_STATE.FirstCardAwaits,
  generateCards(){
    // view.displayCards(utility.shuffleArr(52))
    view.displayCards(utility.getRandomNumberArray(52))
  } ,
  dispatchCardAction(card){
    if(!card.classList.contains('back')) return

    switch(this.currentSTATE){

      case GAME_STATE.FirstCardAwaits:
        view.flipCards(card)
        model.revealCards.push(card)
        this.currentSTATE = GAME_STATE.SecondCardAwaits
      break    

      case GAME_STATE.SecondCardAwaits:
        view.renderTriedTimes(++model.triedTimes)
        view.flipCards(card)
        model.revealCards.push(card)

        if (model.isRevealedCardsMatched()){
          this.currentState = GAME_STATE.CardsMatched
          view.renderScore(model.score+=10)
          view.pairCards(...model.revealCards)
          model.revealCards = []

          if(model.score === 260){
            this.currentSTATE = GAME_STATE.GameFinished
            view.showGameFinished()
            return
          }
          this.currentSTATE = GAME_STATE.FirstCardAwaits

        }else{
          this.currentState = GAME_STATE.CardsMatchFailed
          view.appendWrongAnimation(...model.revealCards)
          setTimeout(this.resetCard, 1000);             
        }
      break       
    }
  },
  resetCard(){
    view.flipCards(...model.revealCards)
    model.revealCards = []
    controller.currentSTATE = GAME_STATE.FirstCardAwaits
  }
}

controller.generateCards()

document.querySelectorAll('.card-primary').forEach(card => card.addEventListener('click', cardClicked = event =>{

  controller.dispatchCardAction(card)

}))