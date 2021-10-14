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
];

const stack = createStack();

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
    _items.pop()
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
    isEmpty,
    clear,
    indexTop,
  });
}



