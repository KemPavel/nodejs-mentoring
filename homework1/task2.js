import { createReadStream, createWriteStream } from 'fs';
import csv from 'csvtojson';

const inputPath = './data/cvs_input.csv';
const outputPath = './data/task2_output.txt';

const readStream = createReadStream(inputPath);
const writeStream = createWriteStream(outputPath);

readStream
  .pipe(csv())
  .pipe(writeStream)
  .on('error', console.log);

