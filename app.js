// CALCULATE OVERLAPING DAYS
const differenceInDays = require('date-fns/differenceInDays');
const areIntervalsOverlapping = require('date-fns/areIntervalsOverlapping');



const dates = [
  {
    id: 0,
    start: new Date('01/01/2019'),
    end: new Date('02/01/2019'),
    days_reserved: daysInMonth(new Date('01/01/2019').getMonth(), 
                                new Date('01/01/2019').getYear()),
  },
  {
    id: 1,
    start: new Date('01/01/2020'),
    end: new Date('02/01/2020'),
    days_reserved: daysInMonth(new Date('01/01/2020').getMonth(), 
                                new Date('02/01/2020').getYear()),
  },
  {
    id: 2,
    start: new Date('01/15/2020'),
    end: new Date('02/15/2020'),
    days_reserved: daysInMonth(new Date('01/15/2020').getMonth(), 
                                new Date('02/15/2020').getYear()),
  },
  {
    id: 3,
    start: new Date('02/11/2020'),
    end: new Date('03/11/2020'),
    days_reserved: daysInMonth(new Date('02/11/2020').getMonth(), 
                                new Date('03/11/2020').getYear()),
  },
  {
    id: 4,
    start: new Date('03/16/2020'),
    end: new Date('04/16/2020'),
    days_reserved: daysInMonth(new Date('03/16/2020').getMonth(), 
                                new Date('04/16/2020').getYear()),
  },
   {
    id: 5,
    start: new Date('02/11/2021'),
    end: new Date('03/11/2021'),
    days_reserved: daysInMonth(new Date('02/11/2021').getMonth(), 
                                new Date('03/11/2021').getYear()),
  },
  {
    id: 6,
    start: new Date('03/09/2021'),
    end: new Date('04/16/2021'),
    days_reserved: daysInMonth(new Date('03/09/2021').getMonth(), 
                                new Date('04/16/2021').getYear()),
  },
];

////////////////////////////
// https://stackoverflow.com/questions/1184334/get-number-days-in-a-specified-month-using-javascript
// Month in JavaScript is 0-indexed (January is 0, February is 1, etc), 
// but by using 0 as the day it will give us the last day of the prior
// month. So passing in 1 as the month number will return the last day
// of January, not February
function daysInMonth (month, year) {
  return new Date(year, month, 0).getDate();
}
// July
// daysInMonth(7,2009); // 31
// February
// daysInMonth(2,2009); // 28
// daysInMonth(2,2008); // 29
/////////////////////////////

/*
  curr // start date
  free_days // counter for free days
  total_days // duh
  idx = 0;

  while idx < dates.length 
  {
    if curr[idx].end < curr[idx+1].start
    {
      for j < (curr[idx+1].start - curr[idx].end)
      {
        free_days++;
      }
      total_days++;
    }
  }

  return (total_days - free_days);
*/
function freeRicky(dates)
{
  let curr = [...dates]; // starting date
  let free_days = 0; // counter for the amount of free days 
  let total_days = 0; // what you think this is?
  let i = 0; // counter used as a replacement for creating an iterator

  console.log(curr[0])
  while (i < dates.length)
  {
    // console.log(curr[i].start, "\n", curr[i].start.getMonth())
    curr_month = curr[i].start.getMonth();
    curr_year = curr[i].start.getYear();
    if (curr[i+1])
    {
      next_month = curr[i+1].start.getMonth();
      next_year = curr[i+1].start.getYear();

      let overlap = curr[i+1].start.getTime() - curr[i].end.getTime()
      // console.log(overlap);
      if (overlap > 0)     
      {
        let range1 = daysInMonth(curr_month, curr_year); 
        let range2 = daysInMonth(next_month, next_year);

        console.log(range1, range2);
        // for (let j = 0; j < range; j++)
        // {
        //   free_days++;
        // }
        // console.log("free days: ", free_days);
        
      }
    }
    i++;
  }
}

freeRicky(dates)
// function getDateRangesWithNoOverlap(dates) {
//   const tempArray = [...dates];
//   let next = true;

//   for (let index = 0; index < tempArray.length; index++) {
//     const hasNextRange = tempArray[index + 1] !== undefined;
//     const thisRange = tempArray[index];
//     const nextRange = tempArray[index + 1];

//     if (hasNextRange) {
//       const initialRange = { start: thisRange.start, end: thisRange.end };
//       const toRange = { start: nextRange.start, end: nextRange.end };
//       const isOverlaping = areIntervalsOverlapping(initialRange, toRange);

//       if (isOverlaping) {
//         const newRange = {
//           id: thisRange.id,
//           start: thisRange.start,
//           end: nextRange.end,
//         };

//         tempArray.splice([index + 1], 1);
//         tempArray.splice([index], 1, newRange);
//         break;
//       } 
//     } else {
//       next = false;
//     }
//   }

//   if (next) {
//     return getDateRangesWithNoOverlap(tempArray);
//   } else {
//     return tempArray;
//   }
// }


// const result = getDateRangesWithNoOverlap(dates);

// function calculateTotalDaysInRange(dates) {
//   return dates.map((dateRange) => {
//     const totalDays = differenceInDays(dateRange.end, dateRange.start);
//     return {
//       ...dateRange,
//       totalDays,
//     };
//   });
// }

// const totalDays = calculateTotalDaysInRange(result)
// console.log(totalDays);

// const sumOfAllDays = totalDays.reduce((acc, item) => { return item.totalDays + acc},0)
// console.log(sumOfAllDays);
