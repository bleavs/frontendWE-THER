var lat;
var long;
var user;
var name;
var date;
var high;
var low;
var pop;
var currentTemp;
var descrip;
var wind;
var pref;
var id;


let formcontainer = document.getElementById('new-user-container')
let form = document.getElementById('new-user-form')
let cweather = document.getElementById('current_weather')
let fweather = document.getElementById('forecast_weather')
let qwprefs = document.getElementById('qwprefs')
let currentgraph = document.getElementById('currentgraph')

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
  console.log(json)
  console.log(json.days)
  // console.log(json.days[0].pref) //where we can create front end pref ---
  id = json.user.id

    let stateCity = json.location.address.split(',').slice(1,3)

    let city = stateCity[0].replace(/ /g,"_")
    let state = stateCity[1].split(",")[0].split(",")[0].split(" ")[1]

    addweather(city, state)
  })
}

function addweather(city, state) {

// fetch("http://api.wunderground.com/api/77aa7f0f1dfec40f/geolookup/q/autoip.json").then(res => res.json()).then(res => data(res))
formcontainer.innerHTML = `<h5>Welcome ${name}</h5>`

fetch(`http://api.wunderground.com/api/77aa7f0f1dfec40f/conditions/q/${state}/${city}.json`).then(res => res.json()).then(res => current(res)).then( () => {
  fetch(`http://api.wunderground.com/api/77aa7f0f1dfec40f/forecast/q/${state}/${city}.json`).then(res => res.json()).then(res => forecast(res))}).then(() => prefListener())
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

// <img style="-webkit-user-select: none;background-position: 0px 0px, 10px 10px;background-size: 20px 20px;background-image:linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee 100%),linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);cursor: zoom-in;" src="https://mdbootstrap.com/img/Photos/Avatars/img%20(10).jpg" width="150" height="150">
//
// style="-webkit-user-select: none;background-position: 0px 0px, 10px 10px;background-size: 20px 20px;background-image:linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee 100%),linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);cursor: zoom-in;"
// width="150" height="150"


function current(res){

  currentTemp = `${res.current_observation.temp_f}`
  descrip = `${res.current_observation.weather}`
  wind = `${res.current_observation.wind_mph}`


  cweather.innerHTML = `

  <div class="card" id="current">

    <div class="avatar text-center" id="currentgraph">
      ${currentGraphic()}



    </div>


    <div class="card-body" id="currentw">

      <h6 class="card-title">Current Weather:</h6>


      <p class="card-text">Temperature(f): ${res.current_observation.temp_f} </p>
      <p class="card-text">Weather desc: ${res.current_observation.weather} </p>
      <p class="card-text">Wind strength(mph): ${res.current_observation.wind_mph} </p>


    </div>

    <div class="card-footer">
      <small class="text-muted">Location: ${res.current_observation.display_location.state}, ${res.current_observation.display_location.city} </small>
    </div>


  </div>`


qwprefs.innerHTML = `

<div class="card">

    <form id="preferences-form">

      <h6> Do You Feel Cold Outside?  </h6>

        <div class="form-check">

          <label class="form-check-label">
          <input class="form-check-input" type="radio" name="layers" id="radio1" value="option1" >
          Not cold w/ just a shirt
          </label>
        </div>

        <div class="form-check">

          <label class="form-check-label">
          <input class="form-check-input" type="radio" name="layers" id="radio2" value="option2" >
          Cold  w/ just a shirt
          </label>
        </div>

        <div class="form-check">

          <label class="form-check-label">
          <input class="form-check-input" type="radio" name="layers" id="radio3" value="option3" >
          Not cold  w/ a sweater
          </label>
        </div>

        <div class="form-check">

          <label class="form-check-label">
          <input class="form-check-input" type="radio" name="layers" id="radio4" value="option4" >
          Cold w/ a sweater
          </label>
        </div>

        <div class="form-check">

          <label class="form-check-label">
          <input class="form-check-input" type="radio" name="layers" id="radio5" value="option5" >
          Not cold w/ more than a sweater
          </label>
        </div>

        <div class="form-check">

          <label class="form-check-label">
          <input class="form-check-input" type="radio" name="layers" id="radio6" value="option6" >
          Cold w/ more than a sweater
          </label>
        </div>

        <input type="submit" value="Submit">

    </form>

  </div> `


  // location = res.current_observation.display_location.state, res.current_observation.display_location.city



}

function forecast(res){

  date = `${res.forecast.simpleforecast.forecastday[0].date.month}/${res.forecast.simpleforecast.forecastday[0].date.day}/${res.forecast.simpleforecast.forecastday[0].date.year}`
  high = `${res.forecast.simpleforecast.forecastday[0].high.fahrenheit}`
  low = `${res.forecast.simpleforecast.forecastday[0].low.fahrenheit}`
  pop = `${res.forecast.simpleforecast.forecastday[0].pop}`

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

  // conditions = res.forecast.simpleforecast.forecastday[0].conditions

}

function prefListener(){

  document.getElementById('preferences-form').addEventListener('submit', addPrefs)
}

function addPrefs(e){
  e.preventDefault()
  // fetch(`http://localhost:3000/api/v1/users/${id}/days`
  pref = document.querySelector('input[name="layers"]:checked').value

  fetch("http://localhost:3000/api/v1/days",
{ method: 'post',
headers: {
  'Accept': 'application/json',
  'Content-Type':'application/json'
},
  body: JSON.stringify(
     {username: name,
       longitude: roundTo(long, 3),
       date: date,
       high: high,
       low: low,
       precipitation: descrip,
       wind: wind,
       current: currentTemp,
       pop: pop,
       pref: pref
    })
  })
.then(res => res.json()).then(json => {
   console.log(json)


    addSugg()


  })
}

  // function getSuggs(){
  //
  //   fetch(`http://localhost:3000/api/v1/users/${id}/days`).then(res => res.json()).then(json => {
  //      console.log(json)
  // // { method: 'get',
  // // headers: {
  // //   'Accept': 'application/json',
  // //   'Content-Type':'application/json'
  // // },
  //
  // }
  // }

function addSugg(){
  // qwprefs.innerHTML = `<h5>Welcome ${name}</h5>`
  qwprefs.innerHTML = `
  <div class="card">
    <div class="card-body" id="suggestion">

      <h6 class="card-title">Based on your Preferences:</h6>

        <p class="card-text">We suggest you wear a ${pref} </p>
        <p class = "card-text"> This will be the resultant user fn- calling getSuggs for user </p>

    </div>

  </div>`

}











// weather svg functions
// currentGraphic currently just calling partlyCloudy fn

function currentGraphic(){
  return partlyCloudy()
}




function partlyCloudy(){
  return `<svg style="-webkit-user-select: none;background-position: 0px 0px, 10px 10px;background-size: 20px 20px;background-image:linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee 100%),linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);cursor: zoom-in;"
    width="150" height="150" class="rounded-circle"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="64"
      height="64"
      viewbox="0 0 64 64">
      <defs>
          <filter id="blur" width="200%" height="200%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
              <feOffset dx="0" dy="4" result="offsetblur"/>
              <feComponentTransfer>
                  <feFuncA type="linear" slope="0.05"/>
              </feComponentTransfer>
              <feMerge>
                  <feMergeNode/>
                  <feMergeNode in="SourceGraphic"/>
              </feMerge>
          </filter>
          <style type="text/css"><![CDATA[
  /*
  ** CLOUDS
  */
  @keyframes am-weather-cloud-2 {
    0% {
      -webkit-transform: translate(0px,0px);
         -moz-transform: translate(0px,0px);
          -ms-transform: translate(0px,0px);
              transform: translate(0px,0px);
    }

    50% {
      -webkit-transform: translate(2px,0px);
         -moz-transform: translate(2px,0px);
          -ms-transform: translate(2px,0px);
              transform: translate(2px,0px);
    }

    100% {
      -webkit-transform: translate(0px,0px);
         -moz-transform: translate(0px,0px);
          -ms-transform: translate(0px,0px);
              transform: translate(0px,0px);
    }
  }

  .am-weather-cloud-2 {
    -webkit-animation-name: am-weather-cloud-2;
       -moz-animation-name: am-weather-cloud-2;
            animation-name: am-weather-cloud-2;
    -webkit-animation-duration: 3s;
       -moz-animation-duration: 3s;
            animation-duration: 3s;
    -webkit-animation-timing-function: linear;
       -moz-animation-timing-function: linear;
            animation-timing-function: linear;
    -webkit-animation-iteration-count: infinite;
       -moz-animation-iteration-count: infinite;
            animation-iteration-count: infinite;
  }

  /*
  ** SUN
  */
  @keyframes am-weather-sun {
    0% {
      -webkit-transform: rotate(0deg);
         -moz-transform: rotate(0deg);
          -ms-transform: rotate(0deg);
              transform: rotate(0deg);
    }

    100% {
      -webkit-transform: rotate(360deg);
         -moz-transform: rotate(360deg);
          -ms-transform: rotate(360deg);
              transform: rotate(360deg);
    }
  }

  .am-weather-sun {
    -webkit-animation-name: am-weather-sun;
       -moz-animation-name: am-weather-sun;
        -ms-animation-name: am-weather-sun;
            animation-name: am-weather-sun;
    -webkit-animation-duration: 9s;
       -moz-animation-duration: 9s;
        -ms-animation-duration: 9s;
            animation-duration: 9s;
    -webkit-animation-timing-function: linear;
       -moz-animation-timing-function: linear;
        -ms-animation-timing-function: linear;
            animation-timing-function: linear;
    -webkit-animation-iteration-count: infinite;
       -moz-animation-iteration-count: infinite;
        -ms-animation-iteration-count: infinite;
            animation-iteration-count: infinite;
  }

  @keyframes am-weather-sun-shiny {
    0% {
      stroke-dasharray: 3px 10px;
      stroke-dashoffset: 0px;
    }

    50% {
      stroke-dasharray: 0.1px 10px;
      stroke-dashoffset: -1px;
    }

    100% {
      stroke-dasharray: 3px 10px;
      stroke-dashoffset: 0px;
    }
  }

  .am-weather-sun-shiny line {
    -webkit-animation-name: am-weather-sun-shiny;
       -moz-animation-name: am-weather-sun-shiny;
        -ms-animation-name: am-weather-sun-shiny;
            animation-name: am-weather-sun-shiny;
    -webkit-animation-duration: 2s;
       -moz-animation-duration: 2s;
        -ms-animation-duration: 2s;
            animation-duration: 2s;
    -webkit-animation-timing-function: linear;
       -moz-animation-timing-function: linear;
        -ms-animation-timing-function: linear;
            animation-timing-function: linear;
    -webkit-animation-iteration-count: infinite;
       -moz-animation-iteration-count: infinite;
        -ms-animation-iteration-count: infinite;
            animation-iteration-count: infinite;
  }
          ]]></style>
      </defs>
      <g filter="url(#blur)" id="cloudy-day-1">
          <g transform="translate(20,10)">
              <g transform="translate(0,16)">
                  <g class="am-weather-sun">
                      <g>
                          <line fill="none" stroke="orange" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3"/>
                      </g>
                      <g transform="rotate(45)">
                          <line fill="none" stroke="orange" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3"/>
                      </g>
                      <g transform="rotate(90)">
                          <line fill="none" stroke="orange" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3"/>
                      </g>
                      <g transform="rotate(135)">
                          <line fill="none" stroke="orange" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3"/>
                      </g>
                      <g transform="rotate(180)">
                          <line fill="none" stroke="orange" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3"/>
                      </g>
                      <g transform="rotate(225)">
                          <line fill="none" stroke="orange" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3"/>
                      </g>
                      <g transform="rotate(270)">
                          <line fill="none" stroke="orange" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3"/>
                      </g>
                      <g transform="rotate(315)">
                          <line fill="none" stroke="orange" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3"/>
                      </g>
                  </g>
                  <circle cx="0" cy="0" fill="orange" r="5" stroke="orange" stroke-width="2"/>
              </g>
              <g class="am-weather-cloud-2">
                  <path d="M47.7,35.4c0-4.6-3.7-8.2-8.2-8.2c-1,0-1.9,0.2-2.8,0.5c-0.3-3.4-3.1-6.2-6.6-6.2c-3.7,0-6.7,3-6.7,6.7c0,0.8,0.2,1.6,0.4,2.3    c-0.3-0.1-0.7-0.1-1-0.1c-3.7,0-6.7,3-6.7,6.7c0,3.6,2.9,6.6,6.5,6.7l17.2,0C44.2,43.3,47.7,39.8,47.7,35.4z" fill="#C6DEFF" stroke="white" stroke-linejoin="round" stroke-width="1.2" transform="translate(-20,-11)"/>
              </g>
          </g>
      </g>
  </svg>

`
}
