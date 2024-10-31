
var memo = {};
function fibonacci() {
  "use strict";
  var n = document.getElementById("num").value;
  var val = f(n);
  return val;
}

function f(n) {
  var value;
  function f(n) {
    if (n <= 1) return n;
    if (memo.hasOwnProperty(n)) {
      return memo[n];
    } else {
      // Recursive Fibonacci with memoization
      value = f(n - 1) + f(n - 2);
      memo[n] = value;
      return value;
    }
  }
console.log(fibonacci(15));
}
