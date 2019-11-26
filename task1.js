process.stdin.setEncoding('utf8');

// process.stdin.on('readable', () => {
//   let input = process.stdin.read().trim();
//   process.stdout.write(`${input.split('').reverse().join('')} \n\n`);
// });

process.stdin.on('data', (chunk) => {
  process.stdout.write(`${chunk.trim().split('').reverse().join('')} \n\n`);
});