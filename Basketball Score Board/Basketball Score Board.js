let players = [
  { name: '櫻木花道', pts: 0, reb: 0, ast: 0, stl: 0, blk: 2 },
  { name: '流川楓', pts: 30, reb: 6, ast: 3, stl: 3, blk: 0 },
  { name: '赤木剛憲', pts: 16, reb: 10, ast: 0, stl: 0, blk: 5 },
  { name: '宮城良田', pts: 6, reb: 0, ast: 7, stl: 6, blk: 0 },
  { name: '三井壽', pts: 21, reb: 4, ast: 3, stl: 0, blk: 0 }
]

const dataPanel = document.querySelector('#data-panel')


// write your code here



displayPlayerList = (data) => {
  data.forEach(player => {
    let replace = ''
    var row = document.createElement('tr')
    dataPanel.appendChild(row)
    for (key in player) {
      if (key === 'name') {
        replace += `
        <td>${player[key]}</td>
        `
      } else {
        replace += `
        <td class="player_data">
        <span>${player[key]}</span>
        <i class="fa fa-plus-circle up"></i>
        <i class="fa fa-minus-circle down"></i> 
        </td>      
        `
      }
    }
    row.innerHTML = replace
  })
}
displayPlayerList(players)

//按鈕功能
let data = document.querySelectorAll("td[class*='data']")
data.forEach(item => {
  item.addEventListener('click', adjust)
  function adjust(event) {
    let target = event.target
    let stat = this.children[0]
    if (target.classList.contains("fa-plus-circle")) {
      let numberValue = +stat.innerHTML + 1
      stat.innerHTML = numberValue
    } else if (target.classList.contains("fa-minus-circle") && +stat.innerHTML > 0) {
      let numberValue = +stat.innerHTML - 1
      stat.innerHTML = numberValue
    }
  }
})

