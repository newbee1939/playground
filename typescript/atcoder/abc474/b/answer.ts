import * as fs from 'fs';

// B - Exit Order
// https://atcoder.jp/contests/abc474/tasks/abc474_b
//
// 退場は「座席 1..10 の 10 人 → 11..20 の 10 人 → ...」の順にグループ単位で進む。
// グループ内の順番は自由だが、グループをまたぐ追い越しは起きない。
//   - 座席 p の客が実際に属するグループ = floor((p - 1) / 10)   （0-indexed の座席番号を 10 で割る）
//   - i 番目（0-indexed）に退場する客が属するべきグループ = floor(i / 10)
// よって全 i でこの 2 つが一致するかを見れば足りる。並べ替えもシミュレーションも要らない。
// 計算量 O(N) / 追加メモリ O(1)。

const GROUP_SIZE = 10;
// これがポイント
const groupOf = (index: number) => Math.floor(index / GROUP_SIZE);

function main() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  const n = Number(input[0]);

  let ok = true;
  for (let i = 0; i < n; i++) {
    const p = Number(input[i + 1]); // 1-indexed の座席番号
    if (groupOf(p - 1) !== groupOf(i)) {
      ok = false;
      break;
    }
  }

  console.log(ok ? 'Yes' : 'No');
}

main();
