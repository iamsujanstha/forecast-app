import Details from "./components/Details";
import AirConditions from "./components/AirConditions";
import TodayForecast from "./components/TodayForecast";
import { useGetForecastQuery } from "../../services/weather";
import useCity from "../../hooks/useCity";
import { skipToken } from "@reduxjs/toolkit/query";
import WeatherSkeleton from "./components/WeatherSkeleton";
import EmptyDataText from "../shared/EmptyDataText";

function CurrentWeather() {
	const { city } = useCity();
	
	const { data, isLoading } = useGetForecastQuery(
    city ? { city } : skipToken
  );

	if (isLoading) {
    return <WeatherSkeleton />;
  }

	if (!data) {
		return <EmptyDataText message="No Curent Weather Data :(" />;
	}

	return (
    <>
      <Details data={data} />
      <AirConditions current={data.current} />
      <TodayForecast data={data} />
    </>
  );
}

export default CurrentWeather;
