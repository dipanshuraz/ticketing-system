document.addEventListener('DOMContentLoaded', () => {
  getMoviesDetails()
})

function getMoviesDetails() {
  let city = localStorage.getItem('city')
  let cityLocal = document.getElementById('cityLocal')
  cityLocal.innerHTML = city.toLocaleUpperCase()


  let movieId = localStorage.getItem('movie')
  let movieBox = document.getElementById('moviebox')
  let moviePoster = document.getElementById('moviePoster')

  let seat = JSON.parse(localStorage.getItem('selectedSeat'))
  let selectedSeat = document.getElementById('selected-seat')


  seat.forEach(element => {
    let span = document.createElement("span");
    span.className = "badge badge-info mx-1";
    span.innerHTML = element;
    selectedSeat.appendChild(span)
  });

  let total = document.getElementById('total')
  total.innerHTML = (seat.length * 200) + ' <i id="getTotal" class="fas fa-rupee-sign"></i>'

  var xhr = new XMLHttpRequest()
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      let movies = JSON.parse(xhr.responseText)
      let movie = movies.filter((elem) => elem.imdbID == movieId)
      console.log(movie)

      movieBox.innerHTML = movie[0].Title.toLocaleUpperCase()
      moviePoster.src = movie[0].Poster
      moviePoster.classList.remove('d-none')
    } else {
      console.log(JSON.parse(xhr.responseText))
    }
  }
  xhr.open('GET', 'https://my-personal-db.herokuapp.com/movies');
  xhr.send();
}


function cancelNow() {

  localStorage.clear()
  window.location.href = '/index.html'
}

function printNow() {
  window.print()
}