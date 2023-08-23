function gregorianToEthiopian(gregorianYear, gregorianMonth, gregorianDay) {
  let ethiopianYear = gregorianYear - 8;
  let ethiopianMonth = gregorianMonth + 4;
  let ethiopianDay = gregorianDay - 6;

  if (ethiopianMonth > 12) {
    ethiopianMonth -= 12;
    ethiopianYear += 1;
  }

  if (ethiopianDay <= 0) {
    ethiopianMonth -= 1;
    if (ethiopianMonth <= 0) {
      ethiopianMonth += 12;
      ethiopianYear -= 1;
    }

    const maxDayInEthiopianMonth = 30;
    ethiopianDay += maxDayInEthiopianMonth;
  }

  return `${ethiopianYear}/${ethiopianMonth}/${ethiopianDay}`;
}

export { gregorianToEthiopian };
