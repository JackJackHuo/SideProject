const Server_URL = "https://lighthouse-user-api.herokuapp.com"
const Index_URL = Server_URL + "/api/v1/users"
const cardsPanel = document.querySelector("#cardsPanel")
const searchForm = document.querySelector("#search-form")
const searchInput = document.querySelector("#search-input")
const pagination = document.querySelector(".pagination")
const user_per_page = 12

const userList =[]
let filteredList = []



axios .get(Index_URL)
      .then(response => {
        userList.push(...response.data.results)
        //name surname email gender age region birthday avatar
        renderPagination(userList.length)
        renderList(getUsersByPage(1))

      })
function renderList(data){
  let rawHTML = ''
  
  data.forEach(user =>{
    rawHTML += `
   <div class="col-sm-3">
        <div class="card">
          <img src="${user.avatar}" class="card-img-top" alt="Person Image">
          <div class="card-body">
            <h5 class="card-title fs-2">${user.surname} ${user.name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${user.birthday}</h6>
            <p class="card-text"></p>
            <div class="mb-2">
            <ul class="list-group list-group-flush">
              <li class="list-group-item fs-5">gender : ${user.gender}</li>
              <li class="list-group-item fs-5">age : ${user.age}</li>
              <li class="list-group-item fs-5">region : ${user.region}</li>
            </ul>
            </div>
            <a href="#" class="card-link-more fs-4" data-bs-toggle="modal" data-bs-target="#userModal" data-id="${user.id}">More</a>
            <a href="#" class="card-link-add fs-4" data-id="${user.id}">Add</a>
            <a href="mailto:${user.email}" class="card-link fs-4">Email</a>
          </div>
        </div>
      </div>
  `
  })
  cardsPanel.innerHTML = rawHTML
}

cardsPanel.addEventListener('click', onclickMore = event => {
  event.preventDefault()
  let target = event.target
  if (target.hasAttribute("data-bs-toggle")){
    showMore(+target.dataset.id)
  }else if (target.matches(".card-link-add")){
    addFriend(+target.dataset.id)
  }
})

//show Modal
function showMore(id){
  const userModalLabel = document.querySelector("#userModalLabel")
  const userModalBody = document.querySelector("#userModalBody")
  const userModalImage = document.querySelector("#userModalImage")
  const userModalInfo = document.querySelector("#userModalInfo")
  axios.get(`${Index_URL}/${id}`)
    .then(response => {
      let data = response.data
      userModalLabel.innerHTML = `<p class="fs-2">${data.surname} ${data.name}<p>`
      userModalImage.innerHTML = `<img src="${data.avatar}" alt="user Image" class="w-100">`
      userModalInfo.innerHTML = `<ul class="list-group list-group-flush">
        <li class="list-group-item fs-4">gender : ${data.gender}</li>
        <li class="list-group-item fs-4">age : ${data.age}</li>
        <li class="list-group-item fs-4">region : ${data.region}</li>
      </ul>`
    })
}
//add favorite
function addFriend(id){
  let friendsList = JSON.parse(localStorage.getItem('my friends')) || []
  if (friendsList.some(user => user.id === id)){
    return alert('already added')
  } 
  friendsList.push(userList.find(user => user.id === id))
  localStorage.setItem('my friends',JSON.stringify(friendsList))
  console.log(localStorage.getItem('my friends'))
}
//search
searchForm.addEventListener('submit' , formSubmit = event => {
  if(!searchInput.value) return alert('no input')
  let searchContent = searchInput.value.trim().toLowerCase()
  filteredList = userList.filter(user => user.surname.toLowerCase().includes(searchContent))
  if (filteredList.length === 0) return alert('invalid search')
  renderPagination(filteredList.length)
  renderList(getUsersByPage(1))
})

//render Pagination
function renderPagination(totalUser){
  pagination.innerHTML = ''
  totalPage = Math.ceil(totalUser / user_per_page)
  for(let page = 1 ; page<= totalPage ; page++){
    const li = document.createElement('LI')
    li.innerHTML = `<a class="page-link" href="#" id="${page}">${page}</a>`
    pagination.appendChild(li)
  }
}

function getUsersByPage(page){
  let startIndex = (page-1) * user_per_page
  let data = filteredList.length? filteredList : userList
  return data.slice(startIndex, startIndex+ user_per_page)
}

pagination.addEventListener('click' , onPaginationClicked = event => {
  if (event.target.tagName !== "A") return
  renderList(getUsersByPage(event.target.attributes['id'].value))
})