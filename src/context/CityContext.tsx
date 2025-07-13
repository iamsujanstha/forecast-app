import { createContext } from "react";

type CityContextType = {
  city: string;
  setCity: (city: string) => void;
};

export const CityContext = createContext<CityContextType | undefined>(undefined);