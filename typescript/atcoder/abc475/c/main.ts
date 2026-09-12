import * as fs from 'fs';

function main() {
  // 以下の場合
  // 6 3 10
  // 5 2 4 1 6

  const input = fs.readFileSync(0, 'utf-8').trim().split(/\n+/);
  const tmp = input[0].split(' ');
  const N = Number(tmp[0]); // 6
  const S = Number(tmp[1]); // 3
  const L = Number(tmp[2]); // 10
  const A = input[1].split(' ').map(Number); // 5 2 4 1 6（それぞれの街の距離の間隔）
  console.log(A);

  let cityCount = 1; // 通った街の数: Sの街も入るので初期値は1
  let l = 0; // 移動距離
  let curr = S; // 現在の街
  let used = new Set(); // S以外の通ったことある街

  while (l <= L) {
    // 現在の街を基準に、左右どちらも通ったことなければより値が小さい方に行く
    // どちらか通ったことある場合は、値が大きくても通ったことない方へ行く

    // 両端を含まない真ん中にいる場合
    if (curr > 1 && curr < N && !used.has(curr - 1) && !used.has(curr + 1)) {
      if (A[curr - 2] < A[curr + 2]) {
        // 左の方が小さい場合
        l += A[curr - 2];
        cityCount++;
        used.add(curr - 1);
        curr = curr - 1;
      } else {
        // 右の方が小さい場合
        l += A[curr + 2];
        cityCount++;
        used.add(curr + 1);
        curr = curr - 1;
      }
    } else {
      // 通ったことある街を移動するだけなのでカウントは増えない
      // 移動距離が伸びるだけ
        l += A[curr + 2];
        cityCount++;
        used.add(curr + 1);
        curr = curr - 1;
    }
  }

  // 一連の移動で訪れる街の数として考えられる最大値
  // console.log(cityCount);
}

main();
