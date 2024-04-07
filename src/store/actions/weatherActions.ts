import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '@/store/reducers';

interface WeatherData {
  // Define the structure of your weather data here
}

interface FetchWeatherPayload {
  city: string;
}


export const fetchWeather = createAsyncThunk<WeatherData, FetchWeatherPayload>(
  'weather/fetchWeather',
  async ({ city }: FetchWeatherPayload, { rejectWithValue }) => {
    try {
        const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API;
        // const lat = '33.44'
        // const lon = '-94.04'
        const location = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`);
        // const { lat, lon } = location
        const response = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude='current,alerts'&appid=${API_KEY}`);
        return response.data;
    } catch (error) {
      throw error;
    }
  }
);