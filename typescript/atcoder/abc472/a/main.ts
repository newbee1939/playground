import * as fs from 'fs';

function main() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  const s = input[0];

  let answer = "";

  for (const char of s) {
    if (char !== "A") {
      answer += ".";
    } else {
      answer += "A";
    }
  }

  console.log(answer);
}

main();
