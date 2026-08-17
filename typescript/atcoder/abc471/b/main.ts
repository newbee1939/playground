import * as fs from 'fs';

function main() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  const n = Number(input[0]);

  const charMap = new Map();

  for (let i = 1; i <= n; i++) {
    // 小文字に統一する
    const char = input[i].toLowerCase();

    if (charMap.has(char)) {
      // すでに同じ値を持っている場合
      charMap.set(char, charMap.get(char) + 1);
    } else {
      // まだ値を持っていない場合
      charMap.set(char, 1);
    }
  }

  const values = Array.from(charMap.values()).sort((a, b) => b - a);

  console.log(values[0]);
}

main();
