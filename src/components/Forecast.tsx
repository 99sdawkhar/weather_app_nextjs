import { RootState } from "@/store/reducers";
import { renderUnits } from "@/utils";
import Image from "next/image";
import React, { ReactNode } from "react";
import { useSelector } from "react-redux";

interface IList {
  temp: string;
  photo: string;
  time: {
    hours: number;
    period: string;
  };
}

interface ICard {
  icon: ReactNode;
  title: string;
  list: IList[];
}

const Forecast = ({ icon, title, list }: ICard) => {
  const units = useSelector(
    (state: RootState) => state.weather.units
  );
  return (
    <div className="rounded-2xl px-4 py-3  bg-[#D0BCFF4D] mb-4">
      <div className="flex justify-start items-center gap-2 mb-4">
        <div className="bg-white text-black rounded-2xl p-1.5">{icon}</div>
        <span className="text-sm text-black">{title}</span>
      </div>
      <div className="w-full flex justify-start gap-4 overflow-x-auto">
        {Array.isArray(list) &&
          list.length > 0 &&
          list.map((item: any, i: number) => (
            <div key={i} className="flex flex-col items-center justify-center">
              <span className="text-sm inline-block">
                {item?.time?.hours}
                <span className="text-[10px] text-black">{item?.time?.period}</span>
              </span>
              <figure className="inline-block">
                <Image
                  src={`https://openweathermap.org/img/wn/${item?.photo}@2x.png`}
                  alt={item.desc}
                  width={50}
                  height={65}
                />
              </figure>
              <span className="text-xs sm:text-sm text-black">{item?.temp}{renderUnits(units)}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Forecast;
