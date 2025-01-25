document.addEventListener('DOMContentLoaded', function () {
    function popup(){
        const Popup = document.getElementById("popup");
        const closebtn = document.getElementById('popupbtn')
        Popup.style.transform = "translateX(-50%) translateY(-50%) scale(1)";
        closebtn.addEventListener('click',function () {
            Popup.style.transform = "translateX(-50%) translateY(-50%) scale(0)";
        })

    }

    popup()

    let search = document.getElementById('search');
    let cityInput = document.getElementById('city');
    let content = document.getElementById('contents');
    const API_KEY = '68d15800617f5c16c32733710b7c39b9'; 

    function cleanup(){
        const existingWeatherReport = document.getElementById('weather-report');
        if (existingWeatherReport) {
            existingWeatherReport.remove();
        }
    }

    function getWeather(cityName) {
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;

        fetch(weatherUrl)
            .then(response => response.json())
            .then(data => {
                const temperature = (data.main.temp - 273.15).toFixed(2);
                const description = data.weather[0].description;
                const icon = data.weather[0].icon;

                const weatherReport = document.createElement('div');
                weatherReport.id = 'weather-report';
                weatherReport.innerHTML = `
                    <h2 class="text-center">${cityName}</h2>
                    <img class="mx-auto" src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
                    <p class="text-center">${description}</p>
                    <p class="text-center">Temperature: ${temperature}°C</p>
                    <p class="text-center">Wind Speed: ${data.wind.speed}m/s</p>
                    <p class="text-center">Humidity: ${data.main.humidity}%</p>
                `;

                content.appendChild(weatherReport);

                for (i in data.main) {
                    console.log(i)
                }

            })
            .catch(error => {
                const weatherReport = document.createElement("div");
                weatherReport.id = 'weather-report';
                weatherReport.innerHTML = `
                <p class="text-center">An error occcured</p>
                <p class="text-center">Please enter a valid place name</p>
                `;

                content.appendChild(weatherReport);
            });
    }

    search.addEventListener('click', function () {
        cleanup();
        const cityName = cityInput.value.trim();
        getWeather(cityName);
        content.style.height='300px';
    });

    cityInput.addEventListener('keydown', function (event) {
        cleanup();
        if (event.code== 'Enter'){
            const cityName = cityInput.value.trim();
            getWeather(cityName);
            content.style.height='300px';
        }
    });



    cityInput.addEventListener('focus',()=>{
        cleanup();
        cityInput.value = "";
        content.style.height='62.7px';
    })

});
