# TypeScript playground

AtCoder / コーディング試験用。Node.js 22 の **type stripping**（`.ts` をそのまま `node` で実行する機能）を使うのでビルド不要。

## 使い方

```sh
# 1. テンプレートから新しい解答ファイルを作る
npm run new -- practice/abc999_a.ts

# 2. 入力サンプルを practice/abc999_a.txt に貼る

# 3. 実行（ビルド不要）
node practice/abc999_a.ts < practice/abc999_a.txt

# 4. 型チェック（提出前に一度流す）
npm run check
```

動作確認用のサンプルが同梱されている:

```sh
node template.ts < sample.txt   # => 6 test
```

## 提出時の注意

- AtCoder では **TypeScript 5.9 (tsc 5.9.2 (Node.js 22.19.0))** を選ぶ。ファイルは `Main.ts` として提出される。
- ジャッジは `tsc` でコンパイルしてから `node` で実行するが、ローカルは type stripping で実行している。
  この差で挙動がズレないよう `tsconfig.json` で `erasableSyntaxOnly` を有効にしてある
  （`enum` / `namespace` / コンストラクタの parameter properties など、型を消すだけでは実行できない構文がコンパイルエラーになる）。
- 出力は `outputs` に溜めて最後に 1 回書き出す。`console.log` を N 回呼ぶと TLE の原因になる。
- 64bit 整数が必要な問題は `nextBigInt()` を使う（`number` は 2^53 までしか正確に扱えない）。

## エディタのスニペット

`.vscode/atcoder.code-snippets` に登録済み。`.ts` ファイルで `atcoder` と打って Tab で展開できる。
