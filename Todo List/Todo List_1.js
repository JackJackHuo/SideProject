// 初始變數
const lists = document.querySelector("#lists");
const todoList = document.querySelector("#my-todo");
const doneList = document.querySelector("#my-done-todo");
const addBtn = document.querySelector("#add-btn");
const input = document.querySelector("#new-todo");
const warning = document.querySelector("#warning");
const warningSign = document.querySelector(".fa-exclamation-circle");

// 資料
let todos = [
  "Hit the gym",
  "Read a book",
  "Buy eggs",
  "Organize office",
  "Pay bills"
];

for (let todo of todos) {
  addItem(todo);
}

// 函式
function addItem(text) {
  let newItem = document.createElement("li");
  newItem.className = "newItem"
  newItem.innerHTML = `
    <label for="todo">${text}</label>
    <i class="far fa-trash-alt"></i>
  `;
  todoList.appendChild(newItem);
}
// Create
//Enter鍵監聽
input.addEventListener("keypress", enter);
function enter(e) {
  console.log(e);
  if (event.which === 13) {
    create();
  }
}
//按鈕監聽
addBtn.addEventListener("click", create);

function create() {
  const inputValue = input.value;
  //檢查受否包含字串
  let check = [];
  for (let item of inputValue) {
    check.push(item === " ");
  }
  //先消除前次警告元素的class，復歸輸入欄
  warning.classList.remove("warning");
  warningSign.classList.remove("warningSign");
  if (check.includes(false)) {
    addItem(inputValue);
    //偵測到輸入內容全為空白鍵
  } else {
    //顯示警告
    warning.classList.toggle("warning");
    warningSign.classList.toggle("warningSign");
  }
}
// Delete and check
lists.addEventListener("click", function (event) {
  const target = event.target;
  let parentElement = target.parentElement;
  if (target.classList.contains("fa-trash-alt")) {
    parentElement.remove();
    //移至done清單
  } else if (target.className === "") {
    console.log(target)
    target.classList.toggle("checked");
    doneList.appendChild(parentElement);
    //移回todo清單
  } else if (target.classList.contains("checked")) {
    target.classList.toggle("checked");
    todoList.appendChild(parentElement);
  }
});
