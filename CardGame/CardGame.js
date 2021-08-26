//定義遊戲狀態
const GAME_STATE = {
  FirstCardAwaits: "FirstCardAwaits",
  SecondCardAwaits: "SecondCardAwaits",
  CardsMatchFailed: "CardsMatchFailed",
  CardsMatched: "CardsMatched",
  GameFinished: "GameFinished",
}
// 花色連結
const Symbols = [
  'https://image.flaticon.com/icons/svg/105/105223.svg',
  'https://image.flaticon.com/icons/svg/105/105220.svg',
  'https://image.flaticon.com/icons/svg/105/105212.svg',
  'https://image.flaticon.com/icons/svg/105/105219.svg'
]

const utility = {
  //洗牌程式 1
  shuffleArr(count) {
    const arr = Array.from(Array(count).keys())
    const randomArr = []
    while (arr.length > 0) {
      const randomSelect = Math.floor(Math.random() * arr.length)
      randomArr.push(arr.splice(randomSelect, 1))
    }
    return randomArr
  },
  //洗牌程式 2
  getRandomNumberArray(count) {
    const arr = Array.from(Array(count).keys())
    for (let index = arr.length - 1; index > 0; index--) {
      let randomIndex = Math.floor(Math.random() * (index + 1)); //不可省略';' Math.floor(Math.random() * n)[...]
      [arr[index], arr[randomIndex]] = [arr[randomIndex], arr[index]]
    }
    return arr
  }
}
// MVC => V
const view = {

  displayCards(cardArr) {
    const rootElement = document.querySelector('#cards')
    rootElement.innerHTML = cardArr.map(index => this.getCardElement(index)).join('')
  },
  // 產生class含有back的element的literal template
  // 在element attribute中綁定card index提供之後點擊卡片使用
  getCardElement(index) {
    return `
    <div class="card-primary card-inside back" data-index="${index}"></div>
    `
  },
  // 產生卡片內部的literal template
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
  // ...將多個傳入韓式的參數轉換成陣列
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
  // 點擊正確的卡片樣式
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
  // 點擊錯誤的卡片動畫
  appendWrongAnimation(...cards){
    cards.map(card => {
      card.classList.add('wrong')
      card.addEventListener('animationend', event => {
        event.target.classList.remove('wrong')
        // console.log(event.target)
        // console.log(this)
        // this.classList.remove('wrong')
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
  score: 0,
  triedTimes: 0
}

const controller = {
  currentSTATE: GAME_STATE.FirstCardAwaits,
  // invoke洗牌函式來發牌
  generateCards(){
    // view.displayCards(utility.shuffleArr(52))
    view.displayCards(utility.getRandomNumberArray(52))
  } ,
  // 配發狀態來控制遊戲流程
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
          setTimeout(this.resetCard,1000);             
        }
      break       
    }
  },
  resetCard(){
    view.flipCards(...model.revealCards)
    model.revealCards = []
    controller.currentSTATE = GAME_STATE.FirstCardAwaits
    // 這裡不能用this.currentSTATE是因為resetCard函式現在是setTimeout這個WebAPI在使用，this會指向window
  }
}
//發牌
controller.generateCards()
// 每一張牌上綁監聽器
document.querySelectorAll('.card-primary').forEach(card => card.addEventListener('click', cardClicked = event =>{

  controller.dispatchCardAction(card)

}))