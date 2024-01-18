document.addEventListener('DOMContentLoaded', function () {
  // Get references to UI elements
  const locationInput = document.getElementById('location');
  const getWeatherBtn = document.getElementById('getWeatherBtn');
  const weatherInfoDiv = document.getElementById('weatherInfo');

  // Retrieve the last requested location from Local Storage
  const lastLocation = localStorage.getItem('lastLocation');
  if (lastLocation) {
      locationInput.value = lastLocation;
  }

  // Event listener for the 'Get Weather' button
  getWeatherBtn.addEventListener('click', getWeather);

  // Function to fetch weather data from OpenWeatherMap API
  function getWeather() {
      // Get the location from the input field
      const location = locationInput.value;

      // Check if the location is empty
      if (location.trim() === '') {
          alert('Voer een locatie in.');
          return;
      }

      // Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
      const apiKey = 'd7f6fdc42caeeb6e711b7cf54cc79fc2';

      // Make a fetch request to the OpenWeatherMap API
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`)
          .then(response => {
              // Check if the response is successful
              if (!response.ok) {
                  throw new Error('Locatie niet gevonden.');
              }
              return response.json();
          })
          .then(data => {
              // Extract weather information from the API response
              const temperatureKelvin = data.main.temp;
              const temperatureCelsius = (temperatureKelvin - 273.15).toFixed(2);
              const humidity = data.main.humidity;
              const description = data.weather[0].description;
              const iconCode = data.weather[0].icon;
              const windSpeed = data.wind.speed;
              const sunriseTimestamp = data.sys.sunrise * 1000; // Convert to milliseconds
              const sunsetTimestamp = data.sys.sunset * 1000;   // Convert to milliseconds

              // Convert timestamp to a readable time format
              const sunriseTime = new Date(sunriseTimestamp).toLocaleTimeString();
              const sunsetTime = new Date(sunsetTimestamp).toLocaleTimeString();

              // Save the current location to Local Storage
              localStorage.setItem('lastLocation', location);

              // Map weather conditions to Weather Icons class names
              const weatherIconClass = getWeatherIconClass(iconCode);

              // Construct the HTML with additional weather information and icons
              weatherInfoDiv.innerHTML = `
                  <p>Temperatuur: ${temperatureCelsius}°C <i class="${weatherIconClass}"></i></p>
                  <p>Luchtvochtigheid: ${humidity}% <i class="${weatherIconClass}"></i></p>
                  <p>Beschrijving: ${description} <i class="${weatherIconClass}"></i></p>
                  <p>Wind: ${windSpeed} m/s <i class="${weatherIconClass}"></i></p>
                  <p>Zonsopgang: ${sunriseTime} <i class="${weatherIconClass}"></i></p>
                  <p>Zonsondergang: ${sunsetTime} <i class="${weatherIconClass}"></i></p>
              `;
          })
          .catch(error => {
              // Handle errors and update the DOM with an error message
              weatherInfoDiv.innerHTML = `<p>Fout: ${error.message}</p>`;
          });
  }

  // Function to map OpenWeatherMap icon codes to Weather Icons class names
  function getWeatherIconClass(iconCode) {
      switch (iconCode) {
          case '01d':
              return 'wi wi-day-sunny';
          case '01n':
              return 'wi wi-night-clear';
          case '02d':
              return 'wi wi-day-cloudy';
          case '02n':
              return 'wi wi-night-alt-cloudy';
          case '03d':
          case '03n':
              return 'wi wi-cloud';
          case '04d':
          case '04n':
              return 'wi wi-cloudy';
          case '09d':
          case '09n':
              return 'wi wi-showers';
          case '10d':
              return 'wi wi-day-rain';
          case '10n':
              return 'wi wi-night-alt-rain';
          case '11d':
          case '11n':
              return 'wi wi-thunderstorm';
          case '13d':
          case '13n':
              return 'wi wi-snow';
          case '50d':
          case '50n':
              return 'wi wi-fog';
          default:
              return 'wi wi-na'; // Default icon for unknown conditions
      }
  }
});
