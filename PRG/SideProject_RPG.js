
class CreateCharactor{
    constructor(name, hp , mp ){
        this.name = name
        this.hp = hp
        this.mp = mp
      
    }
    
    attack(enemy){
      let result = ''  
      let damage = Math.floor(Math.random() * 50 )+1
      enemy.hp = enemy.hp - damage
      console.log(`${this.name} attack ${enemy.name} ${enemy.name} loses ${damage} points`)
      if(enemy.hp > 0){
        result = `${enemy.name} still alive (HP = ${enemy.hp})`
      }else if(enemy.hp < 0){
        result = `${enemy.name} is dead`
      }  
      return result
    }

    cure(defaultHpGain){
      let result = ''
      let remedy
      if(this.hp > 0){
        if(this.mp >= 30){
          remedy = defaultHpGain
          this.hp = this.hp + defaultHpGain
          this.mp = this.mp - defaultHpGain*2
        }else if(this.mp < 30){
          remedy = Math.floor(this.mp/2)
          this.hp = this.hp + remedy
          this.mp = this.mp - 2* remedy
        }
        result = `${this.name} HP recovered ${remedy} (HP = ${this.hp} MP = ${this.mp})\n====== CHANGE SIDE ======`         
      }else{
        result = `GAME OVER`
      }       
      return result
    }
}

console.log('====== CREATE PLAYERS ======')
  const magician = new CreateCharactor('Magician' , 50 , 100)
  const warrior = new CreateCharactor('Warrior' , 100 , 59  )

  console.log(warrior)
  console.log(magician)

  console.log('====== START FIGHT ======')
  while(warrior.hp > 0 && magician.hp > 0){
    console.log(warrior.attack(magician))
    console.log(magician.cure(15))
    if(magician.hp > 0){
      console.log(magician.attack(warrior))
      console.log(warrior.cure(15))
      } 
  }



