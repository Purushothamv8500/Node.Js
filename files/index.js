const fs = require('fs');
const path = require('path');

// Reading a file
fs.readFile(path.join(__dirname, 'starter.txt'), 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
});

// Writing to a file
fs.writeFile(path.join(__dirname, 'reply.txt'), 'nice to meet you', (err) => {
    if (err) throw err;
    console.log('write completed');
});

fs.appendFile(path.join(__dirname, 'test.txt'), 'nice to meet you', (err) => {
    if (err) throw err;
    console.log('test completed');
});
