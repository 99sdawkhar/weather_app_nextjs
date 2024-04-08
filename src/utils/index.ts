export const formatMMMMDD_hh_mm = () => {
  // Convert timestamp to milliseconds (Unix timestamp is in seconds)
  const date = new Date();

  // Get the month name
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[date.getMonth()];

  // Get the day of the month
  const day = date.getDate();

  // Get the hours and minutes
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const year = date.getFullYear();

  // Format the date string
  const formattedDate = `${month} ${day}, ${hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }`;

  return formattedDate;
};

export const convertTimestampToLocalTime = (timestamp: number) => {
    const currentTime = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds
    const localTimeString = currentTime.toLocaleTimeString([], {hour: 'numeric', minute: 'numeric', hour12: true});
  
    const [hours, minutes, period] = localTimeString.split(/:| /);
  
    return {
      hours: parseInt(hours),
      period
    };
};

// Function to convert timestamp to date string (e.g., '08-04-2024')
export const formatDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

// Organize the data
export const organizeData = (data: any) => {
  return (
    Array.isArray(data.hourly) &&
    data.hourly.length > 0 &&
    data.hourly.reduce((acc: any, item: any) => {
      if (Object.keys(item).length === 0 && item.constructor === Object) {
        return acc; // Skiping processing empty item
      }

      const date = formatDate(item.dt);
      const existingItem = acc.find((entry: any) => entry.date === date);

      if (existingItem) {
        existingItem.hourlyData.push(item);
      } else {
        acc.push({ date: date, hourlyData: [item] });
      }

      return acc;
    }, [])
  );
};

export const renderUnits = (units: string) => {
  return units === "metric" ? '\u00B0C' : '\u00B0F';
};


export const renderSpeedUnits = (units: string) => {
  return units === "metric" ? 'm/s' : 'mi/h';
};
