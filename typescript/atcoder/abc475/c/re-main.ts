import * as fs from 'fs';

function main() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  console.log(input[0]);

    // TODO: 何も見ずに解き直（何回かやる）
}

main();
