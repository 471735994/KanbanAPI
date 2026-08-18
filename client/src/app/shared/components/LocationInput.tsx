import { useMemo, useState } from "react";
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import type { LocationIQSuggestion } from "../../../lib/types";
import {
  Box,
  debounce,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";

type Props<T extends FieldValues> = { label: string } & UseControllerProps<T>;

export default function LocationInput<T extends FieldValues>(props: Props<T>) {
  const { field, fieldState } = useController({ ...props });
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<LocationIQSuggestion[]>([]);
 
  const locationUrl =
    "https://api.locationiq.com/v1/autocomplete?key=pk.49b05c50279e99528d8e15c02215431c&limit=5&dedupe=1&";

  //使用useMemo来避免每次渲染都重新创建函数
  const fetchSuggestions = useMemo(
    () =>
      debounce(async (query: string) => {
        if (!query || query.length < 3) {
          setSuggestions([]);
          return;
        }
        setLoading(true);
        try {
          const response = await axios.get<LocationIQSuggestion[]>(
            `${locationUrl}q=${query}`,
          );
          setSuggestions(response.data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }, 500),
    [locationUrl],
  );

  const currentValue =
    typeof field.value === "string" ? field.value : (field.value?.venue ?? "");

  const handleChange = async (value: string) => {
    field.onChange(value);
    await fetchSuggestions(value);
  };

  const handleSelect = (location: LocationIQSuggestion) => {
    const city =
      location.address?.city ||
      location.address?.town ||
      location.address?.village;
    const venue = location.display_name;
    const latitude = location.lat;
    const longitude = location.lon;
    field.onChange({ city, venue, latitude, longitude });
    setSuggestions([]);
  };

  return (
    <Box>
      <TextField
        {...props}
        onChange={(e) => handleChange(e.target.value)}
        value={currentValue}
        fullWidth
        variant="outlined"
        error={!!fieldState.error}
        helperText={fieldState.error?.message}
      />
      {loading && <Typography>Loading...</Typography>}
      {suggestions.length > 0 && (
        <List sx={{ border: 1, borderColor: "divider", borderRadius: 1 }}>
          {suggestions.map((suggestion) => (
            <ListItem key={suggestion.place_id}>
              <ListItemButton
                onClick={() => {
                  handleSelect(suggestion);
                }}
              >
                <ListItemText primary={suggestion.display_name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}
