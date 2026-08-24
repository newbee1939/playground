import * as fs from 'fs';

function main() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\n+/);
  const nmk = input[0].split(' ');
  const n = Number(nmk[0]);
  const m = Number(nmk[1]);
  const k = Number(nmk[2]);

  const calories = input[1].split(' ').map(Number);

  // 初期値
  let sum = calories[0];

  // ここでループを回すのは仕方ないか...
  for (let i = 1; i <= n; i++) {
    // i日目の判定を実施する

    // index番号なので -1 する
    const baseIndex = Math.max(i - m + 1, 1) - 1;

    // baseIndexの一つ前のindexの値を引き、現在のiの値を足す
    // baseIndexが0の場合の考慮が必要？
    sum = sum - calories[baseIndex - 1] + calories[i];

    if (sum <= k) {
      console.log("Yes");
    } else {
      // この日は食べなかったのでカロリーは0で上書き
      calories[i - 1] = 0;
      console.log("No");
    }
  }
}

main();
