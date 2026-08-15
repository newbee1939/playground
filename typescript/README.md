# typescript

Dev Container の中で開いているのはこのディレクトリ。コマンドの早見表を置いておく。
`npm run help` でこのファイルをそのままターミナルに出せる。

Dev Container の入り方・AtCoder のルール・提出時のメモはリポジトリルートの
`../README.md`（`npm run rules` で表示）にある。

## コマンド

```sh
./scripts/new.sh atcoder/abc468 a b c d e f g   # 問題ごとに main.ts / answer.ts / tests/ を作る
./scripts/new.sh practice fizzbuzz              # 企業のコーディング試験など

./scripts/test.sh atcoder/abc468/a              # 全サンプルを実行して期待出力と比較
./scripts/test.sh atcoder/abc468/a answer.ts    # main.ts 以外を試すとき

./scripts/new-leetcode.sh 1 two-sum             # LeetCode の問題ディレクトリを作る
npm test                                        # leetcode 配下のテストを全部流す
node --test "leetcode/0001-two-sum/*.test.ts"   # 1 問だけ流すとき

npm run check                                   # 提出前に型チェック（tsc --noEmit）
```

どちらのスクリプトも `--help` で詳しい使い方が出る。引数が足りないときも同じものが出る。

```sh
./scripts/new.sh --help
./scripts/test.sh --help
```

## 問題ディレクトリ

```
atcoder/<contest>/<problem>/     # 例: atcoder/abc468/a/
├── main.ts                      # 提出したコード
├── answer.ts                    # コンテスト後に正解を書き直す用
└── tests/{1,2,3}.{in,out}       # サンプル入出力（枠は new.sh が 3 つ作る）
```

`tests/1.in` に問題ページの「入力例 1」、`tests/1.out` に「出力例 1」を貼る。
サンプルが 4 つ以上ある問題は `4.in` / `4.out` を手で足す。
空のままの枠は `test.sh` が読み飛ばすので、埋めなくてよい。

## LeetCode

AtCoder と違って標準入出力ではなく関数を提出するので、サンプルは `tests/*.in` ではなく
アサーションで書く。テストランナーは Node 標準の `node:test`（追加ライブラリなし）。

```
leetcode/<0 埋め 4 桁の id>-<slug>/   # 例: leetcode/0001-two-sum/
├── solution.ts                      # 解答。LeetCode に貼るのはこのファイルの中身
├── solution.test.ts                 # 問題ページの Example をケースにする
└── README.md                        # 方針・計算量・学び
```

`./scripts/new-leetcode.sh 1 two-sum` で 3 つとも雛形から作る。`solution.ts` の関数名と
引数は問題のシグネチャに合わせて書き換える（テスト側の import も同じ名前に直す）。

解いたら `README.md` に方針・計算量・学びを残す。使い回せる考え方まで一般化できたら
`../PATTERNS.md`、TypeScript 固有の落とし穴なら `NOTES.md` にも足す。

## 詰まりやすいところ

- 出力は溜めて最後に 1 回書き出す。`console.log` を N 回呼ぶと TLE の原因になる
- 64bit 整数は `BigInt(...)` を使う（`number` は 2^53 まで）
- `enum` / `namespace` は `erasableSyntaxOnly` で禁止してある（ローカルの type stripping で動かないため）
