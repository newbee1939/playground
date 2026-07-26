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

## 詰まりやすいところ

- 出力は溜めて最後に 1 回書き出す。`console.log` を N 回呼ぶと TLE の原因になる
- 64bit 整数は `BigInt(...)` を使う（`number` は 2^53 まで）
- `enum` / `namespace` は `erasableSyntaxOnly` で禁止してある（ローカルの type stripping で動かないため）
