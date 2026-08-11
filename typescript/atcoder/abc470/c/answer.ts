// ABC470 C - Inc, Dec, Xor
// https://atcoder.jp/contests/abc470/tasks/abc470_c

import * as fs from 'fs';

function main() {
  // 入力全体を空白・改行で区切って 1 つの配列にする。
  // サンプル 1 なら ["2","5","1","2","1","2","1","1","2","2"]
  const numbers = fs.readFileSync(0, 'utf-8').trim().split(/\s+/); // 0 は標準入力

  // 読んだ位置を覚えておき、呼ぶたびに次の数字を返す。前にしか進まない
  let cursor = 0;
  const readNextNumber = (): number => Number(numbers[cursor++]);

  const n = readNextNumber(); // 数列の長さ
  const q = readNextNumber(); // クエリの個数

  // ---- 準備（→ の後ろはサンプル 1 での初期値）----

  // 数列 A 本体。整数専用の配列で初期値は全部 0 → [0, 0]
  const values = new Int32Array(n);

  // 1 以上の要素が「何番地にあるか」のメモ。中身は値ではなく添字 → []
  let nonZeroIndexes: number[] = [];

  // A 全体の XOR の現在値。毎回作り直さず、差分で直していく → 0
  let totalXor = 0;

  // 各クエリの答えを貯める箱。最後に 1 回だけまとめて出力する → []
  const answers: string[] = [];

  // 以下、各行の上のコメントはサンプル 1 の「3 個目のクエリ 1 1」と
  // 「4 個目のクエリ 2」を実行しているつもりで読むこと。
  // どちらもその直前の状態は
  //   values = [0, 2]   nonZeroIndexes = [1]   totalXor = 2

  for (let i = 0; i < q; i++) {
    // 行の先頭の数字を読む。3 個目「1 1」なら 1、4 個目「2」なら 2
    if (readNextNumber() === 1) {
      // ================= クエリ 1: A_x に +1 =================

      // 続きの「1」を読んで 1 を引く → targetIndex = 0
      //   readNextNumber() の返り値 1 … 入力に書いてある番号（問題文の A_1）
      //   targetIndex          = 0 … 配列の添字。1 引くのは配列が 0 始まりだから
      //   values[targetIndex]  = 0 … そこに入っている値
      const targetIndex = readNextNumber() - 1;

      // 今 values[0] は 0。「0 番地に中身ができる」のでメモに 0 を足す
      //   nonZeroIndexes = [1] → [1, 0]
      // すでに 1 以上ならメモ済みなので何もしない（同じ番地を二重登録しないため）
      if (values[targetIndex] === 0) nonZeroIndexes.push(targetIndex);

      // values[0] は 0 から 1 になる。この 1 行は下の 2 行をまとめたもの:
      //   totalXor ^= values[targetIndex];        古い値 0 を取り消す
      //   totalXor ^= values[targetIndex] + 1;    新しい値 1 を入れる
      // → totalXor = 2 ^ 0 ^ 1 = 3
      //   検算: 変更後の values = [1, 2] を素直に計算すると 1^2 = 3。一致
      //
      // 注意: ここに出てくる 0 と 1 は values[0] と values[1] ではなく、
      // どちらも「targetIndex 番地の 変更前 / 変更後」の値。
      // 触っていない番地の分は totalXor に入ったままなので、いじる必要がない。
      totalXor ^= values[targetIndex] ^ (values[targetIndex] + 1);

      // この時点で totalXor はもう「+1 したあとの配列」の XOR になっている。
      // 一方 values はまだ古いままなので、ここで実体を追いつかせる
      //   values = [0, 2] → [1, 2]
      // 上の計算より後にやるのは、古い値がないと差分を打ち消せないから
      values[targetIndex]++;
    } else {
      // ========= クエリ 2: 1 以上のものを全部 -1 =========
      // 直前の状態は values = [1, 2]  nonZeroIndexes = [1, 0]  totalXor = 3
      // N が 50 万でも、見に行くのはメモにある 2 箇所だけ

      // 減らしたあとも 1 以上だった番地を移す先。要らないものは移さず消える
      const stillNonZero: number[] = [];

      // index には 1, 0 の順に入る（メモに追加された順）
      for (const index of nonZeroIndexes) {
        // index=1 のとき: values[1] は 2 → 1。totalXor = 3 ^ 2 ^ 1 = 0
        // index=0 のとき: values[0] は 1 → 0。totalXor = 0 ^ 1 ^ 0 = 1
        totalXor ^= values[index] ^ (values[index] - 1);

        // index=1 → values = [1, 1] /  index=0 → values = [0, 1]
        values[index]--;

        // index=1: values[1] は 1 なので残す    stillNonZero = [1]
        // index=0: values[0] は 0 なので捨てる  stillNonZero = [1] のまま
        if (values[index] >= 1) stillNonZero.push(index);
      }

      // 作り直したメモに差し替える。nonZeroIndexes = [1, 0] → [1]
      // 次のクエリ 2 では 0 番地を見に行かなくて済む
      nonZeroIndexes = stillNonZero;
    }

    // このクエリ時点の答えを貯める。3 個目なら "3"、4 個目なら "1"
    //   answers = ["1","2"] → ["1","2","3"] → ["1","2","3","1"]
    answers.push(String(totalXor));
  }

  // 改行でつないで一気に書き出す（システムコール 1 回で済む）
  process.stdout.write(answers.join('\n') + '\n');
}

main();
