// ABC468 B - Corridor Watch
// https://atcoder.jp/contests/abc468/tasks/abc468_b
//
// 長さ M のマス目のうち、G（ガードマン）から距離 D 以下のマスが「監視されている」。
// 監視されていないマスの個数を答える。
//
// 考え方:
//   「監視されているマス」を boolean の配列で持ち、G を見つけるたびに
//   その周り [i - D, i + D] を true で塗りつぶす。最後に false の個数を数える。
//   マスが重なって二重に塗られても true を上書きするだけなので、重複を気にしなくてよい。
//   ここが「配列に push して数える」やり方との決定的な違い。
//
// 計算量: O(M * D)。制約は M <= 100 なので余裕で間に合う。

import * as fs from 'fs';

function main() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);

  const m = Number(input[0]);
  const d = Number(input[1]);
  const s = input[2];

  // ⭐️watched[i] = マス i（0-indexed）が監視されているか。最初は全部 false。
  const watched: boolean[] = new Array(m).fill(false);

  for (let i = 0; i < m; i++) {
    if (s[i] !== 'G') continue;

    // マス i にガードマンがいる → [i - d, i + d] を監視済みにする。
    // ⭐️Math.max / Math.min で 0 と m-1 に丸めることで、配列の範囲外を触らずに済む。
    const from = Math.max(0, i - d);
    const to = Math.min(m - 1, i + d);
    for (let j = from; j <= to; j++) {
      // 監視されているますをtrueにする
      watched[j] = true;
    }
  }

  // false（= 監視されていない）の個数を数える。
  const answer = watched.filter((w) => !w).length;

  console.log(answer);
}

main();

// Bonus（1 <= D <= N <= 5*10^5 のとき）:
//   上の O(M * D) だと 5*10^5 * 5*10^5 で間に合わない。
//   「左から見て直近の G までの距離」と「右から見て直近の G までの距離」を
//   それぞれ 1 回の走査で求め、min がその2つとも D より大きいマスを数えれば O(N)。
//   （いもす法で +1 / -1 を置いて累積和を取る方法でも O(N) で解ける）
