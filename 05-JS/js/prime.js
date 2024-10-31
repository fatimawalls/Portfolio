/*
    Prime Factorization - Have the user enter a number and find
    all Prime Factors (if there are any) and display them.
*/

var getPrimeFactors = function (n) {
  var sequence = [];
  var factor = 2;

  while (n % factor === 0) {
    sequence.push(factor);
    n /= factor;
  }

  for (factor = 3; factor <= Math.sqrt(n); factor += 2) {
    while (n % factor === 0) {
      sequence.push(factor);
      n /= factor;
    }
  }

  if (n > 2) {
    sequence.push(n);
  }

  return sequence;
};


console.log(getPrimeFactors(30030));
