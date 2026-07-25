import * as fs from 'fs';

function main() {
  const input = fs.readFileSync('/dev/stdin', 'utf-8').trim().split(/\s+/);
  const height = parseInt(input[0]) / 100;
  const weight = parseInt(input[1]);

  const bmi = weight / height / height;

  if (bmi >= 25) {
    console.log("Yes");
  } else {
    console.log("No");
  }
}

main();
