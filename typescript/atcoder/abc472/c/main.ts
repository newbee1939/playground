// NOTE: このコードは AtCoder で TLE。出力は正しい（サンプル 3 件とも AC）が、間に合わない。
//   毎日 slice + reduce で最大 M 要素をなめ直しているので計算量は O(NM)。
//   N = M = 2×10^5 なら 4×10^10 回で、2 秒（目安 10^8〜10^9 回）を 2 桁オーバーする。
//   直近 M 日の合計は「窓から出た日を引き、入った日を足す」差分更新にすれば O(1) で保てる。
//   正しい実装は answer.ts を参照。
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
    // slice は毎回 O(窓幅) の新しい配列を作り、reduce がそれをもう一度なめる
    const slicedCalories = calories.slice(baseIndex, i);

    // ここでループが回ってしまっている...（無くしたい）
    // → ここが TLE の原因。1 日あたり最大 M 回 × N 日 = O(NM)。
    //   合計を変数で持ち回れば、1 日あたり「引く 1 回・足す 1 回」の O(1) で済む。
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
