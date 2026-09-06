import * as fs from 'fs';

function main() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\n+/);
  const n = Number(input[0]);

  const values = input[1].split(" ").map(Number);

  let l = 0; // 左端のindex

  let isNo = false;

  while (l < n) {
    // ブロック内の数字を一つずつ検査していく
    // 対象ブロックが持てる数字の最大値
    const limit = l + 10;
    // 実際のlの値を変えないために一時変数へ
    let tmpL = l;
    while (tmpL < limit) {
      if (values[tmpL] > limit || values[tmpL] < l + 1) {
        // ブロック内にあってはならない値があれば即falseしてbreak
        isNo = true;
        break;
      }
      tmpL++;
    }

    // 次のブロックの検査へ
    // lの値を動かす
    if (n - l >= 10) {
      l += 10;
    } else {
      // 最後のグループが10人以下の場合
      l += (n - l);
    }
  }

  if (isNo) {
    console.log("No");
  } else {
    console.log("Yes");
  }
}

main();
