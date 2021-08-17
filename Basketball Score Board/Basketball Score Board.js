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
      for(key in player ){
        if(key === 'name'){
          replace += `
          <td>${player[key]}</td>
          `
        }else{
          replace += `
          <td>
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
  let plusArr = document.querySelectorAll("i[class*='plus']")
  let minusArr = document.querySelectorAll("i[class*='minus']")
  plusArr.forEach(item => {
    item.addEventListener('click', valuePlus)
    function valuePlus(){ 
      let numberValue = Number(this.previousElementSibling.innerHTML) + 1
      this.previousElementSibling.innerHTML = numberValue  
    }
  })
  for(item of minusArr){
    item.addEventListener('click', valueMinus)
    function valueMinus(){
      let numberValue = Number(this.parentElement.children[0].innerHTML) - 1
      this.parentElement.children[0].innerHTML = numberValue  
    }
  }
  