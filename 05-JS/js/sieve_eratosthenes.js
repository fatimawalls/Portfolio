/*
    Sieve of Eratosthenes - The sieve of Eratosthenes is one of the most efficient ways
    to find all of the smaller primes (below 10 million or so).
*/

// TODO: Adjust this script so it can work with the sieve.html file.

function sieve(n) {
  var array = new Array(n + 1).fill(true);
  var primes = [];
    i,
    j;

    array[0] = array[1] = false;
    for (let i = 2; i <= n; i++) {
      if (array[i]) {
        primes.push(i);
        for (let j = i * 2; j <= n; j += i) {
          array[j] = false;
        }
      }
    }
    return primes;
  };

console.log(sieve(1000000));
