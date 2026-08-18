import * as fs from 'fs';

function main() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\n+/);

  // 数字に被りは存在しないのでnew Setしても数字が消えることはない
  const nums = new Set(input[1].split(' ').map(Number));

  // 現在の座標位置
  let cur = 0;
  // 移動距離（最終的な答え）
  let answer = 0;

  while (nums.size !== 0) {
    const targetNum = Array.from(nums).sort((a, b) => {
      // 前後のabsを計算
      const firstAbs = Math.abs(a - cur);
      const secondAbs = Math.abs(b - cur);

      if (firstAbs === secondAbs) {
        // 絶対値が同じ場合は、数字がより小さい方を優先
        return a - b;
      } else {
        // それ以外は単純に絶対値で比較
        return firstAbs - secondAbs;
      }
    })[0];

    // curとanswerの値を更新
    answer += Math.abs(targetNum - cur);
    cur = targetNum;
    // numsの値を減らす
    nums.delete(cur);
  }

  console.log(answer);
}

main();
