import * as fs from 'fs';

function main() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  const n = Number(input[0]);
  const numbers = input.slice(1).map(Number);
  const counter = new Map<number, number>(); // 型を付ける（get が number|undefined になる）
  for (const num of numbers) {
    // has/get/elseを1行で書ける
    counter.set(num, (counter.get(num) ?? 0) + 1);
  }

  // Math.maxで最大値を抽出できる
  const max = Math.max(...counter.values());
  console.log(n - max);
}

main();
