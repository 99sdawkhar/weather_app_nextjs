import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface WeatherData {}

interface FetchWeatherPayload {
  lat: string;
  lon: string;
  units: string;
}

export const fetchWeather = createAsyncThunk<WeatherData, FetchWeatherPayload>(
  "weather/fetchWeather",
  async ({ lat, lon, units }: FetchWeatherPayload, { rejectWithValue }) => {
    try {
      const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API;

      const response = await axios.get(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude='current,minutely,alerts'&units=${units}&appid=${API_KEY}`
      );

      return response.data;
      
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);
