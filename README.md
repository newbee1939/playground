# playground

A personal sandbox for coding experiments and algorithm practice.

AtCoder / コーディング試験用。言語ごとに Dev Container を分けているので、
ローカルに必要なのは Docker だけ。

```
playground/
├── .devcontainer/typescript/devcontainer.json   # Node.js 22（AtCoder のジャッジに合わせる）
└── typescript/                                   # 作業ディレクトリ
```

## 準備

Docker に加えて、エディタ側に Dev Containers 拡張が必要（これが無いと
**Reopen in Container** がコマンドパレットに出てこない）。

```sh
cursor --install-extension anysphere.remote-containers   # Cursor
code   --install-extension ms-vscode-remote.remote-containers   # VS Code
```

Cursor は Microsoft 版が使えないため Anysphere のフォークを入れる。

## 使い方

1. Cursor / VS Code でこのリポジトリのルートを開き、**Dev Containers: Reopen in Container**
2. 解く

```sh
cp template.ts abc999_a.ts     # テンプレートをコピー
# abc999_a.txt に入力サンプルを貼る
node abc999_a.ts < abc999_a.txt   # ビルド不要（Node の type stripping）
npm run check                      # 提出前に型チェック
```

動作確認: `node template.ts < sample.txt` → `6 test`

エディタを使わずターミナルだけで入ることもできる。CLI は `.devcontainer/` 直下しか
探さないので `--config` の指定が要る。

```sh
npx @devcontainers/cli up   --workspace-folder . --config .devcontainer/typescript/devcontainer.json
npx @devcontainers/cli exec --workspace-folder . --config .devcontainer/typescript/devcontainer.json bash
```

## 提出時のメモ

- 言語は **TypeScript 5.9 (tsc 5.9.2 (Node.js 22.19.0))** を選ぶ
- ジャッジは `tsc` + `node`、ローカルは type stripping。この差で困らないよう
  `erasableSyntaxOnly` を有効にして `enum` / `namespace` などを書けなくしてある
- 出力は `print()` に溜める。`console.log` を N 回呼ぶと TLE の原因になる
- 64bit 整数は `BigInt(next())` を使う（`number` は 2^53 まで）

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

必要なら `.github/dependabot.yml` にその言語のエコシステムを 1 ブロック追記する。
