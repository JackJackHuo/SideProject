let Server_URL = 'https://movie-list.alphacamp.io'
let Index_URL = Server_URL + '/api/v1/movies/'
let Poster_URL = Server_URL + '/posters/'
let dataPanel = document.querySelector('#data-panel')



let moviesList = []

axios.get(Index_URL)
  .then(response => {
    moviesList.push(...response.data.results)
    renderMovieList(moviesList)
  })

function renderMovieList(data){
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
            <button type="button" class="btn btn-info btn-show-favorit">+</button>
          </div>
        </div>
      </div>
    </div>
    `
  }
  dataPanel.innerHTML = rawHTML
}

dataPanel.addEventListener('click', function onPanelClicked(event) {
  if (event.target.matches("[class*='btn-show-movie']")) {
    showMovieModal(event.target.dataset.id)
  }
})

function showMovieModal(id){
  const modalTitle = document.querySelector('#movie-modal-title')
  const modalImage = document.querySelector('#movie-modal-image')
  const modalDate = document.querySelector('#movie-modal-date')
  const modalDescription = document.querySelector('#movie-modal-description')

  axios .get(Index_URL + id)
        .then(response =>{
          const data = response.data.results
          modalTitle.innerText = data.title
          modalDate.innerText = 'Release date: ' + data.release_date
          modalDescription.innerText = data.description
          modalImage.innerHTML = `<img src="${Poster_URL + data.image
            }" alt="movie-poster" class="img-fluid">`
        })
}





