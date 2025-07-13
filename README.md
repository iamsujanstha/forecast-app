# 🌤️ Weather App

A modern, responsive weather application built with **React**, **Vite**, **Redux Toolkit Query**, and **Material UI**. It provides current weather data, hourly forecast, and weekly forecast based on the user's selected city or geolocation.

## 🔍 Features

- 📍 Detects user's location on first load (with fallback to Lviv)
- 🔎 City search with autocomplete suggestions from WeatherAPI
- 💾 Search history stored in localStorage with delete & undo options
- 🕘 Today's hourly forecast with weather icons
- 📅 Weekly forecast with temperature range and chance of rain
- 🧱 Skeleton loaders while data is loading
- 🧠 Global city context for managing selected location
- ⚠️ Error boundary and global error catching with Snackbar
- 🧩 Modular component-based architecture
- 🌑 Styled with dark theme using Material UI & custom theme
- 📊 Interactive weather data table powered by **TanStack Table** for listing

## 🛠️ Tech Stack

- ⚛️ **React** + **Vite**
- ⚙️ **Redux Toolkit Query** (RTK Query)
- 💅 **Material UI (MUI)**
- 📦 **localStorage**
- 📡 **WeatherAPI** - https://www.weatherapi.com/
- 🧠 **React Context** for city management
- 💬 **Snackbar** notifications

## 📦 Installation

```bash
git clone https://github.com/your-username/weather-app.git
cd weather-app
npm install
