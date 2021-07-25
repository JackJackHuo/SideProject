const content = document.getElementById("content")
const date = document.getElementById("date")
const time = document.getElementById("time")
const addedbtn = document.getElementById("addedbtn")
const deletedbtn = document.getElementById("deletedbtn")
const result = document.getElementById("result")


const contentList = []
addedbtn.addEventListener("click", function () {
   
    contentList.push({

        content: content.value,
        date: date.value,
        time: time.value
    })
    p.render()
    
})
deletedbtn.addEventListener("click", function () {
   
    contentList.pop()
    p.render()
    
})
// ====================================
//render
class RenderFunction{
    render(){
        let changeHtml = ""
        contentList.forEach(function (i) {
        changeHtml = changeHtml + `
        <div>內容:${i.content}</div><br>
        <div>日期:${i.date}</div><br>
        <div>時間:${i.time}</div><br>
        `
        // for( let i = 0 ; i < array.length ; i++){
        //     const item = array[i]
        //     newHtml = newHtml + `
        //     <div class="item">
        //     <div>
        //       <p>內容：${item.content}</p>
        //       <p>時間：${item.date} ${item.time}</p>
        //     </div>
        //   </div>`
        result.innerHTML = changeHtml
        })

    }
}
const p = new RenderFunction()




