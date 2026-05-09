const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherResult = document.getElementById("weatherResult");

let timeout;
async function fetchWeather(){
     const city = cityInput.value.trim();
     if(!city) return;
     weatherResult.innerHTML = "<p>Loading....</p>"

      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6af3e11b3e0e5778cd8e04ef54b90fd9&units=metric`);
       if(!response.ok) throw new Error(response.status);

       const data = await response.json();
       console.log(data)
        renderWeather(data);
      }catch(error){
        console.error(error.message);
         weatherResult.innerHTML = `<p>${error.message}</p>`;
     }  

     cityInput.value = "";
}

function renderWeather(data){
    weatherResult.innerHTML = `
        <div class="weather-card">
            <h3>${data.name}</h3>
            <p class="country">📍 ${data.sys.country}</p>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/>
            <p class="temp">${Math.round(data.main.temp)}°C</p>
            <p class="desc">${data.weather[0].description}</p>
            <div class="details">
                <p>🌡️ Feels like<br/><strong>${Math.round(data.main.feels_like)}°C</strong></p>
                <p>💧 Humidity<br/><strong>${data.main.humidity}%</strong></p>
                <p>💨 Wind<br/><strong>${data.wind.speed} m/s</strong></p>
            </div>
        </div>
    `;
}
 searchBtn.addEventListener("click", handleSearch);
 cityInput.addEventListener("keydown", function(e){
    if(e.key === "Enter") fetchWeather();
 })
 function handleSearch(){
    clearTimeout(timeout);

    timeout = setTimeout(() => {
        fetchWeather();
    }, 500)
 }
