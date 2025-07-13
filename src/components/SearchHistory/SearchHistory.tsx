import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useCallback, useEffect, useState } from "react";
import { useLazySearchCitiesQuery } from "../../services/weather";
import useDebounce from "../../hooks/useDebounce";
import useCity from "../../hooks/useCity";
import SnackbarRemovedCity from "./components/SnackbarRemovedCity";
import SearchHistoryItem from "./components/SearchHistoryItem";
import { CircularProgress } from "@mui/material";

const LOCAL_STORAGE_KEY = "searchHistory";

function SearchHistory() {
  const [inputValue, setInputValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [deletedCity, setDeletedCity] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const { setCity } = useCity();

  const [searchCities, { data: searchResults, isFetching }] = useLazySearchCitiesQuery();
  const debouncedInput = useDebounce(inputValue, 400);

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (!debouncedInput.trim()) {
      setOptions(history);
      return;
    }

    searchCities(debouncedInput);
  }, [debouncedInput, searchCities, history]);

  useEffect(() => {
    if (!searchResults) return;

    const cityNames = searchResults.map(
      (city) =>
        `${city.name}, ${city.region ? city.region + ", " : ""}${city.country}`
    );

    const merged = Array.from(new Set([...cityNames, ...history]));
    setOptions(merged);
  }, [searchResults, history]);

  const handleSearch = (city: string) => {
    const trimmed = city.trim();
    if (!trimmed) return;

    setHistory((prev) => {
      const filtered = prev.filter(
        (c) => c.toLowerCase() !== trimmed.toLowerCase()
      );
		const newHistory = [trimmed, ...filtered]
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newHistory));
      return newHistory;
    });

    setCity(trimmed);
    setInputValue("");
  };

  const handleSnackbarOpen = useCallback((open: boolean) => {
	 setSnackbarOpen(open);
  }, []);

  const handleDelete = useCallback((city: string) => {
	 setHistory((prev) => prev.filter((c) => c !== city));
	 setDeletedCity(city);
	 handleSnackbarOpen(true);
  }, [handleSnackbarOpen]);


  const handleUndo = useCallback(() => {
    if (deletedCity) {
      setHistory((prev) => [deletedCity, ...prev]);
      setDeletedCity(null);
      handleSnackbarOpen(false);
    }
  }, [deletedCity, handleSnackbarOpen])

  return (
    <>
      <Autocomplete
        options={options}
        inputValue={inputValue}
        onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
        loading={isFetching}
        onChange={(_, newValue) => {
          if (typeof newValue === "string") {
            handleSearch(newValue);
          }
        }}
        renderOption={(props, option) => (
          <SearchHistoryItem
            {...props}
            history={history}
            option={option}
            handleDelete={handleDelete}
            key={option}
          />
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search for a city"
            slotProps={{
              input: {
                ...params.InputProps,
                endAdornment: (
                  <>
                    {isFetching ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              },
            }}
          />
        )}
      />

      <SnackbarRemovedCity
        snackbarOpen={snackbarOpen}
        handleUndo={handleUndo}
        handleSnackbarOpen={handleSnackbarOpen}
      />
    </>
  );
}

export default SearchHistory;
