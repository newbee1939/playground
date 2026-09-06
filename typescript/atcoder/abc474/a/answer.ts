import * as fs from 'fs';

function main() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  console.log(input[0]);

  // X=1 なら 2 を、X=1 なら 1 を出力するだけでも良さそう
}

main();
