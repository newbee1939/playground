# playground

AtCoder / LeetCode / コーディング試験用。言語ごとに Dev Container を分けているので、
ローカルに必要なのは Docker だけ。

```
playground/
├── .devcontainer/typescript/devcontainer.json   # Node.js 22（AtCoder のジャッジに合わせる）
└── typescript/                                   # 作業ディレクトリ
    ├── README.md                                 # コマンドの早見表（`npm run help`）
    ├── template.ts                               # 標準入出力のひな形
    ├── scripts/{new.sh,test.sh,new-leetcode.sh}
    ├── atcoder/<contest>/<problem>/              # 例: atcoder/abc468/a/
    │   ├── main.ts                               # 提出したコード
    │   ├── answer.ts                             # コンテスト後に正解を書き直す用
    │   └── tests/{1,2,3}.{in,out}                # サンプル入出力
    ├── leetcode/<id>-<slug>/                     # 例: leetcode/0001-two-sum/
    │   ├── solution.ts                           # 提出した関数
    │   ├── solution.test.ts                      # Example をアサーションで
    │   └── README.md                             # 方針・計算量・学び
    └── practice/<name>/                          # 企業のコーディング試験など
```

ディレクトリ名は AtCoder のコンテスト ID をそのまま使う（`abc468` なら
<https://atcoder.jp/contests/abc468>）。

## 準備

Docker に加えて、エディタ側に Dev Containers 拡張が必要（これが無いと
**Reopen in Container** がコマンドパレットに出てこない）。Cursor は Microsoft 版が
使えないため Anysphere のフォークを入れる。

```sh
cursor --install-extension anysphere.remote-containers
code   --install-extension ms-vscode-remote.remote-containers
```

## 使い方

リポジトリのルートを開いて **Dev Containers: Reopen in Container**。
以降は `typescript/` がカレントディレクトリになる。

```sh
./scripts/new.sh atcoder/abc468 a b c d e f g   # 問題ごとに main.ts / answer.ts / tests/ を作る
./scripts/new.sh practice fizzbuzz              # 企業のコーディング試験など
```

第 1 引数が親ディレクトリ、残りが問題名。名前を並べた分だけまとめて作る。
既にあるファイルは上書きしないので、後から `h` を足したくなったら同じコマンドを叩けばよい。

`tests/1.in` に問題ページの「入力例 1」、`tests/1.out` に「出力例 1」を貼る。
枠は 3 つまで先に作ってあり、4 つ以上ある問題は `4.in` / `4.out` を手で足す。
空のままの枠は読み飛ばされるので、埋めなくてよい。あとは解いて、

```sh
./scripts/test.sh atcoder/abc468/a            # 全サンプルを実行して期待出力と比較
./scripts/test.sh atcoder/abc468/a answer.ts  # main.ts 以外を試すとき
npm run check                                 # 提出前に型チェック
```

`AC` / `WA` / `RE` をケースごとに出力し、1 つでも落ちたら終了コード 1 を返す。

コンテスト中は `main.ts` に提出したコードを残し、終わってから `answer.ts` に
正しい解法を書き直す。どちらも `test.sh` で同じサンプルを流せる。

### LeetCode

標準入出力ではなく関数を提出する形式なので、サンプルは `tests/*.in` ではなく
Node 標準のテストランナー（`node:test`）でアサーションとして書く。追加ライブラリは無い。

```sh
./scripts/new-leetcode.sh 1 two-sum   # leetcode/0001-two-sum/ に 3 ファイル作る
npm test                              # leetcode 配下のテストを全部流す
```

`solution.ts` が提出するコード、`solution.test.ts` に問題ページの Example を書き、
解き終わったら `README.md` に方針・計算量・学びを残す。ディレクトリ名の slug は
URL の末尾（`https://leetcode.com/problems/two-sum/` なら `two-sum`）。

### コンテナの中から使い方を確認する

Dev Container ではこのルート README がファイルツリーに出てこないので、
`typescript/README.md` にコマンドの早見表を置いてある。

```sh
npm run help    # typescript/README.md（コマンド早見表）を表示
npm run rules   # このルート README を表示

./scripts/new.sh --help
./scripts/test.sh --help
```

## AtCoder のルールまわり

ABC / ARC / AGC の**開催中は生成 AI の利用が禁止**されている。コード生成だけでなく、
問題文の要約・**コード補完ツール（Copilot / Cursor Tab など）**・バグの診断・
言語の変換・対話型の AI 検索も対象（[AtCoder生成AI対策ルール](https://info.atcoder.jp/entry/llm-rules-ja)）。
うっかり補完が出る事故を防ぐため、`.cursorignore` でリポジトリ全体を Cursor の AI 機能から
除外し、`.vscode/settings.json` でインライン補完を切り、`CLAUDE.md` で Claude Code にも
開催中は手伝わないよう指示している。AHC と過去問練習は対象外なので、復習で使いたいときは
Cursor 側のトグルで一時的に戻す。

公開まわりは以下のとおり。

- **push はコンテスト終了後。** 開催中は解法の共有が禁止されており
  （[コンテストのルール](https://info.atcoder.jp/overview/contest/rules)）、
  public リポジトリへの push は共有にあたる
- **自分のコードは公開してよい。** [利用規約](https://atcoder.jp/tos?lang=ja)に
  「本サービスに対して投稿されたプログラムの所有権と著作権は、そのプログラムを作成した
  ユーザに帰属」とある
- **問題文はコミットしない。** 権利は AtCoder 側に帰属する。参照は URL だけ残し、
  `tests/` に貼るのはサンプルの入出力データのみ
- **解説や他人の提出コードもコミットしない。** 参考にしたら自分で書き直して `answer.ts` に置く

## 提出時のメモ

- 言語は **TypeScript 5.9 (tsc 5.9.2 (Node.js 22.19.0))** を選ぶ
- ジャッジは `tsc` + `node`、ローカルは type stripping。この差で困らないよう
  `erasableSyntaxOnly` を有効にして `enum` / `namespace` などを書けなくしてある
- 出力は溜めて最後に 1 回書き出す。`console.log` を N 回呼ぶと TLE の原因になる
- 64bit 整数は `BigInt(...)` を使う（`number` は 2^53 まで）

## 言語を追加するとき

`.devcontainer/<lang>/devcontainer.json`（`workspaceFolder` を `<lang>/` にする）と
`<lang>/scripts/` を足す。Dev Container 仕様が `.devcontainer/` の 1 階層下を探すので、
ルートを開いたまま **Reopen in Container** で切り替えられる。
