import {AppButton} from "../../components/index.js";

const weatherFetchButton = document.querySelector("app-button");

weatherFetchButton.addEventListener(AppButton.EVENT_ON_CLICK, async (e) => {
  const url = "https://api.open-meteo.com/v1/forecast?latitude=52.0333&longitude=8.5333&hourly=temperature_2m"

  const result = await fetch(url);
  if (result.ok) {
    const data = await result.json();

    const temp = data.hourly.temperature_2m[data.hourly.temperature_2m.length - 1];
    const date = data.hourly.time[data.hourly.time.length - 1];
    const unit = data.hourly_units.temperature_2m;

    const optionsDate = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    };
    const optionsTime = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    };

    const datePart = new Date(date).toLocaleDateString('de-DE', optionsDate);
    const timePart = new Date(date).toLocaleTimeString('de-DE', optionsTime);

    const label = `${datePart}, ${timePart}: ${temp}${unit}`

    weatherFetchButton.dispatchEvent(new CustomEvent(AppButton.EVENT_UPDATE, {
      detail: {
        label
      },
      bubbles: true,
      composed: true
    }));
  }
})