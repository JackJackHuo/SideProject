const Server_URL = "https://lighthouse-user-api.herokuapp.com"
const Index_URL = Server_URL + "/api/v1/users"
const cardsPanel = document.querySelector("#cardsPanel")
const userList = JSON.parse(localStorage.getItem('my friends')) || []





renderList(userList)
function renderList(data) {
  let rawHTML = ''

  data.forEach(user => {
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
            <a href="#" class="card-link-delete fs-4" data-id="${user.id}">X</a>
            <a href="mailto:${user.email}" class="card-link fs-4">Email</a>
          </div>
        </div>
      </div>
  `
  })
  cardsPanel.innerHTML = rawHTML
}

cardsPanel.addEventListener('click', onclickMore = event => {
  let target = event.target
  if (target.hasAttribute("data-bs-toggle")) {
    showMore(+target.dataset.id)
  } else if (target.matches(".card-link-delete")){
    deleteFriend(+target.dataset.id)
  }
})

//show Modal
function showMore(id) {
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
function deleteFriend(id){
  if(!userList.length) return
  let deleteIndex = userList.findIndex(user => user.id === id)
  userList.splice(deleteIndex,1)
  localStorage.setItem('my friends',JSON.stringify(userList))
  renderList(userList)
}