// NOTE: このコードは全サンプル WA（出力が全部 No になる）。原因は下の sum の行。
//   i=1 のとき baseIndex は 0 なので calories[baseIndex - 1] は calories[-1] = undefined。
//   undefined を算術に混ぜた時点で sum は NaN になり、以後どんな値を足し引きしても NaN のまま。
//   NaN は「<=」も「>」も常に false を返すので、if (sum <= k) が一度も成立せず全日 No になる。
//   差分更新で引くべきは「窓からこぼれる日」= 添字 i - m で、i >= m のときだけ引く。
//   正しい実装は answer.ts を参照。
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
    // → 必要。baseIndex が 0 だと calories[-1] が undefined になり、sum が NaN に落ちて戻らない。
    //   さらに i 日目（1-indexed）の値は calories[i] ではなく calories[i - 1] で、添字も 1 つずれている。
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
