export default function convertDate(date:Date) { 
  //convert date
  const m = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

  return date.getDate() + ' ' + m[date.getMonth()] + ' ' + date.getFullYear()
    + ", " + date.getHours() + ":" + date.getMinutes();
};