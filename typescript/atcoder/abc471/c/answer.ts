import * as fs from 'fs';

/**
 * ABC471 C - Cookies and Greedy Takahashi
 * https://atcoder.jp/contests/abc471/tasks/abc471_c
 *
 * 【なぜ「毎回 全部から最寄りを探す」だと間に合わないか】
 * 素直に「残っているクッキーを毎回ソートして先頭を取る」と書くと、
 * 1 回のソートに O(N log N)、それを N 回繰り返すので O(N^2 log N)。
 * N = 3*10^5 では約 5*10^11 ステップになり、2 秒には到底収まらない（TLE）。
 *
 * 【この解法（2-pointers）が速い理由】
 * 「⭐️次に拾う候補は毎回たった 2 つしかない」ことに気づけば、
 * 最初に 1 回ソートするだけで、あとは 1 手あたり O(1) で決められる。
 *   ソート O(N log N) + シミュレーション O(N) = 全体 O(N log N)
 * N = 3*10^5 なら約 500 万ステップで、余裕で間に合う。
 */
function main() {
  const [, line] = fs.readFileSync(0, 'utf-8').split('\n');
  const a = line.trim().split(' ').map(Number);

  // sort() は既定だと文字列比較（"10" < "9" になる）ので、数値用の比較関数が必須
  a.sort((x, y) => x - y);

  // 負の座標と正の座標に分け、どちらも「原点 0 に近い順」に並べておく。
  // 例: a = [-11, -4, -1, 2, 5] なら negs = [-1, -4, -11], poss = [2, 5]
  // 高橋君は必ず 0 から出発するので、各側で「先に拾われるのは 0 に近い方」から。
  const negs = a.filter((v) => v < 0).reverse(); // 降順（0 に近い順）
  const poss = a.filter((v) => v > 0); //            昇順（0 に近い順）

  let i = 0; // negs の中でまだ拾っていない先頭
  let j = 0; // poss の中でまだ拾っていない先頭
  let cur = 0; // 現在の座標
  let answer = 0; // 移動距離の合計

  while (i < negs.length || j < poss.length) {
    // ここがこの解法の肝。
    // 残っている負のクッキーは全部 negs[i] 以下、残っている正のクッキーは全部 poss[j] 以上。
    // そして cur は必ずその内側にいる（negs[i] < cur < poss[j]）。
    //   なぜなら cur は「直前に拾ったクッキーの座標」= 内側から拾い終えた場所だから。
    // よって最寄りの候補は左隣の negs[i] と右隣の poss[j] の 2 つだけで、
    // それ以外を見る必要がない ＝ 毎回のソートが不要になる。
    const distNeg = i < negs.length ? cur - negs[i] : Infinity; // 左へ戻る距離
    const distPos = j < poss.length ? poss[j] - cur : Infinity; // 右へ進む距離
    // 片側を使い切ったら Infinity にしておくと、自然ともう片側が選ばれる

    // 距離が同じときは「座標が小さい方」を選ぶルール。
    // negs[i] < 0 < poss[j] なので小さいのは必ず負側 → <= にするだけでタイブレークできる
    const next = distNeg <= distPos ? negs[i++] : poss[j++];

    answer += Math.abs(next - cur);
    cur = next;
  }

  // 移動距離の合計は最大でも約 6*10^14。
  // Number が誤差なく扱える上限 9007199254740991（約 9*10^15）の中なので BigInt は不要
  console.log(answer);
}

main();
