import * as fs from 'fs';

// 監視されていないマスの個数を求める
function main() {
  const input = fs.readFileSync('/dev/stdin', 'utf-8').trim().split(/\s+/);
  // 要素の数
  const m = parseInt(input[0]);
  // 監視が見張る距離
  const d = parseInt(input[1]);

  // .とGの配列
  const strs = input[2].split("");

  // Gから監視されているマスを格納する
  let tmp = [];
  let i = 0;
  for (const str of strs) {
    // 現在のターンのマスがガードマンだった場合
    if (str === "G") {
      for (let j = i - d; j <= i + d; j++) {
        // 存在しないindexの場合はundefinedが入るはず
        tmp.push(strs[j]);
      }
    }

    // TODO: indexを進める必要がある
    // 被ったらダメなんよね（2倍にする必要がある）
    i = i + d + d;
  }

  const answer = tmp.filter((t) => {
    return t !== "G";
  }).filter((f) => {
    return !f;
  })


  // 監視されていないマスの数を答える
  console.log(m - answer.length);
}

main();
