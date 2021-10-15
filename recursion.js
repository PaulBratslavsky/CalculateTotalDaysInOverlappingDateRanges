// CALCULATE OVERLAPING DAYS
const differenceInDays = require('date-fns/differenceInDays');
const areIntervalsOverlapping = require('date-fns/areIntervalsOverlapping');

const dates = [
  {
    id: 0,
    start: new Date('01/01/2019'),
    end: new Date('02/01/2019'),
  },
  {
    id: 1,
    start: new Date('01/01/2020'),
    end: new Date('02/01/2020'),
  },
  {
    id: 2,
    start: new Date('01/15/2020'),
    end: new Date('02/15/2020'),
  },
  {
    id: 3,
    start: new Date('02/11/2020'),
    end: new Date('03/11/2020'),
  },
  {
    id: 4,
    start: new Date('03/16/2020'),
    end: new Date('04/16/2020'),
  },
   {
    id: 5,
    start: new Date('02/11/2021'),
    end: new Date('03/11/2021'),
  },
  {
    id: 6,
    start: new Date('03/09/2021'),
    end: new Date('04/16/2021'),
  },
];

const dates2 = [
  {
    id: 0,
    start: new Date('01/01/2019'),
    end: new Date('02/01/2019'),
  },
  {
    id: 1,
    start: new Date('01/01/2020'),
    end: new Date('02/01/2020'),
  },
  {
    id: 2,
    start: new Date('01/15/2020'),
    end: new Date('02/15/2020'),
  },
  {
    id: 3,
    start: new Date('02/11/2020'),
    end: new Date('03/11/2020'),
  },
  {
    id: 4,
    start: new Date('03/16/2020'),
    end: new Date('04/16/2020'),
  },
  {
    id: 5,
    start: new Date('02/11/2021'),
    end: new Date('03/11/2021'),
  },
  {
    id: 6,
    start: new Date('03/09/2021'),
    end: new Date('04/16/2021'),
  },
  {
    id: 7,
    start: new Date('05/09/2021'),
    end: new Date('05/16/2021'),
  },
  {
    id: 8,
    start: new Date('05/07/2021'),
    end: new Date('07/16/2021'),
  },
];

function getDateRangesWithNoOverlap(dates) {
  const tempArray = [...dates];
  let next = true;

  for (let index = 0; index < tempArray.length; index++) {
    const hasNextRange = tempArray[index + 1] !== undefined;
    const thisRange = tempArray[index];
    const nextRange = tempArray[index + 1];

    if (hasNextRange) {
      const initialRange = { start: thisRange.start, end: thisRange.end };
      const toRange = { start: nextRange.start, end: nextRange.end };
      const isOverlaping = areIntervalsOverlapping(initialRange, toRange);

      if (isOverlaping) {
        const newRange = {
          id: thisRange.id,
          start: thisRange.start,
          end: nextRange.end,
        };

        tempArray.splice([index + 1], 1);
        tempArray.splice([index], 1, newRange);
        break;
      } 
    } else {
      next = false;
    }
  }

  if (next) {
    return getDateRangesWithNoOverlap(tempArray);
  } else {
    return tempArray;
  }
}

function calculateTotalDaysInRange(dates) {
  return dates.map((dateRange) => {
    const totalDays = differenceInDays(dateRange.end, dateRange.start);
    return {
      ...dateRange,
      totalDays,
    };
  });
}

const result = getDateRangesWithNoOverlap(dates2);
console.log(result, 'result');

const totalDays = calculateTotalDaysInRange(result)
console.log(totalDays);

const sumOfAllDays = totalDays.reduce((acc, item) => item.totalDays + acc,0)
console.log(sumOfAllDays);


