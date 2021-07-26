// DATA /////////////////////////////////////

const players = [
    { name: 'Bernard', email: 'bernard@example.com' },
    { name: 'Youchi', email: 'youchi@example.com' },
    { name: 'Yenting', email: 'yenting@example.com' },
    { name: 'Angela', email: 'angela@example.com' },
    { name: 'Yvonne', email: 'yvonne@example.com' },
    { name: 'Ellen', email: 'ellen@example.com' },
    { name: 'Walter', email: 'walter@example.com' },
    { name: 'Kevin', email: 'kevin@example.com' },
    { name: 'Tim', email: 'tim@example.com' },
    { name: 'Russell', email: 'russell@example.com' }
  ]
  //// FUNCTIONS /////////////////////////////////////
  function drawWinner (players, prize) {
    // write your code here
    let drawnIndex = Math.floor(Math.random() * players.length)
    winner = players[drawnIndex]
    players.splice(drawnIndex,1)
    announceMsg (winner, prize)
    
  }
  
  function announceMsg (winner, prize) {
  // 請新增 encodeName 和 encodeEmail 函式進行字串處理
    //姓名保密
    function encodeName(name){
  
        name = name.slice(0,2) + '*'.repeat(name.length - 2)
        return name
    }
    //email保密
    function encodeEmail(email){
      split = email.split('@')
      halfName = split[0].slice(0,Math.floor(split[0].length / 2))
      newEmail = halfName + '...@' + split[1] 
      return newEmail
    }
  
    console.log(`${winner.number} | ${encodeName(winner.name)} | ${encodeEmail(winner.email)} | ${prize}`)
  }
  
  
  // add more functions here
  // 隨機產生彩票號碼
  function ticketNo(){
    let ticket = ''
    let ticketArray =[]
    let letter = ['A' , 'B' ,'C' , 'D' ,'E' , 'F' , 'G' , 'H' , 'I' , 'J' , 'K' , 'L' , 'M' , 'N' , 'O' , 'P' , 'Q' , 'R' , 'S' , 'T' , 'U' , 'V' , 'W' , 'X' , 'Y' , 'Z']
    let num = ['0','1','2','3','4','5','6','7','8','9']
  
  while(ticketArray.length < 2){
  alphaPick = Math.floor(Math.random()*26)
  ticketArray.push(letter[alphaPick])
  }
  while(ticketArray.length < 6){
  numPick = Math.floor(Math.random()*10)
  ticketArray.push(num[numPick])
  }
  
  ticketArray.forEach(function(item){
  ticket = ticket + item
  })
  return ticket
  }
  // EXECUTING /////////////////////////////////////
  
  // each player gets a lottery ticket
  
  //分配彩票號碼給買家
  players.forEach(function(item){
    item.number = ticketNo()
  })
  
  // draw 3 winners and announce the results
  drawWinner(players, '頭獎')
  drawWinner(players, '貮獎')
  drawWinner(players, '叁獎')
  
  // the rest of players get participation award
  function restPlayer(){
    players.forEach(function(item){
      announceMsg (item, '參加獎')
    })
  }
  
  restPlayer()
  
  
  // ===========1st Edition==============//
  //// FUNCTIONS /////////////////////////////////////
  // //姓名保密
  // function encriptName(name){
  
  //   newName = name.slice(0,2)
  //   while(newName.length < name.length)
  //   newName = newName + '*'
  //   return newName
  // }
  // //email保密
  // function encriptEmail(email){
  //   split = email.split('@')
  //   halfName = split[0].slice(0,Math.floor(split[0].length / 2))
  //   newEmail = halfName + '...@' + split[1] 
  //   return newEmail
  // }
  // // 隨機產生彩票號碼
  // function ticketNo(){
  //   let ticket = ''
  //   let ticketArray =[]
  //   let letter = ['A' , 'B' ,'C' , 'D' ,'E' , 'F' , 'G' , 'H' , 'I' , 'J' , 'K' , 'L' , 'M' , 'N' , 'O' , 'P' , 'Q' , 'R' , 'S' , 'T' , 'U' , 'V' , 'W' , 'X' , 'Y' , 'Z']
  //   let num = ['0','1','2','3','4','5','6','7','8','9']
  
  // while(ticketArray.length < 2){
  // alphaPick = Math.floor(Math.random()*26)
  // ticketArray.push(letter[alphaPick])
  // }
  // while(ticketArray.length < 6){
  // numPick = Math.floor(Math.random()*10)
  // ticketArray.push(num[numPick])
  // }
  
  // ticketArray.forEach(function(item){
  // ticket = ticket + item
  // })
  // return ticket
  // }
  
  // EXECUTING /////////////////////////////////////
  // //分配彩票號碼給買家
  // players.forEach(function(item){
  //   item.number = ticketNo()
  // })
  
  // // 抽出贏家
  // function result(players,prize){
  
  //   let drawnIndex = Math.floor(Math.random() * players.length)
  //   let playerName = players[drawnIndex].name
  //   let playerEmail = players[drawnIndex].email
  //   let ticketNumber = players[drawnIndex].number
  //   players.splice(drawnIndex,1)
  //   console.log(`${ticketNumber} | ${encriptName(playerName)} | ${encriptEmail(playerEmail)} | ${prize}`)
  // }
  // // 未抽重者獲得參加獎
  // function restPlayer(){
  //   players.forEach(function(item){
  //       let playerName = item.name
  //       let playerEmail = item.email
  //       let ticketNumber = item.number
  //       console.log(`${ticketNumber} | ${encriptName(playerName)} | ${encriptEmail(playerEmail)} | 參加獎`)
      
  //   })
  // }
  
  // result(players,'頭獎')
  // result(players,'二獎')
  // result(players,'三獎')
  // restPlayer()
  
  
  