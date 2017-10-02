let form = document.getElementById('new-user-form')

let cweather = document.getElementById('current_weather')

let fweather = document.getElementById('forecast_weather')



form.addEventListener('submit', addweather)

// function getLocation(){
//   fetch(ourapi).then(res => addweather(res))
// }

function addweather() {
// fetch("http://api.wunderground.com/api/77aa7f0f1dfec40f/geolookup/q/autoip.json").then(res => res.json()).then(res => data(res))

fetch("http://api.wunderground.com/api/77aa7f0f1dfec40f/conditions/q/NY/New_York.json").then(res => res.json()).then(res => current(res))

fetch("http://api.wunderground.com/api/77aa7f0f1dfec40f/forecast/q/NY/New_York.json").then(res => res.json()).then(res => forecast(res))
}

// function data(res){
// weather.innerHTML = `<p>location: ${res.location.requesturl}</p>
// <p>current state: ${res.location.state} </p><p>current city: ${res.location.city} </p>`
//
// }

function current(res){
  cweather.innerHTML = `<p>current state: ${res.current_observation.display_location.state} </p><p>current city: ${res.current_observation.display_location.city} </p>
  <p>current temperature(f): ${res.current_observation.temp_f} </p>
  <p>current weather desc.: ${res.current_observation.weather} </p>
    <p>current wind strength(mph): ${res.current_observation.wind_mph} </p>`
}

function forecast(res){

  fweather.innerHTML = `<h6> Today:</h6>
  <p>Day: ${res.forecast.simpleforecast.forecastday[0].date.weekday} </p>
  <p>Hi(f): ${res.forecast.simpleforecast.forecastday[0].high.fahrenheit} </p>
  <p>Lo(f): ${res.forecast.simpleforecast.forecastday[0].low.fahrenheit} </p>
  <p>Conditions: ${res.forecast.simpleforecast.forecastday[0].conditions} </p>
  <p>Chance of Rain(%): ${res.forecast.simpleforecast.forecastday[0].pop} </p>

  <h6> Tomorrow:</h6>
  <p>Day: ${res.forecast.simpleforecast.forecastday[1].date.weekday} </p>
  <p>Hi(f): ${res.forecast.simpleforecast.forecastday[1].high.fahrenheit} </p>
  <p>Lo(f): ${res.forecast.simpleforecast.forecastday[1].low.fahrenheit} </p>
  <p>Conditions: ${res.forecast.simpleforecast.forecastday[1].conditions} </p>
  <p>Chance of Rain(%): ${res.forecast.simpleforecast.forecastday[1].pop} </p>

<h6> Day after Tom.:</h6>
  <p>Day: ${res.forecast.simpleforecast.forecastday[2].date.weekday} </p>
  <p>Hi(f): ${res.forecast.simpleforecast.forecastday[2].high.fahrenheit} </p>
  <p>Lo(f): ${res.forecast.simpleforecast.forecastday[2].low.fahrenheit} </p>
  <p>Conditions: ${res.forecast.simpleforecast.forecastday[2].conditions} </p>
  <p>Chance of Rain(%): ${res.forecast.simpleforecast.forecastday[2].pop} </p>

  <h6> 3 days from now:</h6>
  <p>Day: ${res.forecast.simpleforecast.forecastday[3].date.weekday} </p>
  <p>Hi(f): ${res.forecast.simpleforecast.forecastday[3].high.fahrenheit} </p>
  <p>Lo(f): ${res.forecast.simpleforecast.forecastday[3].low.fahrenheit} </p>
  <p>Conditions: ${res.forecast.simpleforecast.forecastday[3].conditions} </p>
  <p>Chance of Rain(%): ${res.forecast.simpleforecast.forecastday[3].pop} </p>`

}

// <p>hi (f): ${res.current_observation.temp_f} </p>
