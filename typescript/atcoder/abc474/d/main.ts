import * as fs from 'fs';

function main() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\n+/);

  // 石の種類の数
  const n = input[0];

  // それぞれ種類ごとに持っている石の数
  const tStoneNums = input[1].split(' '); // 高橋
  // console.log(tStoneNums);
  const aStoneNums = input[2].split(' '); // 青木

  // 高橋君が持っている石の重みの総和が青木君が持っている石の重みの総和よりも真に大きい石の重みのパターンを一つ出す

  // 全く同じ数字の組み合わせの場合は確実にfalse
  if (input[1] === input[2]) {
    console.log("No");
  } else {
    console.log("Yes");
  }

  // 以下、異なる組み合わせのパターン
}

main();
