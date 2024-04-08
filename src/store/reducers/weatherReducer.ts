import { createSlice } from "@reduxjs/toolkit";
import { fetchWeather } from "@/store/actions/weatherActions";
import { organizeData } from "@/utils";

interface WeatherState {
  data: any;
  transformedHourlyForecast: any;
  location: {
    lat: number | null;
    lon: number | null;
    city: string;
    country: string;
  };
  units: string;
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  data: null,
  transformedHourlyForecast: null,
  location: {
    lat: null,
    lon: null,
    city: "",
    country: "",
  },
  units: "metric",
  loading: true,
  error: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    handleLocation: (state, action) => {
      const { lat, lon, city, country } = action.payload;
      state.location.lat = lat;
      state.location.lon = lon;
      state.location.city = city;
      state.location.country = country;
    },
    handleCelsius: (state, action) => {
      state.units = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.transformedHourlyForecast = organizeData(action.payload);
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      });
  },
});

export const { handleLocation, handleCelsius } = weatherSlice.actions;
export default weatherSlice.reducer;
