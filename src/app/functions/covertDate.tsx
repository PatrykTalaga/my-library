export default function convertDate(date: Date) {
  //convert date
  const m = [
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

  //9:05 not 9:5
  let minutes: string;
  if (date.getMinutes() < 10) {
    minutes = "0" + date.getMinutes().toString();
  } else {
    minutes = date.getMinutes().toString();
  }

  return (
    date.getDate() +
    " " +
    m[date.getMonth()] +
    " " +
    date.getFullYear() +
    ", " +
    date.getHours() +
    ":" +
    minutes
  );
}
