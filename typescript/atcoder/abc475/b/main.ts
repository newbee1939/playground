import * as fs from 'fs';

function main() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\n+/);
  const nums = input[1].split(' ').map(Number);

  // 1円のカウント
  let aCount = 0;
  // 10円のカウント
  let bCount = 0;
  // 100円のカウント
  let cCount = 0;

  // ループを1回回すだけ
  for (let i = 0; i < nums.length; i++) {
    // 1つの支払いずつ処理していく

    // 1000で割り切れる場合はお釣りが発生しないのでskip
    if (nums[i] % 1000 === 0) {
      continue;
    }

    // 1000の位の値
    const dNum = Math.floor(nums[i] / 1000);

    // お釣りを求める
    const tmp = ((dNum + 1) * 1000 - nums[i]).toString().padStart(3, '0').split('');

    aCount += Number(tmp[2]);
    bCount += Number(tmp[1]);
    cCount += Number(tmp[0]);
  }

  console.log(`${aCount} ${bCount} ${cCount}`);
}

main();
