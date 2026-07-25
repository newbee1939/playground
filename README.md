# playground

A personal sandbox for coding experiments and algorithm practice.

AtCoder / 企業のコーディング試験用に、**言語ごとに独立した Dev Container** を用意している。
ローカルには Docker だけあればよく、各言語のツールチェインはコンテナの中で完結する。

## 構成

```
playground/
├── .devcontainer/
│   ├── typescript/devcontainer.json   # Node.js 22（AtCoder のジャッジに合わせる）
│   └── go/devcontainer.json           # Go 1.25
├── typescript/                        # TypeScript の作業ディレクトリ
└── go/                                # Go の作業ディレクトリ
```

Dev Container の仕様では `.devcontainer/<folder>/devcontainer.json` を 1 階層だけ探索するため、
この置き方だと**リポジトリのルートを開いたまま言語を切り替えられる**（リポジトリ全体がマウントされるので git 操作もそのまま使える）。

## 使い方

1. VS Code / Cursor でこのリポジトリのルートを開く
2. コマンドパレット → **Dev Containers: Reopen in Container**
3. `playground-typescript` / `playground-go` から使う言語を選ぶ

言語を切り替えるときは **Reopen in Container** で別の設定を選び直す。
各言語の具体的な使い方は [typescript/README.md](typescript/README.md) / [go/README.md](go/README.md) を参照。

## 言語を追加するとき

1. `.devcontainer/<lang>/devcontainer.json` を作る（`image` と `workspaceFolder` の 2 行が最小構成）
2. `<lang>/` に作業ディレクトリとテンプレートを置く

```json
{
  "name": "playground-<lang>",
  "image": "mcr.microsoft.com/devcontainers/<lang>:<version>",
  "workspaceFolder": "/workspaces/${localWorkspaceFolderBasename}/<lang>"
}
```
