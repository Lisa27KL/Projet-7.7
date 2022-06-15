// Format date to string
export function DateToString(date, format = 'D/M/YY') {
    const dt = new Date(date);
    const dd = dt.getDate();
    const mm = dt.getMonth() + 1;
    const yy = dt.getFullYear();
    
    let str = format;

    str = str.replace('D', dd > 9 ? dd : '0' + dd);
    str = str.replace('M', mm > 9 ? mm : '0' + mm);
    str = str.replace('YY', yy);
    str = str.replace('Y', yy.toString().substr(-2));

    return str;
}


export function TimeToString(date, format = "H:M"){
    const dt = new Date(date);
    const hh = dt.getHours();
    const min = dt.getMinutes();

    let str = format;

    str = str.replace('H', hh );
    str = str.replace('M', min > 9 ? min : '0' + min);

    return str;
}


const newDate = new Date();

export function DateProfile() {
  const date = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();

  const dayMonthYear = `${date < 10 ? `0${date}` : `${date}`}${"/"}${
    month < 10 ? `0${month}` : `${month}`
  }${"/"}${year}`;

  return dayMonthYear;
}