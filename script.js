// get location
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

// get weather
// X https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// X https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

import { APIkey } from "./key.js";

const search = document.getElementById('search');
const container = document.getElementById('container');
let locationInput = document.getElementById('location-input');
const weatherImg  = document.getElementById('weather-img');
const weatherText  = document.getElementById('weather-content');

const weather = document.getElementById('weather');
const temp = document.getElementById('temperature');
const tempRange = document.getElementById('temperature-range');
const humidity = document.getElementById('humidity');

search.addEventListener('click',getWeather);
locationInput.addEventListener('keydown',enter);

// 增加 Enter 按鈕也可以觸發
function enter(e){
    if(e.key !== 'Enter'){
        return
    }
    getWeather();
}

function getWeather(){
    if(locationInput.value == ''){
        alert('請輸入位置');
        return
    }
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${locationInput.value}&appid=${APIkey}`)
        .then(res=>{
            let data = res.data;
            // console.log(res,data);
            container.style.height = '600px';
            let weather = data.weather[0].main;
            let temperature = data.main.temp-273.15;
            let tempMax = data.main.temp_max-273.15;
            let tempMin = data.main.temp_min-273.15;
            let humidityPercent = res.data.main.humidity;

            weatherDescribe(weather);
            tempRange.textContent = `${tempMin.toFixed(1)} ~ ${tempMax.toFixed(1)} °C`;
            temp.textContent = `${temperature.toFixed(1)}°C`;
            humidity.textContent = `${humidityPercent}%`;
        })
        .catch(err=>{
            console.log(err);
        })
}
    

function weatherDescribe(api){
    switch(api){
        case 'Clear':
            weatherImg.src = 'https://github.com/AsmrProg-YT/100-days-of-javascript/blob/master/Day%20%2310%20-%20Weather%20App/images/clear.png?raw=true';
            break;
        case 'Rain':
            weatherImg.src = 'https://github.com/AsmrProg-YT/100-days-of-javascript/blob/master/Day%20%2310%20-%20Weather%20App/images/rain.png?raw=true';
            break;
        case 'Snow':
            weatherImg.src = 'https://github.com/AsmrProg-YT/100-days-of-javascript/blob/master/Day%20%2310%20-%20Weather%20App/images/snow.png?raw=true';
            break;
        case 'Clouds':
            weatherImg.src = 'https://github.com/AsmrProg-YT/100-days-of-javascript/blob/master/Day%20%2310%20-%20Weather%20App/images/cloud.png?raw=true';
            break;
        case 'Haze':
            weatherImg.src = 'https://github.com/AsmrProg-YT/100-days-of-javascript/blob/master/Day%20%2310%20-%20Weather%20App/images/mist.png?raw=true';
            break;
        default:
            weatherImg.src = '';
    }
    weatherText.textContent = api;
}








// function checkLocation(){
//     if( lat&&lon !== ''){
//         console.log(lat,lon);
//         axios.get(`https://api.openweathermap.org/data/2.5/lat=${lat}&lon=${lon}&appid=${APIkey}`)
//             .then(res =>{
//                 console.log(res);
//             })
//     }
// }


// ❌
// 取的經緯度 
// let lat,lon;
// axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${locationInput}&limit=${3}&appid=${APIkey}`)
//     .then(res =>{
//         lat = res.data[0].lat;
//         lon = res.data[0].lon;
//         checkLocation();
//     })
//     .catch(err =>{
//         let errMessage = err.response.data.message;
//         if (errMessage == 'Nothing to geocode'){
//             console.log("Can't found");
//         }
//     })
