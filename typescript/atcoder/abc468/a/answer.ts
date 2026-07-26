// ABC468 A - Maximal Value
// https://atcoder.jp/contests/abc468/tasks/abc468_a
//
// 長さ N の数列 A について、A[i] < A[i+1] > A[i+2] を満たす i（1 <= i <= N-2）の個数を数える。
// いわゆる「山（極大値）」がいくつあるかを数える問題。制約は N <= 100 なので、
// 素直に全部の i を試す O(N) のループで間に合う。

import * as fs from 'fs';

function main() {
  // 標準入力を丸ごと読み、空白（スペース・改行）で分割する。
  // ここで得られるのは string[] であって number[] ではない、という点が今回の肝。
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);

  const n = Number(input[0]);

  // 【重要】必ず数値に変換してから比較する。
  // input.slice(1) で N の次以降（= A_1 .. A_N）を取り出し、Number で数値化する。
  // Number は map のコールバックとしてそのまま渡せる（引数を 1 つしか取らないため）。
  // parseInt を渡すと第 2 引数に index が radix として渡ってしまうので注意
  // → ['1','2','3'].map(parseInt) は [1, NaN, NaN] になる。
  const a = input.slice(1).map(Number);

  let counter = 0;

  // a は 0-indexed なので、問題文の A_1 は a[0]。
  // 問題文の i = 1 .. N-2 は、そのまま 0-indexed の i = 0 .. N-3 に対応する。
  // ループ条件を i < n - 2 にすると、最大の i は n - 3 で、
  // 参照する一番大きい添字は (n - 3) + 2 = n - 1 になり、配列の範囲に収まる。
  for (let i = 0; i < n - 2; i++) {
    if (a[i] < a[i + 1] && a[i + 1] > a[i + 2]) {
      counter++;
    }
  }

  console.log(counter);
}

main();
