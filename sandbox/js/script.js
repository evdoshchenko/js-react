"use strict";

// rest operator
const log = function(a, b, ...rest) {   // ...anyname
    console.log(a, b, rest);
}
log('1', '2', '3', '4');   // 1 2 [ '3', '4' ]

function calcOrDouble(number, basis = 2) {
    // basis = basis || 2; // return default 2, first true if not value
    console.log(number * basis);
}
calcOrDouble(3);