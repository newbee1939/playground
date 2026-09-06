# TypeScript で AtCoder を解くときの落とし穴

やらかした順に追記していく。提出前のセルフチェックリストとしても使う。

## 1. 入力は必ず数値に変換する（ABC468 A で WA）

`readFileSync().split()` が返すのは `string[]`。数値のつもりで比較すると
**辞書順（文字コード順）で比較される**。

```ts
'8' < '10'; // false（先頭の '8' と '1' を比べて終わり）
8 < 10; // true
```

1 桁の値しか出てこないサンプルでは結果が一致してしまうので、
**サンプルが全部通っても WA になる**。ABC468 A はサンプル 3 に `10` が含まれていたが、
取りこぼし 1 件と誤検出 1 件がたまたま相殺して AC に見えていた。

対策は、読み込んだ直後にまとめて数値化してしまうこと。

```ts
const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
const n = Number(input[0]);
const a = input.slice(1).map(Number); // ここで number[] にしておく
```

- `map(Number)` は OK、`map(parseInt)` は **NG**。`map` はコールバックに
  `(値, index, 配列)` を渡すので、`parseInt(値, index)` となり index が基数として解釈される
  （`['1','2','3'].map(parseInt)` → `[1, NaN, NaN]`）
- 型で気づけるようにしたいなら、比較する変数に `number` の注釈を付けておくと
  `string` が紛れ込んだ時点で `npm run check` が落ちる
- `2^53` を超える値を扱う問題では `Number` ではなく `BigInt` を使う

参考: [Array.prototype.map() - MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/map)、
[関係演算子の比較アルゴリズム - ECMAScript 仕様](https://tc39.es/ecma262/#sec-islessthan)
（両辺が String なら文字列比較、それ以外は数値に変換して比較、と定義されている）

## 2. サンプルが通ることは正しさの証明ではない

サンプルは「入出力の形式が合っているか」の確認くらいに思っておく。
提出前に自分で意地悪なケースを 1 つ作って流す。

- **境界**: N が最小（ABC468 A なら N=3）、答えが 0 になるケース
- **桁**: 2 桁・3 桁が混じるケース（1. の文字列比較はこれで一発で死ぬ）
- **同値**: 等号が絡むケース（`1 1 1` のように隣り合う値が等しい）

```sh
printf '3\n9 10 9\n' | node atcoder/abc468/a/main.ts   # 期待値 1
```

作ったケースは `tests/4.in` / `4.out` 以降に足しておくと `test.sh` がそのまま流してくれる。
ABC468 A の `tests/4` は、この落とし穴を踏んだコードだけが落ちるように自分で作った回帰テスト
（`87 100 17 43 7 98 8 68 45 4` → 答えは 4、文字列比較だと 1 になる）。

## 3. 添字は「一番大きい添字」で確かめる

`for (let i = 0; i < n - 2; i++)` の中で `a[i + 2]` を見るなら、
最大の i は `n - 3` で、参照する最大の添字は `n - 1`。ここが配列長 `n` に収まるかを
毎回この形で確認する。JS は範囲外アクセスで例外を投げず `undefined` を返すため、
ずれていても RE にならず静かに WA になる。

とくに **`undefined` を算術に混ぜると `NaN` になり、以後どの比較も `false` になる**
（`NaN <= k` も `NaN > k` も false）。累積値に一度でも混ざると全出力が同じ側に倒れる。
ABC472 C の差分更新でこれを踏み、判定が全部 `No` になった。

```ts
sum = sum - a[-1] + a[i]; // a[-1] は undefined → sum は NaN のまま戻らない
```

差分更新で引くのは「窓からこぼれる添字」（幅 m なら `i - m`）。
`i >= m` のときだけ引く、と書けば範囲外に触れずに済む。

## 4. 提出前の定型

```sh
./scripts/test.sh atcoder/<contest>/<problem>    # サンプル
./scripts/bench.sh atcoder/<contest>/<problem>   # 最悪ケースの実行時間（gen.ts が要る）
npm run check                                    # 型チェック
```

加えて、出力は溜めて最後に 1 回（`console.log` の連打は TLE 要因）。
`bench.sh` は初回に `gen.ts` の雛形を作るので、問題の制約を見て最大値に書き換える。

## 5. 出力の組み立ては型で守られない（ABC085 C）

`` console.log(`${a} ${b} moneyMap.get("1000")`) ``  のように `${}` を忘れても、
中身がただの文字列として出るだけで **型エラーにならない**。
テンプレートリテラルは「文字列を作る」以上のことをしないので、tsc は何も言わない。

配列に入れて `join(' ')` で出すと、この書き間違い自体が起きない。

```ts
console.log([a, b, c].join(' ')); // number[] なので ${} の付け忘れが存在しない
```

同じ理由で、答えの持ち方は `Map<string, number>` より固定長のタプルの方が安全。
`map.get('10000')` は `number | undefined` を返し、`undefined + 1` は例外ではなく `NaN`（項目 3 参照）。

## 6. `Set` / `Map` は挿入順を保つ（ABC474 C）

JS の `Set` と `Map` は**挿入順**で反復すると仕様で決まっている。
すでに入っている値を `add` し直しても順番は変わらないが、
`delete` してから `add` すると**末尾に入り直す**。

```ts
const s = new Set([1, 2, 3]);
s.add(1); // 1 2 3（変わらない）
s.delete(1);
s.add(1); // 2 3 1（末尾へ移動）
```

「要素を末尾に移す」操作が O(1) で書けるので、連結リスト相当のことができる。
ただし挿入順という前提が読み手に見えないので、意図はコメントで書く。

参考: [Set - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
（"iterates its elements in insertion order"）

## 7. 長い配列の連結に `push(...arr)` を使わない（ABC474 C）

`a.push(...b)` のスプレッドは、**b の要素を 1 つずつ引数として積む**呼び出しに展開される。
引数はコールスタックに載るので、要素数が多いと `RangeError: Maximum call stack size exceeded`
で落ちる（Node 22 の手元計測では 15 万件で既にアウト）。

```ts
a.push(...b); // NG: b が長いと RangeError
const merged = a.concat(b); // OK: 新しい配列を返す（a も b も変わらない）
for (const v of b) a.push(v); // OK: a を伸ばしたいならこちら
```

同じ理由で `Math.max(...arr)` も長い配列では落ちる。`arr.reduce((m, v) => (v > m ? v : m), -Infinity)` にする。
