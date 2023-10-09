function getDataAndDisplay() {
    // Get waeather & poluttion with lat & lang
    navigator.geolocation.getCurrentPosition(function(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        // Hit endpoint get_air_quality with params
        axios.get("/get_air_quality", {
            params: {
                latitude: latitude,
                longitude: longitude
            }
        })
        .then(function (response) {
            // Show the data
            displayData(response.data);
        })
        .catch(function (error) {
            // Show error 
            console.error('Gagal mengirim permintaan ke server:', error);
        });
    });
}

// Call func getDataAndDisplay
getDataAndDisplay();

// Call func getDataAndDisplay with event listener button getCurrentLocationData
document.getElementById("getCurrentLocationData").addEventListener("click", getDataAndDisplay);

function displayData(data) {
    if (data.status === "success") {
        // Data poluttion
        var pollutionCard = document.getElementById("pollutionCard");
        pollutionCard.style.display = "block"; // Show card

        document.getElementById("aqiValue").textContent = data.data.current.pollution.aqius;
        document.getElementById("mainParameter").textContent = data.data.current.pollution.mainus;

        // Data weather
        var weatherCard = document.getElementById("weatherCard");
        weatherCard.style.display = "block"; // Show card

        document.getElementById("temperature").textContent = data.data.current.weather.tp;
        document.getElementById("humidity").textContent = data.data.current.weather.hu;
        document.getElementById("windDirection").textContent = data.data.current.weather.wd;
        document.getElementById("windSpeed").textContent = data.data.current.weather.ws;

        // Location Information
        var locationCard = document.getElementById("locationCard");
        locationCard.style.display = "block"; // Show card

        document.getElementById("city").textContent = data.data.city;
        document.getElementById("country").textContent = data.data.country;
        document.getElementById("state").textContent = data.data.state;
    }
}

// Finnaly show the data!
displayData(data);