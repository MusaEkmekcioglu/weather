const inputData = document.querySelector('input')

let city = ''

inputData.addEventListener('change', (e) => {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  }
  city = capitalizeFirstLetter(e.target.value)
  e.target.value = ''
})

document.addEventListener('submit', (e) => {
  e.preventDefault()
  getCityCoordinateLat(city)
})

async function createCard(sem, temp, cloud) {
  const cities = document.querySelector('.cities')
  console.log(cities)
  console.log(city)
  let containerx = `  <div class="city">
  <div class="city-temp">${temp}</div>
  <div class="city-name">${city} <span class="city-icon">${sem}</span> </div>
  <div>${cloud}</div>
          </div>`
  cities.appendChild(containerx)
}

const URL =
  'https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=b63b36ed47feb1fadcb94111057692d6'

async function getCityCoordinateLat(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=b63b36ed47feb1fadcb94111057692d6`
    )
      .then((res) => res.json())
      .then((data) => {
        return data
      })
    console.log(response)
    const lat = response[0].lat
    const lon = response[0].lon
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b63b36ed47feb1fadcb94111057692d6`
    )
      .then((res) => res.json())
      .then((data) => {
        return data
      })
    console.log(res)
    const sembol = res.sys.country
    const temp = res.main.temp
    const cloud = res.weather[0].description
    console.log(sembol, temp, cloud)

    const contant = document.createElement('div')
    contant.className = 'city'

    // const message = document.createElement(`div`)
    // message.className = `city-name`
    // message.textContent = `${city}  in ${sembol}`
    // contant.appendChild(message)

    contant.textContent = `\n
    ${temp} f. 
    ${city}   ${sembol} 
  ${cloud}
            `
    console.log(contant)
    document.body.querySelector('.cities').appendChild(contant)
  } catch (error) {
    console.log(error)
  }
}
