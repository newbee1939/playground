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

  // このループが Q 回。中に O(N) が 2 つあるので全体で O(N*Q) = 2.5*10^11
  for (let i = 1; i <= q; i++) {
    // 1 文字ずつバラすので line[1] は「2 文字目」。"1 12" が x=1 になるバグ
    const line = input[i].split("").filter((a) => a !== " ");
    const first = line[0];
    const second = Number(line[1]);

    if (first === "1") {
      cur[second - 1] += 1;
    } else {
      // ここが O(N)。0 の要素も含めて毎回 N 個ぜんぶ見ている
      for (let j = 0; j < cur.length; j++) {
        if (cur[j] >= 1) {
          cur[j] -= 1;
        }
      }
    }

    const initialValue = 0;
    // ここも O(N)。1 個しか変わっていないのに毎回 N 個を集計し直している
    const result = cur.reduce(
      (accumulator, currentValue) => accumulator ^ currentValue,
      initialValue,
    );

    // 出力ごとにシステムコールが 1 回。Q = 5×10^5 回で数百 ms
    console.log(result);
  }
}

main();
