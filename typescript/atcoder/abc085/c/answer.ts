import * as fs from 'fs';

// 10000 円札 a 枚・5000 円札 b 枚・1000 円札 c 枚で「N 枚・Y 円」になる組を 1 つ返す。
// a と b を決めれば c = N - a - b と自動的に決まるので、二重ループ O(N^2) で足りる。
function solve(n: number, y: number): [number, number, number] {
  for (let a = 0; a <= n; a++) {
    for (let b = 0; a + b <= n; b++) {
      const c = n - a - b;
      if (10000 * a + 5000 * b + 1000 * c === y) return [a, b, c];
    }
  }
  return [-1, -1, -1];
}

function main() {
  const [n, y] = fs.readFileSync(0, 'utf-8').trim().split(/\s+/).map(Number);
  console.log(solve(n, y).join(' '));
}

main();
