var lat;
var long;
var user;

let formcontainer = document.getElementById('new-user-container')
let form = document.getElementById('new-user-form')
let cweather = document.getElementById('current_weather')
let fweather = document.getElementById('forecast_weather')
let qwprefs = document.getElementById('qwprefs')

window.addEventListener("load", function(){

  navigator.geolocation.getCurrentPosition(function(position) {

    lat = position.coords.latitude
    long = position.coords.longitude

     formcontainer.innerHTML =  `<form id="new-user-form">

       <input type="text" name="user-body" id="new-user-body">

       <input type="submit" value="Log In"></form>`

          document.getElementById('new-user-form').addEventListener('submit', getLocation)
   });

 });

function roundTo(n, digits) {
    if (digits === undefined) {
      digits = 0;
    }
    var multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    var test =(Math.round(n) / multiplicator);
    return +(test.toFixed(digits));
  }


// functions called from event listener on load

function getLocation(e){
  e.preventDefault()

  name = document.getElementById('new-user-body').value,

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
}

function addweather(city, state) {

// fetch("http://api.wunderground.com/api/77aa7f0f1dfec40f/geolookup/q/autoip.json").then(res => res.json()).then(res => data(res))

fetch(`http://api.wunderground.com/api/77aa7f0f1dfec40f/conditions/q/${state}/${city}.json`).then(res => res.json()).then(res => current(res))

fetch(`http://api.wunderground.com/api/77aa7f0f1dfec40f/forecast/q/${state}/${city}.json`).then(res => res.json()).then(res => forecast(res))

formcontainer.innerHTML = `<h5>Welcome ${name}</h5>`


}

// function data(res){
//
// weather.innerHTML = `<p>location: ${res.location.requesturl}</p>
// <p>current state: ${res.location.state} </p>
// <p>current city: ${res.location.city} </p>`
//
// }

// <div class="card-footer">
//   <small class="text-muted">Hi(f): ${res.forecast.simpleforecast.forecastday[0].high.fahrenheit} Lo(f): ${res.forecast.simpleforecast.forecastday[0].low.fahrenheit} </small>
// </div>

// <p class="card-text">current state: ${res.current_observation.display_location.state} </p>
// <p class="card-text">current city: ${res.current_observation.display_location.city} </p>

// https://mdbootstrap.com/img/Photos/Avatars/img%20%2810%29.jpg
// 001lighticons-02.svg
function current(res){
  cweather.innerHTML = `

  <div class="card" id="current">

    <div class="avatar text-center"><img src="https://mdbootstrap.com/img/Photos/Avatars/img%20%2810%29.jpg" class="rounded-circle">
    </div>


    <div class="card-body" id="currentw">

      <h6 class="card-title">Current Weather:</h6>


      <p class="card-text">current temperature(f): ${res.current_observation.temp_f} </p>
      <p class="card-text">current weather desc: ${res.current_observation.weather} </p>
      <p class="card-text">current wind strength(mph): ${res.current_observation.wind_mph} </p>

    </div>

    <div class="card-footer">
      <small class="text-muted">current location: ${res.current_observation.display_location.state}, ${res.current_observation.display_location.city} </small>
    </div>


  </div>`


qwprefs.innerHTML = `

<div class="card">

    <form>

      <h6> Do You Feel Cold Outside?  </h6>

        <div class="form-check">

          <label class="form-check-label">
          <input class="form-check-input" type="radio" name="layers" id="radio1" value="option1" >
          Cold w/ one extra layer
          </label>
        </div>

        <div class="form-check">

          <label class="form-check-label">
          <input class="form-check-input" type="radio" name="layers" id="radio2" value="option2" >
          Not cold  w/ one extra layer
          </label>
        </div>

        <div class="form-check">

          <label class="form-check-label">
          <input class="form-check-input" type="radio" name="layers" id="radio3" value="option3" >
          Cold w/ more than one extra layer
          </label>
        </div>

        <div class="form-check">

          <label class="form-check-label">
          <input class="form-check-input" type="radio" name="layers" id="radio4" value="option4" >
          Not cold w/ more than one extra layer
          </label>
        </div>

        <input type="submit" value="Submit">

    </form>

  </div> `

}

function forecast(res){

  fweather.innerHTML = `

  <div class="card-group" id="forecast">

      <div class="card">

        <div class="card-body" id="today">

          <h6 class="card-title">Today:</h6>

            <p class="card-text">Day: ${res.forecast.simpleforecast.forecastday[0].date.weekday} </p>

            <p class="card-text">Conditions: ${res.forecast.simpleforecast.forecastday[0].conditions} </p>
            <p class="card-text">Chance of Rain(%): ${res.forecast.simpleforecast.forecastday[0].pop} </p>

        </div>

        <div class="card-footer">
          <small class="text-muted">Hi(f): ${res.forecast.simpleforecast.forecastday[0].high.fahrenheit} Lo(f): ${res.forecast.simpleforecast.forecastday[0].low.fahrenheit} </small>
        </div>

    </div>


    <div class="card">

      <div class="card-body" id="tomorrow">

        <h6 class="card-title">Tomorrow:</h6>

          <p class="card-text">Day: ${res.forecast.simpleforecast.forecastday[1].date.weekday} </p>

          <p class="card-text">Conditions: ${res.forecast.simpleforecast.forecastday[1].conditions} </p>
          <p class="card-text">Chance of Rain(%): ${res.forecast.simpleforecast.forecastday[1].pop} </p>

      </div>

      <div class="card-footer">
        <small class="text-muted">Hi(f): ${res.forecast.simpleforecast.forecastday[1].high.fahrenheit} Lo(f): ${res.forecast.simpleforecast.forecastday[1].low.fahrenheit} </small>
      </div>

  </div>


  <div class="card">

    <div class="card-body" id="day_aft_tomorrow">

      <h6 class="card-title">Day after Tom.:</h6>

        <p class="card-text">Day: ${res.forecast.simpleforecast.forecastday[2].date.weekday} </p>

        <p class="card-text">Conditions: ${res.forecast.simpleforecast.forecastday[2].conditions} </p>
        <p class="card-text">Chance of Rain(%): ${res.forecast.simpleforecast.forecastday[2].pop} </p>

    </div>

    <div class="card-footer">
      <small class="text-muted">Hi(f): ${res.forecast.simpleforecast.forecastday[2].high.fahrenheit} Lo(f): ${res.forecast.simpleforecast.forecastday[2].low.fahrenheit} </small>
    </div>

  </div>


    <div class="card">

      <div class="card-body" id="three_days_now">

        <h6 class="card-title">3 days from now:</h6>

          <p class="card-text">Day: ${res.forecast.simpleforecast.forecastday[3].date.weekday} </p>

          <p class="card-text">Conditions: ${res.forecast.simpleforecast.forecastday[3].conditions} </p>
          <p class="card-text">Chance of Rain(%): ${res.forecast.simpleforecast.forecastday[3].pop} </p>

      </div>

      <div class="card-footer">
        <small class="text-muted">Hi(f): ${res.forecast.simpleforecast.forecastday[3].high.fahrenheit} Lo(f): ${res.forecast.simpleforecast.forecastday[3].low.fahrenheit} </small>
      </div>

    </div>

  </div>`
}
