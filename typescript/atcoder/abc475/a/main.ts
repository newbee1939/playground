import * as fs from 'fs';

function main() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  const s = input[0].split('');
  const tmp = s.map((char: string) => {
    return char += 'o';
  }).join('');
  const answer = tmp.slice(0, tmp.length - 1);
  console.log(answer);
}

main();
