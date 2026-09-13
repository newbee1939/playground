import * as fs from 'fs';

// ABC475 C - Walk the Line  https://atcoder.jp/contests/abc475/tasks/abc475_c
//
// サンプル 1（N=6, S=3, L=10, A = 5 2 4 1 6）
//
//   街   1 ----5---- 2 --2-- 3 ----4---- 4 -1- 5 ------6------ 6
//                            S から歩いて、合計 10 以内で訪れる街を最大化
//
// 1. 訪れる街は S を含む連続区間 [l, r] になる
//    隣にしか動けない = 飛び越せないので「街 1 を訪れたのに街 2 は未訪問」が起きない。
//    -> 歩く順番ではなく両端 l, r を決める問題。組み合わせは N^2 通りなので全部試せる。
//
// 2. 区間 [l, r] を訪れる最短距離 = min(2X + Y, X + 2Y)
//    X = S から左端まで、Y = S から右端までの距離。両端に触るには片方は往復、
//    最後に行く方だけ片道。近い側を往復して遠い側を片道に回すのが得。
//      [2, 5] は X=2, Y=5 -> 左が先: 3→2→3→4→5 = 9 ✅ / 右が先: 12 ❌  -> 4 街（答え）
//
// 3. 距離は累積和（＝道路のキロポスト）で引き算 1 回
//    A は「道」の長さなので、街の位置に直して持つ。街 1 を 0km 地点として p = [0,5,7,11,12,18]。
//    街 2 と街 5 の距離 = p[4] - p[1] = 7（起点からの共通部分が打ち消える）。
//    毎回 A を足し直すと二重ループの中で O(N^3) になり間に合わない。
//
// 計算量 O(N^2)（最悪 1.6*10^7 回、手元 0.07 秒）。r を伸ばすとコストは増える一方なので break 可。
//   この単調性を両側に使えば尺取り法で O(N) にもできるが、この制約では不要。
// 型: L <= 10^18 は Number の安全整数 2^53 を超えるが、距離は最大 8*10^12 までしかないので、
//   L が巨大なら誤差に関係なく「L 以下」と判定される -> Number で安全（同じ桁で競うなら BigInt）。
//
// ⭐️次に効くサイン:
//   一直線 + 隣にしか動けない + 個数の最大化 -> 訪れる集合は区間。両端を決め打つ
//   出発点から両端に触る最短                 -> min(2X + Y, X + 2Y)
//   同じ区間の合計を何度も聞かれる           -> 先に累積和
function main() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/).map(Number);
  const n = input[0];
  const start = input[1] - 1; // 0-indexed（街 3 -> 添字 2）
  const limit = input[2];
  const roads = input.slice(3, 3 + (n - 1)); // roads[i] = 街 i と街 i+1 の間の道

  // 3. 街 0 を 0km としたキロポスト -> [0, 5, 7, 11, 12, 18]
  const milestone = new Array<number>(n).fill(0);
  for (let i = 0; i + 1 < n; i++) milestone[i + 1] = milestone[i] + roads[i];
  const distance = (from: number, to: number) => milestone[to] - milestone[from];

  let ans = 1; // 出発点の街は必ず訪れている
  for (let l = 0; l <= start; l++) {
    const x = distance(l, start);
    for (let r = start; r < n; r++) {
      const y = distance(start, r);
      const cost = Math.min(2 * x + y, x + 2 * y); // 2. 近い側を往復、遠い側を片道
      if (cost > limit) break; // r を伸ばすほど増えるので以降は無駄
      ans = Math.max(ans, r - l + 1); // 訪れた街の数 = 区間の長さ
    }
  }

  console.log(ans);
}

main();
