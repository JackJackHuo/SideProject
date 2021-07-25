
class CreateCharactor{
    constructor(name, hp , mp ){
        this.name = name
        this.hp = hp
        this.mp = mp
      
    }
    
    attack(){
        let damage = Math.floor(Math.random() * 50 )+1
        return damage
    }

    cure(mp){
        
        if(mp>30){
          return 15
        }
        if(mp <= 30){
          return Math.floor(mp/2)
          
        }
        
    }
}

  
  const magician = new CreateCharactor('Magician' , 30 , 100)
  const warrior = new CreateCharactor('Warrior' , 100 , 30)

  console.log(warrior)
  console.log(magician)
  while(warrior.hp > 0 && magician.hp > 0){
    warriorAttack()
    magicianAttack()
  }

  console.log(warrior)
  console.log(magician)

function warriorAttack(){   
        let damage = warrior.attack()
        let magicianHP = magician.hp
        magician.hp = magician.hp - damage
        console.log(`======${warrior.name} attack======` )
        console.log(`${warrior.name} attack ${damage}` )
        console.log(`${magician.name} remaining HP = ${magician.hp} (${magicianHP} - ${damage})` )
        if(magician.hp > 0){
            let remedy = magician.cure(magician.mp)
            console.log(`${magician.name} MP = ${magician.mp}` )
            magician.hp = magician.hp + remedy
            console.log(`${magician.name} HP +  ${remedy} = ${magician.hp} HP` )
            magician.mp = magician.mp - (remedy *2)
        }else{
          console.log(`==========RESULT==========` )
          console.log(`${magician.name} KILLED!!!` )
          console.log(`${warrior.name} WINS!!!` )
        }
  }
  function magicianAttack(){
    if(magician.hp > 0){
        let damage = magician.attack()
        let warriorHP = warrior.hp
        warrior.hp = warrior.hp - damage
        console.log(`======${magician.name} attack======` )
        console.log(`${magician.name} attack ${damage}` )
        console.log(`${warrior.name} remaining HP = ${warrior.hp} (${warriorHP} - ${damage})` )
        if(warrior.hp > 0){
          let remedy = warrior.cure(warrior.mp)
          warrior.hp = warrior.hp + remedy
          console.log(`${warrior.name} MP = ${warrior.mp}` )          
          console.log(`${warrior.name} HP +  ${remedy} = ${warrior.hp} HP` )
          warrior.mp = warrior.mp - (remedy*2)
        }else{
          console.log(`==========RESULT==========` )
          console.log(`${warrior.name} KILLED!!!` )      
          console.log(`${magician.name} WINS!!!` )
        }
    }
  }
  
 
