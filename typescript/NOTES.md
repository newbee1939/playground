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

## 4. 提出前の定型

```sh
./scripts/test.sh atcoder/<contest>/<problem>   # サンプル
npm run check                                   # 型チェック
```

加えて、出力は溜めて最後に 1 回（`console.log` の連打は TLE 要因）。
