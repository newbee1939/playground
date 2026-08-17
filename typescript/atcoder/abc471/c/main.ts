import * as fs from 'fs';

function main() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\n+/);

  // 数字に被りは存在しないのでnew Setしても数字が消えることはない
  const nums = new Set(input[1].split(' ').map(Number));

  // 現在の座標位置
  let cur = 0;
  // 移動距離
  let answer = 0;

  while (nums.size !== 0) {
    const min = new Map();
    nums.forEach((num) => {
      min.set(num, Math.abs(num - cur));
    })

    // 「curとの絶対値（距離）」と「実際の値」が小さい順に並び替える
    const sorted = Array.from(min).sort((a, b) => {
      if (a[1] === b[1]) {
        // 絶対値が同じ場合はより小さい方を優先
        return a[0] - b[0];
      } else {
        return a[1] - b[1];
      }
    })[0];

    // curとanswerの値を更新
    answer += sorted[1];
    cur = sorted[0];
    // numsの値を減らす
    nums.delete(cur);
  }

  console.log(answer);
}

main();
