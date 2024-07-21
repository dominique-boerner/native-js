import {AppTableChangeEvent} from "../../components/app-table.js";
import {WeatherApi} from "./api.js";
import "../../components/index.js";

const weatherFetchButton = document.querySelector("app-button");
weatherFetchButton.addClickListener(updateWeatherTable())

function updateWeatherTable() {
  return async () => {
    const response = await WeatherApi.fetchWeather();
    const data = response.data;
    const weatherTable = document.querySelector("app-table");
    const temperatureUnit = data.daily_units.temperature_2m_max;
    const formattedDate = data.daily.time.map(date => new Date(date).toLocaleDateString("de-DE"));
    const formattedTemperature = data.daily.temperature_2m_max.map(temp => `${temp}${temperatureUnit}`);
    weatherTable.dispatchEvent(new AppTableChangeEvent({
      head: formattedDate,
      rows: formattedTemperature,
    }));
  };
}

