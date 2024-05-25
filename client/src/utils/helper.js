export const formatDate = (dateInput) => {
  const date = new Date(dateInput);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const dateStart = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  // Check if the given date is today
  if (dateStart.getTime() === today.getTime()) {
    const diffInSeconds = Math.floor((now - date) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else {
      return `${diffInHours} hours ago`;
    }
  } else {
    // Formatting date as 'MMM dd, HH:mm'
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const hours = date
      .getHours()
      .toString()
      .padStart(2, "0");
    const minutes = date
      .getMinutes()
      .toString()
      .padStart(2, "0");

    return `${month} ${day}, ${hours}:${minutes}`;
  }
};

export const formatDateWithoutTime = (dateInput) => {
  const date = new Date(dateInput);
  // Array of month names
  const months = [
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

  // Extracting parts of the date
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Adding leading zero to minutes if necessary
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

  // Constructing the formatted date string
  const formattedDate = `${day} ${month} ${year}`;

  return formattedDate;
};
