import * as fs from 'fs';

// ABC475 A - mnclr  https://atcoder.jp/contests/abc475/tasks/abc475_a
//
// やること: S の「文字の間」だけに o を挟む（mtr -> motor）。
//
// 素直に「各文字に o を足して最後の 1 文字を削る」と書けるが、
// ⭐️「区切り文字は要素の間にだけ入る」という join の性質にそのまま任せられる。
// 末尾の後始末が消えるぶん、オフバイワン（1 個ずれ）のバグが起きる余地がなくなる。
//
//   [...'mtr'] => ['m','t','r']  -> join('o') => 'm' + 'o' + 't' + 'o' + 'r'
//
// 計算量 O(|S|)。
function main() {
  const s = fs.readFileSync(0, 'utf-8').trim();
  console.log([...s].join('o'));
}

main();
