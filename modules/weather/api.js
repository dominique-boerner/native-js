/**
 * Fetches weather data from the Open-Meteo API.
 *
 * @returns {Promise} A promise that resolves to an object containing the weather data or an error message.
 *                    The resolved object has a "data" and "error" property.
 *                    The "data" property holds the weather data object if the fetch is successful, otherwise it is null.
 *                    The "error" property holds the error message if the fetch is unsuccessful, otherwise it is null.
 */
async function fetchWeather() {
  const url = "https://api.open-meteo.com/v1/forecast?latitude=51.5&longitude=10.5&daily=temperature_2m_max&models=icon_seamless"
  const result = await fetch(url);
  if (result.ok) {
    return {
      data: await result.json(),
      error: null
    }
  }

  return {
    data: null,
    error: result.statusText
  };
}

export const WeatherApi = {
  fetchWeather: fetchWeather
}