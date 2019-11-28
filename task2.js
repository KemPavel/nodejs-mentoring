const fs = require('fs');
const csv = require('csvtojson');
const file = './data/cvs_input.csv';

const errorHandler = (err) => {
  console.log(err);
};

const writeLine = (data) => {
  const formattedString = `${JSON.stringify(data)}\n`;
  fs.appendFile('./data/task2_output.txt', formattedString, 'utf8', (err) => {
    if (err) errorHandler(err);
  });
};

csv()
  .fromFile(file)
  .subscribe((json) => {
    return new Promise((resolve) => {
      resolve(json);
    }).then((result) => writeLine(result));
  }, errorHandler);