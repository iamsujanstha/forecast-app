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
const LAST_SEARCHED_KEY = "lastSearchedCity";

function SearchHistory() {
  const [inputValue, setInputValue] = useState(
    localStorage.getItem(LAST_SEARCHED_KEY) || ''
  );
  const [history, setHistory] = useState<string[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [options, setOptions] = useState<string[]>([]);
  const [deletedCity, setDeletedCity] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const { setCity } = useCity();

  const [searchCities, { data: searchResults, isFetching }] = useLazySearchCitiesQuery();
  const debouncedInput = useDebounce(inputValue, 400);

  // Load history from localStorage on initial render
  useEffect(() => {
    const savedHistory = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }

    const lastSearched = localStorage.getItem(LAST_SEARCHED_KEY);
    if (lastSearched) {
      setInputValue(lastSearched);
    }
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

    const newHistory = [trimmed, ...history.filter(
      (c) => c.toLowerCase() !== trimmed.toLowerCase()
    )];

    // Update both history and last searched city in localStorage
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newHistory));
    localStorage.setItem(LAST_SEARCHED_KEY, trimmed);

    setHistory(newHistory);
    setCity(trimmed);
    setInputValue(trimmed); // Keep the searched city in the input field
  };

  const handleSnackbarOpen = useCallback((open: boolean) => {
    setSnackbarOpen(open);
  }, []);

  const handleDelete = useCallback((city: string) => {
    const newHistory = history.filter((c) => c !== city);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newHistory));

    // If the deleted city was the last searched, clear it
    if (localStorage.getItem(LAST_SEARCHED_KEY) === city) {
      localStorage.removeItem(LAST_SEARCHED_KEY);
      setInputValue("");
    }

    setHistory(newHistory);
    setDeletedCity(city);
    handleSnackbarOpen(true);
  }, [history, handleSnackbarOpen]);

  const handleUndo = useCallback(() => {
    if (deletedCity) {
      const newHistory = [deletedCity, ...history];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newHistory));
      setHistory(newHistory);
      setDeletedCity(null);
      handleSnackbarOpen(false);
    }
  }, [deletedCity, history, handleSnackbarOpen]);

  return (
    <>
      <Autocomplete
        options={options}
        inputValue={inputValue}
        value={inputValue} // Add this to control the selected value
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
          <>
            <TextField
              {...params}
              label="Search for a city"
              sx={{ marginBottom: '1rem' }}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {isFetching ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          </>
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