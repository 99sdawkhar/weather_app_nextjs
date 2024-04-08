import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/reducers";
import { useEffect, useState } from "react";
import { fetchWeather } from "@/store/actions/weatherActions";
import axios from "axios";
import Image from "next/image";
import { formatMMMMDD_hh_mm, renderUnits } from "@/utils";
import { handleLocation } from "@/store/reducers/weatherReducer";
import { addSearch } from "@/store/reducers/recentSearchesReducer";
import Modalbox from "./Modal";
import { Search } from "lucide-react";
import toast from "react-hot-toast";
import Loader from "./Loader";
import Toggle from "./Toggle";

const Banner = () => {
  const dispatch = useDispatch();
  const recentSearches = useSelector(
    (state: RootState) => state.recentSearches.searches
  );
  const { data, loading: apiLoader, location, error, units } = useSelector(
    (state: RootState) => state.weather
  );
  const current = data?.daily?.[0];

  const defaultImage =
    "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODc4OTZ8MHwxfHNlYXJjaHwxfHxtdW1iYWl8ZW58MHx8fHwxNzEyNDg2NDU1fDA&ixlib=rb-4.0.3&q=80&w=400";
    
  const [loading, setLoading] = useState(apiLoader?? true);
  const [bgImage, setBgImage] = useState(defaultImage);
  const [search, setSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [popupShow, setPopupShow] = useState(false);

  const getUserLocation = () => {
    return new Promise((res) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          res({
            lat: latitude,
            lon: longitude,
          });
        },
        (error) => {
          toast.error(
            "Error fetching user location. Please allow location access.",
            {
              id: "error",
            }
          );
        }
      )
    });
  };

  const getCityNameByCoords = async (lat: number, lon: number) => {
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${process.env.NEXT_PUBLIC_WEATHER_API}`
      );
      const { name = "", country = "" } = data?.[0];

      return {
        city: name,
        country,
        lat,
        lon,
      };
    } catch (error) {
      toast.error("Error fetching city and country", {
        id: "error",
      });
    }
  };

  const fetchBgImage = async (city: string) => {
    try {
      const clientId = process.env.NEXT_PUBLIC_UNSPLASH_CLIENT_ID;
      const { data } = await axios.get(
        `https://api.unsplash.com/search/photos?query=${city}&client_id=${clientId}&per_page=1`
      );
      return data?.results?.[0]?.urls?.small;
    } catch (err) {
      toast.error("No image found for selected location.", {
        id: "error",
      });
    }
  };

  const handleChange = (val: string) => setSearch(val);

  const handleClosePopUp = () => {
    setShowSuggestions(false);
    setPopupShow(false);
    setSearch("");
  };

  const handleSearch = async () => {
    try {
      const image = await fetchBgImage(search);

      const { data: details } = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=1&appid=${process.env.NEXT_PUBLIC_WEATHER_API}`
      );

      const { name = "", country = "", lat: dLat, lon: dLon } = details?.[0];

      dispatch(
        handleLocation({
          country,
          city: name,
          lat: dLat,
          lon: dLon,
        })
      );

      dispatch(addSearch(search));
      // @ts-ignore
      dispatch(fetchWeather({ lat: dLat, lon: dLon, units }));

      image && setBgImage(image);
      setSearch("");
      handleClosePopUp();
    } catch (err) {
      toast.error("No such location found.", {
        id: "error",
      });
      setSearch("");
    }
  };

  useEffect(() => {
    setLoading(true);
    getUserLocation()
      .then((res: any) => {
        const { lat, lon } = res;
        // @ts-ignore
        dispatch(fetchWeather({ lat, lon, units }));
        return res;
      })
      .then((res: any) => {
        const { lat, lon } = res;

        dispatch(
          handleLocation({
            city: location.city,
            country: location.country,
            lat,
            lon,
          })
        );

        return getCityNameByCoords(lat, lon);
      })
      .then((res) => {
        dispatch(
          handleLocation({
            lat: res?.lat,
            lon: res?.lon,
            city: res?.city,
            country: res?.country,
          })
        );
        return res;
      })
      .then((res) => {
        const image = fetchBgImage(res?.city);
        return image;
      })
      .then((image) => {
        image && setBgImage(image);
        return image
      })
      .then((image) => {
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Something went wrong. Please try again after sometime", {
          id: "error",
        });
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    error && toast.error(error, { id: "API Error" });
  }, [error]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div
        className={"p-4 bg-cover bg-center rounded-b-3xl mb-4 relative"}
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="xl:max-w-4xl mx-auto">
          <div className="flex justify-between gap-2 items-center mb-2">
            <div className="text-white font-semibold text-md">
              {location?.city}, {location?.country}
            </div>
            <Search
              className="w-4 h-4 text-white cursor-pointer"
              onClick={() => setPopupShow(true)}
            />
          </div>

          <div className="flex justify-between mb-7 text-white items-end">
            <div>
              <span className="text-6xl inline-block">
                {current?.temp?.day}{renderUnits(units)}
              </span>
              <span className="-ml-3 text-xs inline-block">
                Feels like {current?.feels_like?.day}{renderUnits(units)}
              </span>
            </div>
            <div className="flex items-center justify-center flex-col">
              {current?.weather?.[0]?.icon && (
                <figure>
                  <Image
                    src={`https://openweathermap.org/img/wn/${current?.weather?.[0]?.icon}@2x.png`}
                    alt={current?.weather?.[0]?.description}
                    width={100}
                    height={100}
                    className="rounded"
                  />
                </figure>
              )}
              <span className="capitalize">{current?.weather?.[0]?.main}</span>
            </div>
          </div>

          <div className="flex justify-between text-white items-end text-xs">
          <div className="flex flex-col items-start justify-start gap-2 font-semibold">
              <div>{formatMMMMDD_hh_mm()}</div>
              <Toggle />
            </div>
            <div className="flex flex-col items-end font-semibold">
              {current?.temp?.morn && (
                <span>Day {current?.temp?.morn}{renderUnits(units)}</span>
              )}
              {current?.temp?.night && (
                <span>Night {current?.temp?.night}{renderUnits(units)}</span>
              )}
            </div>
          </div>
        </div>
      </div>
      <Modalbox isOpen={popupShow} onClose={handleClosePopUp}>
        <>
          <div className="flex justify-center items-center gap-1">
            <input
              type="text"
              name="search"
              placeholder="Search city here..."
              className="p-2 border text-sm rounded-md placeholder:pl-2 w-3/4 text-black"
              value={search}
              onChange={(e) => handleChange(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
            />
            <button
              className="px-3 py-2 bg-[#E0B6FF] rounded-md text-black"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
          {showSuggestions &&
            Array.isArray(recentSearches) &&
            recentSearches.length > 0 && (
              <ul className="bg-white border border-gray-300 rounded-md shadow-lg w-3/4">
                {recentSearches.map((suggestion: string, i: number) => (
                  <li
                    key={i}
                    className="text-sm px-4 py-2 cursor-pointer hover:bg-gray-100 text-black"
                    onClick={() => {
                      handleChange(suggestion);
                      setShowSuggestions(false);
                    }}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
        </>
      </Modalbox>
    </>
  );
};

export default Banner;
