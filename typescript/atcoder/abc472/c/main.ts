import * as fs from 'fs';

function main() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\n+/);
  const nmk = input[0].split(' ').map(Number);
  const n = nmk[0];
  const m = nmk[1];
  const k = nmk[2];
  const calories = input[1].split(' ').map(Number);

  for (let i = 1; i <= n; i++) {
    // i日目の判定を実施する

    // index番号なので -1 する
    const baseIndex = Math.max(i - m + 1, 1) - 1;
    const slicedCalories = calories.slice(baseIndex, i);

    // ここでループが回ってしまっている...（無くしたい）
    const sum = slicedCalories.reduce((acc, value) => acc + value, 0);

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
