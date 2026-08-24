import * as fs from 'fs';

function main() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\n+/);
  const nums = input[1].split(' ').map(Number);
  // ここでループが回ってしまっている...
  const sum = nums.reduce((acc, value) => acc + value, 0);

  // 初期値
  let a = nums[0];
  let answer = Math.abs((sum - nums[0]) - nums[0]);

  for (let i = 1; i < nums.length; i++) {
    a += nums[i];
    const tmp = Math.abs((sum - a) - a);

    // より小さい値に付け替える
    if (tmp < answer) {
      answer = tmp;
    }
  }

  console.log(answer);
}

main();
