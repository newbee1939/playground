import * as fs from 'fs';

// 2 5
// 1 2 => (0, 1)
// 1 2 => (0, 2)
// 1 1 => (1, 2)
// 2 => (0, 1)になる
// 2 => (0, 0)になる
// の場合、N=2, Q=5なので、初期値は(0, 0)になる
// 5個クエリが与えられるので、それぞれXORした値を順に出力する


function main() {
  // 行ごとに分割する
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\n+/);
  const first = input[0].split(/\s+/);
  const n = Number(first[0]);
  const q = Number(first[1]);

  // 初期値
  // 0を詰め込む
  let cur = new Array(n).fill(0);

  for (let i = 1; i <= q; i++) {
    // 最大2つの配列
    const line = input[i].split("").filter((a) => a !== " ");
    const first = line[0];
    const second = Number(line[1]);

    if (first === "1") {
      cur[second - 1] += 1;
    } else {
      for (let j = 0; j < cur.length; j++) {
        if (cur[j] >= 1) {
          cur[j] -= 1;
        }
      }
    }

    const initialValue = 0;
    const result = cur.reduce(
      (accumulator, currentValue) => accumulator ^ currentValue,
      initialValue,
    );

    console.log(result);
  }
}

main();
