
// let birthMonth = Number(prompt('請輸入出生月份'))
// let birthDay = Number(prompt('請輸入出生日期'))
let Month = prompt('請輸入出生月份')
let Day = prompt('請輸入出生日期')
let birthDate =  Month + '/' + Day
let birthMonth = Number(birthDate.split('/')[1])
let birthDay = Number(birthDate.split('/')[2])
let zodiacArr = []

class Horoscope{
    constructor(sign,startMonth,startDay,endMonth,endDay){
        this.sign = sign
        this.startMonth = startMonth 
        this.startDay = startDay
        this.endMonth = endMonth
        this.endDay = endDay
    }
    Push(){
        zodiacArr.push(this)
    }
}
//建立12星座資料並且推進陣列中
new Horoscope('Aries', 3, 21, 4, 19).Push()
new Horoscope('Taurus', 4, 20, 5, 20).Push() 
new Horoscope('Gemini', 5, 21, 6, 21).Push()
new Horoscope('Cancer', 6, 21, 7, 19).Push()
new Horoscope('Leo', 7, 23, 8, 22).Push()
new Horoscope('Virgo', 8, 23, 9, 22).Push()
new Horoscope('Libra', 9, 23, 10, 22).Push()
new Horoscope('Scorpio', 10, 23, 11, 21).Push()
new Horoscope('Sagittarius', 11, 22, 12, 21).Push() 
new Horoscope('Capricorn', 12, 22, 1, 19).Push()
new Horoscope('Aquarius', 1, 20, 2, 18).Push()
new Horoscope('Pisces', 2, 19, 3, 20).Push()

//將日期簡化成數字
function calDate( month , day ) {
    return month * 100 + day   
}

// 處理摩羯座特例
// 方法一 新增檢查摩羯座陣列
const checkArray = []
for(let i = 0 ; i < zodiacArr.length ; i++){
    const startValue = calDate(zodiacArr[i].startMonth, zodiacArr[i].startDay)
    const endValue = calDate(zodiacArr[i].endMonth , zodiacArr[i].endDay)
    let birthValue = calDate(birthMonth , birthDay)
    if(birthValue >= startValue && birthValue <= endValue ){
        console.log(`您的星座是 ${zodiacArr[i].sign}`)
        checkArray.push(zodiacArr[i].sign)
    }
}
if(checkArray.length === 0){
    console.log(`您的星座是  ${zodiacArr[9].sign}`)
}

// //方法二  新增摩羯座判斷式
// for(let i = 0 ; i < zodiacArr.length ; i++){
//     const startValue = calDate(zodiacArr[i].startMonth, zodiacArr[i].startDay)
//     const endValue = calDate(zodiacArr[i].endMonth , zodiacArr[i].endDay)
//     let birthValue = calDate(birthMonth , birthDay)
//     if(birthValue >= startValue && birthValue <= endValue ){
//         console.log(`您的星座是 ${zodiacArr[i].sign}`)
//     }else if(birthDate >= startValue  || birthMonth === zodiacArr[i].endMonth && birthDay <= zodiacArr[i].endDay){
//         console.log(`您的星座是  ${zodiacArr[9].sign}`)
//     }
// }





