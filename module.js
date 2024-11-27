console.log("hello server");
console.log(global);


const {add, substract, multiply, divide} = require('./math')

console.log(add(2,3))
console.log(substract(2,3))
console.log(multiply(2,3))
console.log(divide(2,3))



const os = require ('os');
const path = require('path')
console.log(os.type());
console.log(os.version());
console.log(os.homedir());
console.log(__filename);

// console.log(path.dirname(__filename));
// console.log(path.__dirname);
// console.log(path.dirname(__dirname));