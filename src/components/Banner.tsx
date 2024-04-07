import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/reducers";
import { useEffect, useState } from "react";
import { fetchWeather } from "@/store/actions/weatherActions";
import SearchBar from "@/components/SearchBar";
import axios from "axios";
import Image from "next/image";

const Banner = () => {
  const clientId = process.env.NEXT_PUBLIC_UNSPLASH_CLIENT_ID;
  const UNSPLASH_ROOT = "https://api.unsplash.com";
  const getPhotosByQuery = async ({ query }: { query: string }) => {
    const { data } = await axios.get(
      `${UNSPLASH_ROOT}/search/photos?query=${query}&client_id=${clientId}&per_page=1`
    );
    return data?.results?.[0]?.urls?.small;
  };

  const dispatch = useDispatch();
  // const we̥ather = useSelector((state: RootState) => state.weather.data);
  // const loading = useSelector((state: RootState) => state.weather.loading);
  // const error = useSelector((state: RootState) => state.weather.error);

  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const defaultImage =
    "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODc4OTZ8MHwxfHNlYXJjaHwxfHxtdW1iYWl8ZW58MHx8fHwxNzEyNDg2NDU1fDA&ixlib=rb-4.0.3&q=80&w=400";
  const [bgImage, setBgImage] = useState(defaultImage);
  const [search, setSearch] = useState('');

  const getUserLocation = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lon: longitude });
        setLoading(false);
      },
      (error) => {
        setError("Error fetching user location. Please allow location access.");
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    // Fetch user's current location when component mounts
    getUserLocation();
  }, []);

  useEffect(() => {
    getPhotosByQuery({ query: "mumbai" })
    .then((res) => setBgImage(res))
    .catch((err) => console.error(err));
  
  }, []);

  const image = `https://openweathermap.org/img/wn/10d@2x.png`

  // useEffect(() => {
  //   if (location) {
  //     // Fetch weather data using the obtained location coordinates
  //     dispatch(fetchWeather(location));
  //   }
  // }, [location]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={"p-4 bg-cover rounded-b-3xl"} style={{ backgroundImage: `url(${bgImage})`}}>
      <SearchBar 
        search={search}
        handleChange={(e) => setSearch(e.target.value)}
        // handleSubmit={}
      />
      <div className="flex justify-between mb-7 text-white items-end">
        <div>
          <span className="text-6xl inline-block">3&deg;</span>
          <span className="-ml-3 text-xs inline-block">Feels like 2&deg;</span>
        </div>
        <div className="flex items-center justify-center flex-col">
          <Image src={image} alt={'test'} width={100} height={100} className="rounded" />
          <span>Cloudy</span>
        </div>
      </div>

      <div className="flex justify-between text-white items-end text-xs">
        <span className="">{"new Date().toISOString()"}</span>
        <div className="flex flex-col items-end font-semibold">
          <span>Day 3&deg;</span>
          <span>Night -1&deg;</span>
        </div>
      </div>
    </div>
  );
}

export default Banner;
