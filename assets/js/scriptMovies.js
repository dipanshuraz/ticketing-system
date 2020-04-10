var movies
let getMovies
// Set up our HTTP request
var xhr = new XMLHttpRequest();

// Setup our listener to process completed requests
xhr.onload = function () {

  // Process our return data
  if (xhr.status >= 200 && xhr.status < 300) {

    movies = JSON.parse(xhr.responseText);

    let getCityLocal = localStorage.getItem('city')
    getMovies = movies.filter((elem) => elem.city.includes(getCityLocal))


    fetchMovies(getMovies)
    // Runs when the request is successful
  } else {
    // Runs when it's not
    console.log(JSON.parse(xhr.responseText));
  }
};

// Create and send a GET request
// The first argument is the post type (GET, POST, PUT, DELETE, etc.)
// The second argument is the endpoint URL
xhr.open('GET', 'https://raw.githubusercontent.com/dipanshuraz/ticketing-system/master/moviedb.json');
xhr.send();


const fetchMovies = (getMovies) => {
  let out = "";

  getMovies.forEach(function (movie) {
    out += `<div class='col-xs-5 col-sm-4 col-md-3 d-flex justify-content-center my-3'>
    <div class="text-center">
    <img src="${movie.Poster}" class= "img-fluid" alt="" width="180px">
    <h5 class="my-2">${movie.Title}</h5>
    <p>Genre : ${movie.genre} Language : ${movie.language}</p>
    <a href="https://www.imdb.com/title/${movie.imdbID}" class="btn btn-outline-primary btn-sm-block">IMDB</a>
    <a href="#" id="movie-details" onclick="selectMovie('${movie.imdbID}')" class="btn btn-success btn-sm-block">Book Now</a>
    </div>
  </div>`;
  });

  $("#movies").html(out);
}


let getLanguage = document.getElementById('getLanguage')
let getGenre = document.getElementById('getGenre')

getLanguage.addEventListener('change', (e) => {
  let lang = getLanguage.value
  localStorage.setItem('lang', lang)
  let genre = localStorage.getItem("genre")
  let data = getData(genre, lang) || []
  fetchMovies(data)

})

getGenre.addEventListener('change', (e) => {
  let genre = getGenre.value
  localStorage.setItem('genre', genre)
  let lang = localStorage.getItem('lang')
  let data = getData(genre, lang) || []
  fetchMovies(data)
})


function getData(genre, lang) {
  console.log(genre, lang)
  if (genre == "" && lang == "") {
    return getMovies
  } else if (genre != "" && lang == "") {
    let data = [];
    getMovies.forEach((elem) => {
      if (elem.genre == genre) {
        data.push(elem)
      }
    })
    return data
  } else if (genre == "" && lang != "") {
    let data = [];
    getMovies.forEach((elem) => {
      if (elem.language == lang) {
        data.push(elem)
      }
    })
    return data
  } else if (genre != "" && lang != "") {
    let data = [];
    getMovies.forEach((elem) => {
      if (elem.genre == genre && elem.language == lang) {
        data.push(elem)
      }
    })
    return data
  }
  return getMovies
}
