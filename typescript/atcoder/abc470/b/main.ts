import * as fs from 'fs';

function main() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  const n = Number(input[0]);
  const numbers = input.slice(1).map(Number);
  const counter = new Map();
  for (const num of numbers) {
    if (counter.has(num)) {
      const cur = counter.get(num);
      counter.set(num, cur + 1);
    } else {
      counter.set(num, 1);
    }
  }

  const max = [...counter.values()].sort((a, b) => b - a)[0];
  console.log(n - max);
}

main();
