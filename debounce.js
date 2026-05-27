function debounce (fn, delay) {
  let timer;
  return function debounced (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const result = fn.apply(this, args);
      console.log(result);
    }, delay)
  }
}

const sum = (a = 2, b =4) => {
  return a + b
}

const debouncedSum = debounce(sum, 1000);
debouncedSum(2, 4)



/// without this

function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

const search = (query) => {
  console.log(`Searching for`, query);
}

const debouncedSearch = debounce(search, 1000)