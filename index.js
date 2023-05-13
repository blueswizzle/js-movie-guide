const APIKEY = "";
const APIURL = `https://api.themoviedb.org/3/discover/movie?api_key=${APIKEY}`;
const IMGURL = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = `https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&query=`;

// OMDB Values

const OMDB_KEY = "";


const main = document.getElementById('main-container');
const search = document.getElementById('search-box');
const homeButton = document.getElementById('home');
const trendingButton = document.getElementById('trending');
const goBack = document.querySelector('.go-back');
const error = document.querySelector('.error');
let searchedMovie = "";
let inSearching = false;
let inTrending = false;
var clickedMovieImage = "";

search.addEventListener("keydown", (e) =>{
  if(e.key == "Enter" && search.value != ""){
    searchedMovie = search.value.trim();
    getMovies(SEARCHAPI + searchedMovie);
    search.value = "";
    inSearching = true;
    inTrending = false;
  }
  
})

homeButton.addEventListener("click", ()=>{
  main.innerHTML = '';
  main.classList.add('home-view');
  error.style.display = 'none';
  goBack.style.display = 'none';
  main.innerHTML = `
    
    <div class="logo logo-home-view">
      <h1>AMOVIES</h1>
    </div>
    <div class="title">
      <h1>A site to find out movies</h1>
    </div>
    <div class="about">
      AMOVIES - Just a better place to find more about movies online for free. It allows you to search for movies online for free. No registration is required. Utilizes the popular The Movie Database (TMDB) API and The Open Movie Database (OMDb) API. Click on Trending at the top to see some of the top popular movies right now. Or search for a specifc movie in the search bar at top.
    </div>
  
  `
})

trendingButton.addEventListener("click", ()=>{
  getMovies(APIURL);
  inSearching = false;
  inTrending = true;
})
async function getMovies(url){
    const resp = await fetch(url);
    const respData = await resp.json();
    showMovies(respData.results);
}

goBack.addEventListener('click', ()=>{
  if(inSearching && !inTrending){
    getMovies(SEARCHAPI + searchedMovie)
    goBack.style.display = 'none';
  }else if(inTrending && !inSearching){
    getMovies(APIURL);
    goBack.style.display = 'none';
  }
})
function showMovies(movies){
  if(movies.length <=0){
    main.innerHTML = "";
    error.style.display = 'block';
    goBack.style.display = 'none';
    return;
  }
  error.style.display = 'none';
  main.innerHTML = "";
  main.classList.remove('home-view');

  movies.forEach((movie) => {
    const { poster_path, title, vote_average, overview, release_date } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("card");
    const release = release_date.split("-");
    const s_title = shortenTitle(title); // shortend title if it's longer than the container
    movieEl.innerHTML = `
    
    
    <div class="card-image">
      <img src="${IMGURL + poster_path}" alt="">
    </div>
    <div class="movie-title">
      <h1>${s_title}</h1>
    </div>
    <div class="movie-year-runtime">
      <span>${release[0]}</span>
    </div>
    `
    movieEl.addEventListener("click", () =>{
      let clickedMovie = title;
      clickedMovieImage = IMGURL + poster_path;
      omdbGetMovie(`http://www.omdbapi.com/?t=${clickedMovie}&apikey=${OMDB_KEY}`);
    })
    main.append(movieEl);
  });
}

async function omdbGetMovie(url){
  const resp = await fetch(url);
  const respData = await resp.json();
  if(respData.Response == "True"){
    showMovieDetails(respData);
  }else{
    console.log('Error');
  }
}
function showMovieDetails(movie){
  main.innerHTML = "";

  main.innerHTML = `
  <div class="movie-info">
  <div class="movie-info-top">
    <div class="movie-image">
      <img src="${clickedMovieImage}" alt="">
    </div>
    <div class="movie-details">
      <h1 class="movie-details-title">${movie.Title}</h1>
      <h1 class="movie-details-rating">${movie.imdbRating} / 10</h1>
      <div class="movie-details-release-rating">
        <span>${movie.Rated}</span>
        <span>${movie.Released}</span>
        <span>${movie.Runtime}</span>
      </div>
      <div class="movie-details-creator">
        <p>Director(s): ${movie.Director}</p>
        <p>Writer(s): ${movie.Writer}</p>
      </div>
      <div class="movie-details-genre">
        <div> ${movie.Genre.split(",").join("</div><div>")} </div>
      </div>
      
      <div class="movie-plot-and-cast">
        <div class="plot">
          <h1 class="plot-heading">Plot:</h1>
          <p class="plot">${movie.Plot}</p>
        </div>

        <div class="cast">
          <h1>Cast:</h1>
          <p>${movie.Actors}</p>
        </div>
      </div>
    </div>
  </div>
  
</div>
  `

  goBack.style.display = 'block';
}

function shortenTitle(title){
  if(title.length > 20){
    return title.substring(0,17) + "...";
  }else{
    return title;
  }
}




