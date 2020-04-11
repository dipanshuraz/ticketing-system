let getLocation = document.getElementById('location')
let getCity = document.getElementById('getCity')

getCity.addEventListener('click', (e) => {
  e.preventDefault()
  let city = getLocation.value
  localStorage.setItem('city', city)
  window.location.href = '/movies.html'
})
