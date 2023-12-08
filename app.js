// Initialize the map
const map = L.map('map').setView([0, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

function searchCity(event) {
    event.preventDefault();

    const cityNames = document.getElementById('cityNames').value;

    // Check if cityNames is not empty
    if (cityNames.trim().length > 0) {
        const cities = cityNames.split(',');

        // Loop through each city and fetch weather data
        cities.forEach(city => {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=467bbd1fe673c2797731f911eaf7518c`)
                .then(response => response.json())
                .then(data => {
                    // Extract coordinates and weather details from the API response
                    const { coord, main, weather } = data;

                    // Update map view to the city's coordinates
                    map.setView([coord.lat, coord.lon], 10);

                    // Add a marker at the city's coordinates with a popup showing weather details
                    const marker = L.marker([coord.lat, coord.lon]).addTo(map);
                    marker.bindPopup(`
                        <b>${city}</b><br>
                        Temperature: ${main.temp} °F<br>
                        Weather: ${weather[0].description}
                    `).openPopup();
                })
                .catch(error => console.error(`Error fetching weather data for ${city}:`, error));
        });
    } else {
        console.error('City names not specified. Please enter at least one city name.');
    }
}
