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
  shuffleArr(arr) {
    const randomArr = []
    while (arr.length > 0) {
      const randomSelect = Math.floor(Math.random() * arr.length)
      const randomIndex = arr.splice(randomSelect, 1)
      randomArr.push(randomIndex[0])
    }
    return randomArr
  },
  getRandomNumberArray(count) {
    const number = Array.from(Array(count).keys())
    for (let index = number.length - 1; index > 0; index--) {
      let randomIndex = Math.floor(Math.random() * (index + 1)); //;不可省略
      [number[index], number[randomIndex]] = [number[randomIndex], number[index]]
    }
    return number
  }
}
const view = {

  displayCards(cardArr) {
    const rootElement = document.querySelector('#cards')
    rootElement.innerHTML = cardArr.map(index => this.getCardElement(index)).join('')
    // rootElement.innerHTML = this.shuffleArr(Array.from(Array(52).keys())).map(index => this.getCardElement(index)).join('')
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
}
}
const model = {
  revealCards: [],
  isRevealedCardsMatched(){
    return model.revealCards[0].dataset.index % 13 === model.revealCards[1].dataset.index % 13
  },
  score: 0,
  triedTimes: 0
}

const controller = {
  currentSTATE: GAME_STATE.FirstCardAwaits,
  generateCards(){
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
          this.currentSTATE = GAME_STATE.FirstCardAwaits
        }else{
          this.currentState = GAME_STATE.CardsMatchFailed
          view.appendWrongAnimation(...model.revealCards)
          setTimeout(this.resetCard, 1000);             
        }

      break
      // case GAME_STATE.CardsMatched:
      //   model.score+=10
      //   console.log(model.score)
      //   if(model.score === 260){
      //     this.currentSTATE = GAME_STATE.GameFinished
      //   }else{
      //     this.currentSTATE = GAME_STATE.FirstCardAwaits
      //   }
      // break
      // case GAME_STATE.CardsMatchFailed:
      //   setInterval(() => { 
      //     document.querySelector(`[data-index = '${model.revealCards[0]}']`).classList.add('back')
      //     document.querySelector(`[data-index = '${model.revealCards[1]}']`).classList.add('back')
      //     model.revealCards = []
      //   }, 3000);
      // break
      // case GAME_STATE.GameFinished:
      //   console.log('finished')
        
    }
    console.log('current state', this.currentSTATE)
    console.log('revealCard', model.revealCards)
  },
  resetCard() {
    view.flipCards(...model.revealCards)
    model.revealCards = []
    controller.currentSTATE = GAME_STATE.FirstCardAwaits
  }
}

controller.generateCards()

document.querySelectorAll('.card-primary').forEach(card => card.addEventListener('click', cardClicked = event =>{
  
  controller.dispatchCardAction(card)
  // view.appendWrongAnimation(card)
}))