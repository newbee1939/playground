// ABC470 C - Inc, Dec, Xor
// https://atcoder.jp/contests/abc470/tasks/abc470_c

import * as fs from 'fs';

function main() {
  // 空白・改行で区切る。サンプル 1 なら ["2","5","1","2","1","2","1","1","2","2"]
  const numbers = fs.readFileSync(0, 'utf-8').trim().split(/\s+/); // 0 は標準入力
  let cursor = 0;
  const readNextNumber = (): number => Number(numbers[cursor++]); // 呼ぶたび次の数字

  const n = readNextNumber(); // 数列の長さ
  const q = readNextNumber(); // クエリの個数

  const values = new Int32Array(n); // 数列 A 本体。初期値は全部 0
  let nonZeroIndexes: number[] = []; // 1 以上の要素が「何番地にあるか」。値ではなく添字
  let totalXor = 0; // A 全体の XOR。毎回作り直さず差分で直す
  const answers: string[] = []; // 答えを貯める箱。最後に 1 回だけ出力

  // 以下のコメントは、サンプル 1 の 3 個目「1 1」と 4 個目「2」を実行中として読む。
  // どちらも直前は values = [0, 2]  nonZeroIndexes = [1]  totalXor = 2

  for (let i = 0; i < q; i++) {
    if (readNextNumber() === 1) {
      // ---- クエリ 1: A_x に +1 ----
      // 続きの「1」を読み、0 始まりに直す。targetIndex は値ではなく添字
      const targetIndex = readNextNumber() - 1; // → 0

      // 0 → 1 になる瞬間だけメモに追加（1 以上なら登録済み）。[1] → [1, 0]
      if (values[targetIndex] === 0) nonZeroIndexes.push(targetIndex);

      // 古い値を打ち消して新しい値を入れる。2 ^ 0 ^ 1 = 3
      //   0 と 1 は values[0]/values[1] ではなく、同じ番地の 変更前/変更後
      //   検算: 変更後の values = [1, 2] を素直に計算しても 1^2 = 3
      totalXor ^= values[targetIndex] ^ (values[targetIndex] + 1);

      // 答えはもう確定済み。実体をあとから追いつかせる。[0,2] → [1,2]
      // 先に ++ すると古い値が消えて打ち消せなくなるので、順番は変えられない
      values[targetIndex]++;
    } else {
      // ---- クエリ 2: 1 以上を全部 -1 ----
      // 直前は values = [1, 2]  nonZeroIndexes = [1, 0]  totalXor = 3
      // N が 50 万でも、見るのはメモにある 2 箇所だけ

      const stillNonZero: number[] = []; // 残るものだけ移す。要らないものは消える

      for (const index of nonZeroIndexes) {
        // index=1: 2 → 1 なので 3 ^ 2 ^ 1 = 0 /  index=0: 1 → 0 なので 0 ^ 1 ^ 0 = 1
        totalXor ^= values[index] ^ (values[index] - 1);
        values[index]--; // [1,2] → [1,1] → [0,1]
        if (values[index] >= 1) stillNonZero.push(index); // 0 になった番地は捨てる
      }

      nonZeroIndexes = stillNonZero; // [1, 0] → [1]
    }

    answers.push(String(totalXor)); // ["1","2"] → ["1","2","3"] → …
  }

  // 改行でつないで一気に出す（毎回 console.log すると 50 万回の書き込みになる）
  process.stdout.write(answers.join('\n') + '\n');
}

main();
