// $('.search-button').on('click', function () {
// $.ajax({
//   url: 'http://www.omdbapi.com/?apikey=3028cf44&s=' + $('.input-keyword').val(),
//   success: result => {
//     const movie = result.Search;
//     let cards = '';
//     movie.forEach(m => {
//       cards += showMovie(m);
//     });
//     $('.movie-container').html(cards);
//     
//     $('.detail-btn').on('click', function () {
//       $.ajax({
//         url: 'http://www.omdbapi.com/?apikey=3028cf44&i=' + $(this).data('imdbid'),
//         success: m => {
//               $('.modal-body').html(showImdb(m));
// 
//         },
//         error: e => {
//     console.log(e.responseText);
//   }
//       });
//     });
//   },
//   error: e => {
//     console.log(e.responseText);
//   }
// });
// $('.input-keyword').val("");
// $('.input-keyword').focus();
// });


//fetch 
const searchButton = document.querySelector(".search-button");
const inputKeyword = document.querySelector('.input-keyword');
searchButton.addEventListener("click", function() {
fetch('https://www.omdbapi.com/?apikey=3028cf44&s=' + inputKeyword.value)
.then(response=> response.json())
.then(response=> {
  const movie = response.Search;
  let cards ="";
  movie.forEach(m => cards += showMovie(m));
  const movieContainer = document.querySelector('.movie-container');
  movieContainer.innerHTML = cards;
  
  //ketika tombol show detail di klik
  
  const detailButton = document.querySelectorAll(".detail-btn");
  detailButton.forEach(btn => {
    btn.addEventListener('click', function (){
      const imdb = this.dataset.imdbid;
      fetch('https://www.omdbapi.com/?apikey=3028cf44&i=' + imdb)
      .then(response => response.json())
      .then(m => {
        const movieDetail = showImdb(m);
        const modalBody = document.querySelector('.modal-body');
        modalBody.innerHTML = movieDetail;
      });
    });
  });
});
});



function showMovie(m) {
  return `<div class="col-md-4 my-3">
          <div class="card">
  <img src="${m.Poster}" class="card-img-top">
  <div class="card-body">
    <h5 class="card-title">${m.Title}</h5>
    <h6 class="card-subtitle mb-2 text-body-secondary">${m.Year}</h6>
    <a href="#" class="btn btn-primary detail-btn" data-bs-toggle="modal" data-bs-target="#exampleModal" data-imdbid="${m.imdbID}">Lihat Detail</a>
  </div>
</div>
        </div>`;
}

function showImdb(m) {
 return ` <div class="container-fluid">
          <div class="row">
            <div class="col-md-3">
              <img src="${m.Poster}" class="img-fluid" />
            </div>
            <div class="col-md">
              <ul class="list-group">
  <li class="list-group-item"><h4>${m.Title}
  ${m.Year}</h4></li>
  <li class="list-group-item"><strong>Director: </strong>${m.Director}</li>
  <li class="list-group-item"><strong>Genre: </strong>${m.Genre}</li>
  <li class="list-group-item"><strong>Country: </strong>${m.Country}</li>
  <li class="list-group-item"><strong>Actor: </strong>${m.Actors}</li>
  <li class="list-group-item"><strong>Writer: </strong>${m.Writer}</li>
  <li class="list-group-item"><strong>Plot: </strong><br>${m.Plot}</li>
</ul>
            </div>
          </div>
        </div>`;
}