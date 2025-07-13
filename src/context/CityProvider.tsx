import { useEffect, useState, type ReactNode, useCallback } from "react";
import { CityContext } from "./CityContext";

export function CityProvider({ children }: { children: ReactNode }) {
  const [city, setCity] = useState<string>(() => {
    return localStorage.getItem('lastSearchedCity') || "";
  });

  const updateCity = useCallback((newCity: string) => {
    setCity(newCity);
    if (newCity) {
      localStorage.setItem('lastSearchedCity', newCity);
    } else {
      localStorage.removeItem('lastSearchedCity');
    }
  }, []);

  useEffect(() => {
    // Only attempt geolocation if no city is set (empty or from localStorage)
    if (!city && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          updateCity(`${latitude},${longitude}`);
        },
        (error) => {
          console.error("Geolocation error:", error);
          // Fallback to a default city if geolocation fails
          updateCity("Tokyo, Japan");
        }
      );
    }
  }, [city, updateCity]);

  return (
    <CityContext.Provider value={{ city, setCity: updateCity }}>
      {children}
    </CityContext.Provider>
  );
}