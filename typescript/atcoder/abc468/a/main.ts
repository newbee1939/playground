import * as fs from 'fs';

function main() {
  const input = fs.readFileSync('/dev/stdin', 'utf-8').trim().split(/\s+/);
  const n = parseInt(input[0]);
  let counter = 0;

  for (let i = 1; i < n - 1; i++) {
    if (input[i] < input[i + 1] && input[i + 1] > input[i + 2]) {
      counter++;
    }
  }

  console.log(counter);
}

main();
