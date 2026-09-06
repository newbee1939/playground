import * as fs from 'fs';

// C - Remove and Append
// https://atcoder.jp/contests/abc474/tasks/abc474_c
//
// ⭐️操作は再現しなくていい。同じ値を何度末尾へ動かしても効くのは「最後の 1 回」だけなので、
// 最終的な P は次の 2 ブロックに分かれる。計算量 O(N + Q)、メモリ O(N)。
//   head … 一度も操作されなかった値。元の並び順のまま先頭
//   tail … 一度でも操作された値。「最後に操作された順」でそのうしろ
//
// 例: N=4, P=(2,4,3,1), a=(3,2)
//   lastOp（添字＝値 v、中身＝v が最後に触られた操作番号）は [_, 0, 2, 1, 0]
//   head = (4, 1)  中身が 0 ＝ 未操作の値を、P の順に拾う
//   tail = (3, 2)  中身の小さい順 ＝ 末尾に追加された順
//   答え 4 1 3 2

function main() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  const n = Number(input[0]);
  const q = Number(input[1]);
  const pStart = 2; // P の先頭が入力トークンの何番目か
  const aStart = 2 + n; // a の先頭

  // Int32Array は 32 ビット整数専用の固定長配列。1 要素 4 バイトの連続メモリで、
  // 確保した時点で 0 埋めされる（`.fill(0)` 不要）。この 0 を「未操作」の印にそのまま使う。
  // 添字に値 v をそのまま使うので、長さは v = n まで入る n + 1。
  const lastOp = new Int32Array(n + 1);
  for (let i = 0; i < q; i++) {
    // +1 して 1 始まりの操作番号にする（i のままだと 1 回目が 0 になり、未操作と区別できない）
    lastOp[Number(input[aStart + i])] = i + 1;
  }

  // 中身が 0 のまま ＝ 一度も操作されなかった値を、P の順に
  const head: number[] = [];
  for (let i = 0; i < n; i++) {
    const p = Number(input[pStart + i]);
    if (lastOp[p] === 0) head.push(p);
  }

  // 「この操作が a にとって最後」の位置でだけ拾う ＝ 末尾に追加された順に並ぶ
  const tail: number[] = [];
  for (let i = 0; i < q; i++) {
    const a = Number(input[aStart + i]);
    if (lastOp[a] === i + 1) tail.push(a);
  }

  // concat は 2 つをつないだ新しい配列を返す（head も tail も変わらない）。
  // head.push(...tail) は tail を全部引数として積むので、10 万件規模で RangeError になる。
  console.log(head.concat(tail).join(' '));
}

main();
