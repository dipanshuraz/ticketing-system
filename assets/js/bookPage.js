let seat;
let selectedSeat = [];
document.addEventListener('DOMContentLoaded', () => {
  var xhr = new XMLHttpRequest()
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      let seat = JSON.parse(xhr.responseText)
      console.log(seat["1"])
      displaySeats(seat["1"], "A")
      displaySeats(seat["2"], "B")
      displaySeats(seat["3"], "C")
      displaySeats(seat["4"], "D")
      displaySeats(seat["5"], "E")
      displaySeats(seat["6"], "F")
    } else {
      console.log(JSON.parse(xhr.responseText))
    }
  }
  xhr.open('GET', 'https://my-personal-db.herokuapp.com/tiles');
  xhr.send();


  getMoviesDetails()
})

let seats = document.getElementById('seats')

function displaySeats(num, rowClass) {
  let div = document.createElement("div");
  div.className = "seat-grid";
  let row = document.createElement("div");
  row.className = 'rowSeat d-flex justify-content-center my-2'
  let p = document.createElement('p')
  // p.innerText = "row - " + rowClass
  p.setAttribute('class', 'lead')
  for (let i = 0; i < num; i++) {
    seat = document.createElement("img");
    seat.src = "https://image.flaticon.com/icons/svg/686/686648.svg";
    seat.id = `${rowClass}-${i}`
    seat.addEventListener('click', () => selectSeat(`${rowClass}-${i}`))
    seat.style.height = "40px";
    seat.style.width = "40px";
    row.appendChild(seat)
  }
  div.append(p)
  div.appendChild(row)
  seats.appendChild(div)
}
function selectSeat(id) {
  let seat = document.getElementById(id);
  let total = document.getElementById("total");

  if (!selectedSeat.includes(id)) {
    selectedSeat.push(id)
  }

  seat.src = 'https://cdn.onlinewebfonts.com/svg/img_205341.png'

  total.innerHTML = `Total : ${selectedSeat.length * 200} <i class="fas fa-rupee-sign"></i>`

  displaySelected(selectedSeat)
}

function displaySelected(selectedSeat) {
  let block = document.getElementById("selected-seat");

  block.innerHTML = ""

  selectedSeat.forEach((elem) => {
    let span = document.createElement("span");
    span.className = "badge badge-info mx-1";
    span.innerHTML = elem;
    block.appendChild(span)
  })
}

let city = localStorage.getItem('city')
let cityLocal = document.getElementById('cityLocal')
cityLocal.innerHTML = city.toLocaleUpperCase()


function reset() {
  window.location.href = '/bookPage.html'
}

function getMoviesDetails() {
  let movieId = localStorage.getItem('movie')
  let movieBox = document.getElementById('moviebox')
  let moviePoster = document.getElementById('moviePoster')

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

function proceed() {
  let total = document.getElementById('getTotal')
  localStorage.setItem('total', total)

  localStorage.setItem('selectedSeat', JSON.stringify(selectedSeat))

  window.location.href = '/confirm.html'
}