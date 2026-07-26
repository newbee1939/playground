# playground

A personal sandbox for coding experiments and algorithm practice.

AtCoder / コーディング試験用。言語ごとに Dev Container を分けているので、
ローカルに必要なのは Docker だけ。

```
playground/
├── .devcontainer/typescript/devcontainer.json   # Node.js 22（AtCoder のジャッジに合わせる）
├── .cursorignore                                 # AI 補完の無効化（後述）
└── typescript/                                   # 作業ディレクトリ
    ├── template.ts                               # 標準入出力のひな形
    ├── scripts/{new.sh,test.sh}
    ├── atcoder/<contest>/<problem>/              # 例: atcoder/abc468/a/
    │   ├── main.ts                               # 提出したコード
    │   ├── alt.ts                                # 別解（任意）
    │   └── tests/{1.in,1.out,2.in,2.out,...}     # サンプル入出力
    └── practice/<name>/                          # 企業のコーディング試験など
```

ディレクトリ名は AtCoder のコンテスト ID をそのまま使う（`abc468` なら
<https://atcoder.jp/contests/abc468>）。スペースを含まないのでシェルから扱いやすく、
URL とも一対一で対応する。

## 準備

Docker に加えて、エディタ側に Dev Containers 拡張が必要（これが無いと
**Reopen in Container** がコマンドパレットに出てこない）。

```sh
cursor --install-extension anysphere.remote-containers   # Cursor
code   --install-extension ms-vscode-remote.remote-containers   # VS Code
```

Cursor は Microsoft 版が使えないため Anysphere のフォークを入れる。
`.vscode/extensions.json` に推奨として登録してあるので、リポジトリを初めて開いたときに
インストールを促すダイアログも出る。

## 使い方

Cursor / VS Code でこのリポジトリのルートを開き、**Dev Containers: Reopen in Container**。
以降は `typescript/` がカレントディレクトリになる。

```sh
./scripts/new.sh atcoder/abc468/a        # ディレクトリと main.ts と tests/ を作る
```

`tests/1.in` に問題ページの「入力例 1」、`tests/1.out` に「出力例 1」を貼る。
サンプルが増えたら `2.in` / `2.out` … と足す。あとは解いて、

```sh
./scripts/test.sh atcoder/abc468/a         # 全サンプルを実行して期待出力と比較
./scripts/test.sh atcoder/abc468/a alt.ts  # main.ts 以外を試すとき
npm run check                              # 提出前に型チェック
```

`AC` / `WA` / `RE` をケースごとに出力し、1 つでも落ちたら終了コード 1 を返す。
比較は末尾の改行を無視するので、出力の最後に改行があってもなくても通る。
`new.sh` は既存ファイルを上書きしないので、同じディレクトリに何度実行してもよい。

エディタを使わずターミナルだけで入ることもできる。CLI は `.devcontainer/` 直下しか
探さないので `--config` の指定が要る。

```sh
npx @devcontainers/cli up   --workspace-folder . --config .devcontainer/typescript/devcontainer.json
npx @devcontainers/cli exec --workspace-folder . --config .devcontainer/typescript/devcontainer.json bash
```

## AtCoder のルールまわり

### 生成 AI

ABC / ARC / AGC の**開催中は生成 AI の利用が禁止**されている。コード生成だけでなく、
問題文の要約・**コード補完ツール（Copilot / Cursor Tab など）**・コンパイルエラーやバグの診断・
プログラミング言語の変換・対話型の AI 検索も対象
（[AtCoder生成AI対策ルール](https://info.atcoder.jp/entry/llm-rules-ja)）。
例外は問題文の翻訳のみ。AHC と過去問練習は対象外。

うっかり補完が出てしまう事故を防ぐため、リポジトリ側で常時オフにしてある。

| ファイル | 効果 |
| --- | --- |
| `.cursorignore`（`**/*`） | リポジトリ全体を Cursor の Tab / Chat / Agent / インデックスから除外 |
| `.vscode/settings.json` | `editor.inlineSuggest.enabled: false` でインライン補完を停止。Copilot も無効化 |
| `CLAUDE.md` | Claude Code に「開催中の問題は手伝わない」ことを指示 |

`.cursorignore` は `.gitignore` と同じ記法で、書かれたファイルを AI 機能から完全に遮断する
（インデックスだけ外す `.cursorindexingignore` とは別物）。過去問の復習では AI を使ってよいので、
必要なときは Cursor 側のトグルで一時的に戻す。

### 公開してよいもの / いけないもの

- **push はコンテスト終了後に行う。** 開催中は解法の共有が禁止されており
  （[コンテストのルール](https://info.atcoder.jp/overview/contest/rules)）、
  public リポジトリへの push は共有にあたる
- **自分のコードは公開してよい。** 利用規約に「本サービスに対して投稿されたプログラムの
  所有権と著作権は、そのプログラムを作成したユーザに帰属」とある
  （[利用規約](https://atcoder.jp/tos?lang=ja)）
- **問題文はコミットしない。** ユーザ自身が作成したものを除き権利は AtCoder 側に帰属する。
  参照は URL だけ残し、`tests/` に貼るのはサンプルの入出力データのみにする
- **解説や他人の提出コードはコミットしない。** 著作権はその作者にある。参考にしたら
  自分で書き直したものを `alt.ts` として置く

## 提出時のメモ

- 言語は **TypeScript 5.9 (tsc 5.9.2 (Node.js 22.19.0))** を選ぶ
- ジャッジは `tsc` + `node`、ローカルは type stripping。この差で困らないよう
  `erasableSyntaxOnly` を有効にして `enum` / `namespace` などを書けなくしてある
- 出力は溜めて最後に 1 回書き出す。`console.log` を N 回呼ぶと TLE の原因になる
- 64bit 整数は `BigInt(...)` を使う（`number` は 2^53 まで）

## 言語を追加するとき

`.devcontainer/<lang>/devcontainer.json` を足して、`<lang>/` を作るだけ。
Dev Container 仕様が `.devcontainer/` の 1 階層下を探すので、ルートを開いたまま
**Reopen in Container** で切り替えられる。

```json
{
  "name": "playground-<lang>",
  "image": "mcr.microsoft.com/devcontainers/<lang>:<version>",
  "workspaceFolder": "/workspaces/${localWorkspaceFolderBasename}/<lang>"
}
```

`scripts/` は実行コマンドが言語依存なので言語ごとに置く。
必要なら `.github/dependabot.yml` にその言語のエコシステムを 1 ブロック追記する。
