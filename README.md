# 🌤️ Weather App - Final Project

A modern, responsive weather application built with **React**, **TypeScript**, **Vite**, and **Material UI** that meets all assignment requirements.

## 🔍 Features
- 📍 Automatic geolocation detection
- 💾 Search history with undo functionality
- 🕘 Hourly forecast visualization
- ⚠️ Error handling with Snackbar notifications
- 🌑 Dark/light theme toggle

## 🛠️ Tech Stack

| Category          | Technology               |
|-------------------|--------------------------|
| Framework         | React 18                 |
| Build Tool        | Vite                     |
| Language          | TypeScript               |
| UI Library        | Material UI (MUI)        |
| Routing           | react-router-dom v6      |
| State Management  | Context API              |
| Data Fetching     | RTK Query                |
| Tables            | TanStack Table v8        |
| Form Validation   | Formik + Yup             |
| Styling           | MUI + CSS-in-JS          |
| API               | WeatherAPI.com           |
| Persistence       | localStorage             |

## 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/weather-app.git
   cd weather-app
    ```
2. *** create a `.env` file in the root directory and add your WeatherAPI key:
   ```plaintext
   VITE_WEATHER_API_KEY=your_api_key_here_FROM_WEATHERAPI
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start the development server**:
   ```bash
    npm run dev
    ```

5. **Open your browser**:
    Navigate to `http://localhost:5173` to view the app.
6. **Search for a city**:
    Use the search bar to find current weather and weekly forecast for any city.
7. **Explore features**:
    - Toggle dark/light mode
    - View search history
    - Check weekly forecast in a data table
