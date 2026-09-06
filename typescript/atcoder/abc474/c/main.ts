import * as fs from 'fs';

function main() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\n+/);
  const q = Number(input[0].split(' ')[1]);
  const pSet = new Set(input[1].split(" "));

  let i = 0;

  while (i < q) {
    // このループにおけるaの値
    const a = input[i + 2];
    // 一つ前と同じ値の場合はskipする（わざわざ計算する意味がないので）
    if (i > 0 && a === input[i + 1]) {
      i++;
      continue;
    } else {
      // aが一つ前と違う場合は再計算する
      pSet.delete(a);
      pSet.add(a);
      i++;
    }
  }

  const answer = Array.from(pSet).join(' ');

  console.log(answer);
}

main();
