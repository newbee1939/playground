import * as fs from 'fs';

function main() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  const x = input[0];

  if (x === "1") {
    console.log(2);
  } else if (x === "2") {
    console.log(3);
  } else {
    console.log(1);
  }
}

main();
