import { useEffect, useState, type ReactNode } from "react";
import { CityContext } from "./CityContext";

export function CityProvider({ children }: { children: ReactNode }) {
  const [city, setCity] = useState<string>("");

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCity(`${latitude},${longitude}`);
    });
  }, []);

  return (
    <CityContext.Provider value={{ city, setCity }}>
      {children}
    </CityContext.Provider>
  );
}
