import * as fs from 'fs';

function main() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  const a = Number(input[0]);
  const b = Number(input[1]);

  const curResult = new Set();
  curResult.add(a + b);
  curResult.add(a - b);
  curResult.add(a * b);
  curResult.add(a / b);

  console.log(curResult.has(9) ? "Nine" : "Nein");
}

main();
