const Server_URL = "https://movie-list.alphacamp.io";
const Index_URL = Server_URL + "/api/v1/movies/";
const Poster_URL = Server_URL + "/posters/";
const dataPanel = document.querySelector("#data-panel");
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const paginator = document.querySelector("#paginator");
const per_page_number = 12;
let currentPage = 1

// render movie panel
const moviesList = [];
let filteredArr = [];
axios.get(Index_URL).then((response) => {
  moviesList.push(...response.data.results);
  renderPaginator(moviesList.length);
  // renderMovieList(getMoviesByPage(1))
  renderMovie(getMoviesByPage(currentPage));
});

//render Movie
function renderMovie(data) {
  let rawHTML = "";
  for (let item of data) {
    rawHTML += `
    <div class="col-sm-3">
      <div class="mb-2">
        <div class="card">
          <img src="${Poster_URL + item.image
      }" class="card-img-top" alt="Movie Poste">
          <div class="card-body">
            <h5 class="card-title">${item.title}</h5>
          </div>
          <div class="card-footer text-muted">
            <button type="button" class="btn btn-primary btn-show-movie" data-bs-toggle="modal"
              data-bs-target="#movie-modal" data-id="${item.id}" >More</button>
            <button type="button" class="btn btn-info btn-show-favorite" data-id="${item.id
      }">+</button>
          </div>
        </div>
      </div>
    </div>
    `;
  }
  dataPanel.innerHTML = rawHTML;
}
//新增//render MovieList
function renderMovieList(data) {
  dataPanel.innerHTML = "";
  let ol = document.createElement("OL");
  ol.classList.add("list-group", "list-group-numbered");
  let rawHTML = "";
  data.forEach((item) => {
    rawHTML += `
        <li class="list-group-item d-flex justify-content-between align-items-start">
        <div class="ms-2 me-auto">
          <div class="fw-bold">${item.title}</div>
          ${item.release_date}
          </div>
          <span> 
            <button type="button" class="btn btn-primary btn-show-movie" data-bs-toggle="modal"
                data-bs-target="#movie-modal" data-id="${item.id}">More</button>
                <button type="button" class="btn btn-info btn-show-favorite" data-id="${item.id}">+</button>
          </span>
        </li>     
      `;
  });
  ol.innerHTML = rawHTML;
  dataPanel.appendChild(ol);
}
//card buttom clicked
dataPanel.addEventListener("click", function onPanelClicked(event) {
  let target = event.target;
  if (target.matches("[class*='btn-show-movie']")) {
    showMovieModal(+target.dataset.id);
  } else if (target.matches(".btn-show-favorite")) {
    storeMovie(+target.dataset.id);
  }
});

//show madal function
function showMovieModal(id) {
  const modalTitle = document.querySelector("#movie-modal-title");
  const modalImage = document.querySelector("#movie-modal-image");
  const modalDate = document.querySelector("#movie-modal-date");
  const modalDescription = document.querySelector("#movie-modal-description");
  axios.get(Index_URL + id).then((response) => {
    const data = response.data.results;
    modalTitle.innerText = data.title;
    modalDate.innerText = "Release date: " + data.release_date;
    modalDescription.innerText = data.description;
    modalImage.innerHTML = `<img src="${Poster_URL + data.image
      }" alt="movie-poster" class="img-fluid">`;
  });
}
//add favorite movie function
function storeMovie(id) {
  let favoriteMovieList = JSON.parse(localStorage.getItem("favorite movie")) || [];
  let favoriteMovie = moviesList.find(movie => movie.id === id);
  if (favoriteMovieList.some(movie => movie.id === id)) {
    return alert("already added");
  }
  favoriteMovieList.push(favoriteMovie);
  localStorage.setItem("favorite movie", JSON.stringify(favoriteMovieList));
}

//search bar button clicked
searchForm.addEventListener("click", function onSearchFormclicked(event) {
  event.preventDefault();
  const target = event.target

  //dataPanel新增showList代表切換成列表模式
  target.matches(".fa-bars") ? dataPanel.classList.add("showList") :
    target.matches(".fa-th") ? dataPanel.classList.remove("showList") :
      //點選搜尋按鈕
      Object.values(target.attributes).map((att) => att.value).includes("search-submit") ? search()
        : console.log()

  //判斷模式並render電影
  let renderMode = dataPanel.matches(".showList")
    ? renderMovieList
    : renderMovie;
  renderMode(getMoviesByPage(currentPage));
})
//搜尋關鍵字功能
function search() {
  let keyWords = searchInput.value.trim().toLowerCase();
  filteredArr = moviesList.filter(movie => {
    return movie.title.toLowerCase().includes(keyWords);
  });
  if (filteredArr.length === 0) {
    alert(`Can Not Find Movie <${keyWords}>`);
  }
  //render搜尋後分頁
  renderPaginator(filteredArr.length);
}

//render paginator by total amount
function renderPaginator(amount) {
  let totalPages = Math.ceil(amount / per_page_number);
  paginator.innerHTML = "";
  for (let page = 1; page <= totalPages; page++) {
    paginator.innerHTML += `<li class="page-item"><a class="page-link" href="#" data-page="${page}">${page}</a></li>`;
  }
}

function getMoviesByPage(page) {
  let startIndex = (page - 1) * per_page_number;
  let data = filteredArr.length ? filteredArr : moviesList;
  return data.slice(startIndex, startIndex + per_page_number);
}

paginator.addEventListener("click", function onPaginatorClicked(event) {
  if (event.target.tagName !== "A") return;
  let renderMode = dataPanel.matches(".showList") ? renderMovieList : renderMovie;
  renderMode(getMoviesByPage(+event.target.dataset.page));
});
