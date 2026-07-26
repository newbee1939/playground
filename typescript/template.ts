import * as fs from 'fs';

function main() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  // 要素の数
  const n = parseInt(input[0]);
  // 1列目の要素
  const p = input[1];
  console.log(p);
  // 2列目の要素
  const q = input[2];
  console.log(q);
}

main();
