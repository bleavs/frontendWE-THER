var lat;
var long;

window.addEventListener("load", function(){

  navigator.geolocation.getCurrentPosition(function(position) {

    lat = position.coords.latitude

     long = position.coords.longitude

    console.log(position.coords.latitude, position.coords.longitude);
  })
});

let form = document.getElementById('new-user-form')
let cweather = document.getElementById('current_weather')
let fweather = document.getElementById('forecast_weather')
let qwprefs = document.getElementById('qwprefs')

function roundTo(n, digits) {
    if (digits === undefined) {
      digits = 0;
    }
    var multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    var test =(Math.round(n) / multiplicator);
    return +(test.toFixed(digits));
  }

form.addEventListener('submit', getLocation)

function getLocation(e){
  e.preventDefault()

  fetch('http://localhost:3000/api/v1/login',
{ method: 'post',
headers: {
  'Accept': 'application/json',
  'Content-Type':'application/json'
},
  body: JSON.stringify(
     {username: document.getElementById('new-user-body').value,
    latitude: roundTo(lat, 3),
    longitude: roundTo(long, 3)})
})
  .then(res => res.json())
  .then(json => {

    let stateCity = json.location.address.split(',').slice(1,3)

    let city = stateCity[0].replace(/ /g,"_")
    let state = stateCity[1].split(",")[0].split(",")[0].split(" ")[1]

    addweather(city, state)
})
// , ${state}

}


function addweather(city, state) {

  // let state =
  // let city =


// fetch("http://api.wunderground.com/api/77aa7f0f1dfec40f/geolookup/q/autoip.json").then(res => res.json()).then(res => data(res))

fetch(`http://api.wunderground.com/api/77aa7f0f1dfec40f/conditions/q/${state}/${city}.json`).then(res => res.json()).then(res => current(res))

fetch(`http://api.wunderground.com/api/77aa7f0f1dfec40f/forecast/q/${state}/${city}.json`).then(res => res.json()).then(res => forecast(res))
}

// function data(res){
//
// weather.innerHTML = `<p>location: ${res.location.requesturl}</p>
// <p>current state: ${res.location.state} </p>
// <p>current city: ${res.location.city} </p>`
//
// }

function current(res){
  cweather.innerHTML = `

  <div id="current">

  <h6>Current Weather:</h6>
  <p>current state: ${res.current_observation.display_location.state} </p><p>current city: ${res.current_observation.display_location.city} </p>
  <p>current temperature(f): ${res.current_observation.temp_f} </p>
  <p>current weather desc: ${res.current_observation.weather} </p>
    <p>current wind strength(mph): ${res.current_observation.wind_mph} </p>

  </div>`

qwprefs.innerHTML = `

<form>

<h6> Are you currently cold outside, w/ a single extra layer, w/ more than 1 extra layer?  </h6>

<input id="cl" name="layer" type="radio" value="cold_w_one_l" />

<label for="cl">I was cold w/ one extra layer </label>

<input id="ncl" name="layer" type="radio" value="n_cold_w_one_l" />

<label for="ncl">I was not cold w/ one extra layer</label>



<input id="cll" name="layer" type="radio" value="cold_w_m_l" />

<label for="cll">I was cold w/ more than one extra layer </label>

<input id="ncll" name="layer" type="radio" value="n_cold_w_m_l" />

<label for="ncll">I was not cold w/ more than one extra layer</label>

<input type="submit" value="Submit">

</form>`

}

function forecast(res){

  fweather.innerHTML = `

  <div id ="today">

  <h6>Today:</h6>
  <p>Day: ${res.forecast.simpleforecast.forecastday[0].date.weekday} </p>
  <p>Hi(f): ${res.forecast.simpleforecast.forecastday[0].high.fahrenheit} </p>
  <p>Lo(f): ${res.forecast.simpleforecast.forecastday[0].low.fahrenheit} </p>
  <p>Conditions: ${res.forecast.simpleforecast.forecastday[0].conditions} </p>
  <p>Chance of Rain(%): ${res.forecast.simpleforecast.forecastday[0].pop} </p>

  </div>

<div id ="tomorrow">

  <h6> Tomorrow:</h6>
  <p>Day: ${res.forecast.simpleforecast.forecastday[1].date.weekday} </p>
  <p>Hi(f): ${res.forecast.simpleforecast.forecastday[1].high.fahrenheit} </p>
  <p>Lo(f): ${res.forecast.simpleforecast.forecastday[1].low.fahrenheit} </p>
  <p>Conditions: ${res.forecast.simpleforecast.forecastday[1].conditions} </p>
  <p>Chance of Rain(%): ${res.forecast.simpleforecast.forecastday[1].pop} </p>

</div>


<div id ="day_aft_tomorrow">

<h6> Day after Tom.:</h6>
  <p>Day: ${res.forecast.simpleforecast.forecastday[2].date.weekday} </p>
  <p>Hi(f): ${res.forecast.simpleforecast.forecastday[2].high.fahrenheit} </p>
  <p>Lo(f): ${res.forecast.simpleforecast.forecastday[2].low.fahrenheit} </p>
  <p>Conditions: ${res.forecast.simpleforecast.forecastday[2].conditions} </p>
  <p>Chance of Rain(%): ${res.forecast.simpleforecast.forecastday[2].pop} </p>

</div>


<div id ="three_days_now">

  <h6> 3 days from now:</h6>
  <p>Day: ${res.forecast.simpleforecast.forecastday[3].date.weekday} </p>
  <p>Hi(f): ${res.forecast.simpleforecast.forecastday[3].high.fahrenheit} </p>
  <p>Lo(f): ${res.forecast.simpleforecast.forecastday[3].low.fahrenheit} </p>
  <p>Conditions: ${res.forecast.simpleforecast.forecastday[3].conditions} </p>
  <p>Chance of Rain(%): ${res.forecast.simpleforecast.forecastday[3].pop} </p>

</div>`

}
