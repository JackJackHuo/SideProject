let Server_URL = 'https://movie-list.alphacamp.io'
let Index_URL = Server_URL + '/api/v1/movies/'
let Poster_URL = Server_URL + '/posters/'
let dataPanel = document.querySelector('#data-panel')







// render movie panel
let favoriteMovieList = JSON.parse(localStorage.getItem('favorite movie')) || []
renderMovieList(favoriteMovieList)

function renderMovieList(data) {
  let rawHTML = ''
  for (let item of data) {
    rawHTML += `
    <div class="col-sm-3">
      <div class="mb-2">
        <div class="card">
          <img src="${Poster_URL + item.image}" class="card-img-top" alt="Movie Poste">
          <div class="card-body">
            <h5 class="card-title">${item.title}</h5>
          </div>
          <div class="card-footer text-muted">
            <button type="button" class="btn btn-primary btn-show-movie" data-bs-toggle="modal"
              data-bs-target="#movie-modal" data-id="${item.id}" >More</button>
            <button type="button" class="btn btn-danger btn-remove-favorite" data-id="${item.id}">X</button>
          </div>
        </div>
      </div>
    </div>
    `
  }
  dataPanel.innerHTML = rawHTML
}

dataPanel.addEventListener('click', function onPanelClicked(event) {
  let target = event.target
  if (target.matches("[class*='btn-show-movie']")) {
    showMovieModal(+target.dataset.id)
  } else if (target.matches(".btn-remove-favorite")) {
    removeMovie(+target.dataset.id)
  }
})

//show madal
function showMovieModal(id) {
  const modalTitle = document.querySelector('#movie-modal-title')
  const modalImage = document.querySelector('#movie-modal-image')
  const modalDate = document.querySelector('#movie-modal-date')
  const modalDescription = document.querySelector('#movie-modal-description')
  axios.get(Index_URL + id)
    .then(response => {
      const data = response.data.results
      modalTitle.innerText = data.title
      modalDate.innerText = 'Release date: ' + data.release_date
      modalDescription.innerText = data.description
      modalImage.innerHTML = `<img src="${Poster_URL + data.image
        }" alt="movie-poster" class="img-fluid">`
    })
}

function removeMovie(id) {
  if(!favoriteMovieList) return
  let removeIndex = favoriteMovieList.findIndex(movie => movie.id === id)
  if(removeIndex === -1) return
  favoriteMovieList.splice(removeIndex,1)
  localStorage.setItem('favorite movie', JSON.stringify(favoriteMovieList))
  renderMovieList(favoriteMovieList)
}

