import {
  Clock5,
  CloudRain,
  LucideCalendarRange,
  Sun,
  Waves,
  Wind,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import Pill from "./Pill";
import Forecast from "./Forecast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/reducers";
import { convertTimestampToLocalTime, renderSpeedUnits } from "@/utils";

enum ETab {
  today = "Today",
  tomorrow = "Tomorrow",
  dayAfterTomorrow = "Day After Tomorrow",
}

const CurrentDetails = () => {
  const dispatch = useDispatch();
  const we̥ather = useSelector((state: RootState) => state.weather.data);
  const units = useSelector(
    (state: RootState) => state.weather.units
  );
  const hourlyForecast = useSelector(
    (state: RootState) => state.weather.transformedHourlyForecast
  );
  const loading = useSelector(
    (state: RootState) => state.weather.loading
  );

  const [tab, setTab] = useState<ETab>(ETab.today);
  const [currentHourlyForecast, setCurrentHourlyForecast] = useState<[]>([]);

  const daily = we̥ather?.daily?.[0];
  
  // Function to filter hourly forecast based on the selected tab
  const getFilteredForecast = (tab: ETab) => {
    const todayDate = new Date();
    const tomorrowDate = new Date(todayDate);
    const dayAfterTomorrowDate = new Date(todayDate);

    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    dayAfterTomorrowDate.setDate(dayAfterTomorrowDate.getDate() + 2);

    const filterDate = (item: any, targetDate: Date) => {
      const itemDate = new Date(item?.hourlyData?.[0]?.dt * 1000);
      return itemDate.getDate() === targetDate.getDate() ? item.hourlyData : [];
    };

    switch (tab) {
      case ETab.today:
        return hourlyForecast?.flatMap((item: any) =>
          filterDate(item, todayDate)
        );
      case ETab.tomorrow:
        return hourlyForecast?.flatMap((item: any) =>
          filterDate(item, tomorrowDate)
        );
      case ETab.dayAfterTomorrow:
        return hourlyForecast?.flatMap((item: any) =>
          filterDate(item, dayAfterTomorrowDate)
        );
      default:
        return [];
    }
  };

  const handleSwitch = (tab: ETab) => {
    setTab(tab);
    const filteredForecast = getFilteredForecast(tab);
    const hours: any =
      Array.isArray(filteredForecast) && filteredForecast.length > 0
        ? filteredForecast.map((item: any) => {
            if (item) {
              return {
                temp: item.temp,
                photo: item.weather?.[0]?.icon,
                desc: item.weather?.[0]?.description,
                time: convertTimestampToLocalTime(item.dt),
              };
            }
          })
        : [];

    setCurrentHourlyForecast(hours);
  };

  useEffect(() => {
    handleSwitch(tab);
  }, [loading === false]);

  return (
    <div className="pb-4 xl:max-w-4xl mx-auto">
      <div className="mb-4 flex justify-center flex-nowrap gap-2 sm:gap-4 px-8">
        <Pill
          title={ETab.today}
          handleClick={() => handleSwitch(ETab.today)}
          isActive={tab === ETab.today ? true : false}
        />
        <Pill
          title={ETab.tomorrow}
          handleClick={() => handleSwitch(ETab.tomorrow)}
          isActive={tab === ETab.tomorrow ? true : false}
        />
        <Pill
          title={ETab.dayAfterTomorrow}
          handleClick={() => handleSwitch(ETab.dayAfterTomorrow)}
          isActive={tab === ETab.dayAfterTomorrow ? true : false}
        />
      </div>

      <div className="flex justify-between flex-wrap md:flex-nowrap gap-x-4 gap-y-3 px-8 mb-4">
        {daily?.wind_speed && (<Card
          icon={<Wind className="w-4 h-4" />}
          title={"Wind speed"}
          detail={`${daily?.wind_speed} ${renderSpeedUnits(units)}`}
        />)}
        {daily?.rain && (<Card
          icon={<CloudRain className="w-4 h-4" />}
          title={"Rain chance"}
          detail={`${daily?.rain} %`}
        />)}
        {daily?.pressure && (<Card
          icon={<Waves className="w-4 h-4" />}
          title={"Pressure"}
          detail={`${daily?.pressure} hpa`}
        />)}
        {daily?.uvi && (<Card
          icon={<Sun className="w-4 h-4" />}
          title={"UV Index"}
          detail={daily?.uvi}
        />)}
      </div>

      <div className="px-8 mb-4">
        <Forecast
          icon={<Clock5 className="w-4 h-4" />}
          title={"Hourly forecast"}
          list={currentHourlyForecast}
        />
        {/* <Forecast
          icon={<LucideCalendarRange className="w-4 h-4" />}
          title={"Day forecast"}
          list={dailyData}
        /> */}
      </div>
    </div>
  );
};

export default CurrentDetails;
