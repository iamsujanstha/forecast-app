import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { WeatherResponse } from "../types/WeatherResponse";
import type { Location } from "../types/Location";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;


export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.weatherapi.com/v1",
  }),
  endpoints: (builder) => ({
    getForecast: builder.query<
      WeatherResponse,
      { city: string; days?: number }
    >({
      query: ({ city, days = 7 }) => ({
        url: "/forecast.json",
        params: {
          key: API_KEY,
          q: city,
          days,
        },
      }),
    }),
    searchCities: builder.query<Location[], string>({
      query: (q) => ({
        url: "/search.json",
        params: { key: API_KEY, q },
      }),
    }),
  }),
});


export const { useGetForecastQuery, useLazySearchCitiesQuery } = weatherApi;
