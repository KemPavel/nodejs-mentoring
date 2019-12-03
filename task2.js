import {appendFile} from 'fs';
import {promisify} from 'util';
import csv from 'csvtojson';

const file = './data/cvs_input.csv';

const append = promisify(appendFile);
const errorHandler = (err) => {
  console.log(err);
};

const writeLine = (data) => {
  const formattedString = `${JSON.stringify(data)}\n`;
  append('./data/task2_output.txt', formattedString)
    .catch(errorHandler)
};

csv()
  .fromFile(file)
  .subscribe((json) => {
    return new Promise((resolve) => {
      resolve(json);
    }).then((result) => writeLine(result));
  }, errorHandler);