import * as fs from 'fs';

function main() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  const n = Number(input[0]);
  const m = Number(input[1]);
  const k = Number(input[2]);
  const a = input.slice(3, 3 + n).map(Number);

  // eaten[i] は「i 日目に実際に口に入れたカロリー」。食べなければ 0 なので、
  // 窓から抜けるときにそのまま引ける
  const eaten = new Array<number>(n);
  const answers = new Array<string>(n);

  // 直近 m 日（i-m+1 .. i）で実際に食べたカロリーの合計
  let windowSum = 0;

  for (let i = 0; i < n; i++) {
    // 窓からこぼれた日を引く（差分更新なので毎回 O(1)）
    if (i >= m) windowSum -= eaten[i - m];

    if (windowSum + a[i] <= k) {
      eaten[i] = a[i];
      windowSum += a[i];
      answers[i] = 'Yes';
    } else {
      eaten[i] = 0;
      answers[i] = 'No';
    }
  }

  // 出力は溜めて 1 回
  console.log(answers.join('\n'));
}

main();
