let container = document.querySelector('.container')
let input = document.querySelector('#input')
let btn = document.querySelector('#btn')
let tbody = document.querySelector('tbody')


// 資料
let todos = [
    "Hit the gym",
    "Read a book",
    "Buy eggs",
    "Organize office",
    "Pay bills"
  ];
  //迭代陣列資料
  for(item of todos){
      addItem(item)
  }
  //新增插入資料功能
  function addItem(text){
    let row = document.createElement('tr')
    let replace = `
    <td class="label">${text}</td>
    <td><i class="far fa-trash-alt"></i></td>
   `
    row.innerHTML = replace
    tbody.appendChild(row)

  }
//新增事件
btn.addEventListener('click' , add)
function add(event){
   let value = event.target.previousElementSibling.value
   if(value !== ''){
    addItem(value)
   }
   
}
//刪除事件

tbody.addEventListener('click' , del)
function del(event){
    let target = event.target
    if(target.classList.contains('far')){
        target.parentElement.parentElement.remove()
    }else if(target.className === 'label'){
        target.innerHTML = `<del><i id="i">${target.innerText}</i></del>`
    }else if(target.id === 'i'){
        this.children[0].children[0].innerHTML = target.innerText
    }
}

// =========嘗試失敗==================================
//利用陣列方式儲存資料，再用迭代將陣列中的資料一次渲染出來
//刪除時利用比對欲刪除及陣列裡的資料，找到後從陣列中移除
//缺點是當遇到同樣的名稱的資料內容時會一次全部被刪除

// let listArr = []
// //新增事件
// btn.addEventListener('click' , add)
// function add(event){
//     console.log(event)
//     //將新增的內容推進陣列
//     listArr.push({
//         content: input.value
//     })
//     render(listArr)
    
// }
// //刪除事件

// tbody.addEventListener('click' , del)
//     function del(event){
//         let target = event.target
//         //選取垃圾桶圖案條件
//         if (target.classList[0] === "far"){
//             //抓取欲刪除文字內容
//             let delItem = target.parentElement.previousElementSibling.textContent
//             //陣列中尋找欲刪除內容
//             listArr.forEach(item => {
//                 if(Object.values(item).includes(delItem)){
//                 //找到後剔除陣列
//                 listArr.splice(listArr.indexOf(item),1)
//                 }
//             })
//             render(listArr)
//         //點擊文字內容效果
//         }else if(target.innerText!==''){
//             target.innerHTML = `<del><i>${target.innerText}</i></del>`
//         }    
//     }

// //渲染畫面
// function render(listArr){
//     let replace = ''
//     for(item of listArr){
//         replace += `
//         <tr>
//         <td>${item.content}</td>
//         <td><i class="far fa-trash-alt"></i></td>
//         </tr>
//         `
//     }
//     tbody.innerHTML = replace
// }
