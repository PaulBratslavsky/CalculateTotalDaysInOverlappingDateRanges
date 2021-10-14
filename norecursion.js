const differenceInDays = require('date-fns/differenceInDays');

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

function createStack() {
  let _items = [];
  let _indexTop = -1;

  function push(item) {
    _items.push(item);
    _indexTop++;
  }

  function pop() {
    if (_items.length === 0) return null;
    const poppedItem = _items[_indexTop];
    _items.pop();
    _indexTop--;
    return poppedItem;
  }

  function size() {
    return _items.length;
  }

  function peek() {
    if (_items.length === 0) return null;
    return _items[_indexTop];
  }

  function show() {
    console.log(_items);
  }

  function content() {
    return _items;
  }

  function isEmpty() {
    return _items.length === 0;
  }

  function clear() {
    _items = [];
    _indexTop = -1;
  }

  function indexTop() {
    return _indexTop;
  }

  return Object.freeze({
    push,
    pop,
    size,
    peek,
    show,
    content,
    isEmpty,
    clear,
    indexTop,
  });
}

const stack = createStack();

function checkIfDateAreOverlapping(date1, date2) {
  return (isOverlapping = date2.getTime() - date1.getTime() < 0 ? true : false);
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

function getDateRangesWithNoOverlap(ranges) {
  let newRange = [];
  ranges.forEach((range, index) => {
    const nextDate = ranges[index + 1];
    const prevDate = ranges[index - 1];
    const currentDate = range;

    prevDayOverlap = prevDate
      ? checkIfDateAreOverlapping(prevDate.end, currentDate.start)
      : false;

    const isOverlapping = nextDate
      ? checkIfDateAreOverlapping(currentDate.end, nextDate.start)
      : false;

    if (isOverlapping || prevDayOverlap) {
      if (isOverlapping) {
        stack.push(range);
      }
      if (prevDayOverlap && isOverlapping === false) {
        stack.push(range);
        const id = stack.content()[0].id;
        const start = stack.content()[0].start;
        const end = stack.content()[stack.content().length - 1].end;

        const updateRange = {
          id,
          start,
          end,
        };

        newRange.push(updateRange);
        stack.clear();
      }
    } else {
      newRange.push(range);
    }
  });

  return newRange;
}

const result = getDateRangesWithNoOverlap(dates2);
console.log(result, 'result');

const totalDays = calculateTotalDaysInRange(result);
console.log(totalDays);

const sumOfAllDays = totalDays.reduce((acc, item) => {
  return item.totalDays + acc;
}, 0);
console.log(sumOfAllDays);
