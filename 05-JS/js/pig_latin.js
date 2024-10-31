/*
Pig Latin
*/

function igpayAtinlay(str) {
  var wordArray = str.split(" ");
  var returnArray = [];
    wordArray = [];
  // TODO: make sure that the output is being properly built to produce the desired result.
  for (var i = 0; i < wordArray.length; i++) {
    var word = wordArray[i];
    var beginning = word.charAt(0);

    wordArray.forEach(word => {
      if (/^[aeiou]/i.test(word)) {
        returnArray.push(word + "way");
      } else {
        let match = word.match(/^[^aeiou]+/i);
        let consonants = match ? match[0] : '';
        returnArray.push(word.slice(consonants.length) + consonants + "ay");
      }
    });

    if (/[aeiouAEIOU]/.test(beginning)) {
      returnArray.push(word);
      continue;
    }

    for (var ii = 1; ii < word.length; ii++) {
      if (/[aeiouAEIOU]/.test(word.charAt(ii))) {
        break;
      } else {
        beginning += word.charAt(ii);
      }
    }
  }
  return returnArray.join(" ");
}

// Some examples of expected outputs
console.log(igpayAtinlay("pizza")); // "izzapay"
console.log(igpayAtinlay("apple")); // "appleway"
console.log(igpayAtinlay("happy meal")); // "appyhay ealmay"
