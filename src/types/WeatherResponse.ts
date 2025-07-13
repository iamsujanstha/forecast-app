import type { CurrentWeather } from "./CurrentWeather";
import type { Forecast } from "./Forecast";
import type { Location } from "./Location";

export interface WeatherResponse {
  location: Location;
  current: CurrentWeather;
  forecast: Forecast;
}
