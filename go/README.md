# Go playground

AtCoder / コーディング試験用。1 問 1 ディレクトリ（= 1 main パッケージ）で管理する。

## 使い方

```sh
# 1. テンプレートをコピー
cp -r template practice/abc999_a

# 2. 入力サンプルを practice/abc999_a/sample.txt に貼る

# 3. 実行
go run ./practice/abc999_a < practice/abc999_a/sample.txt

# 4. 静的チェック
go vet ./...
```

動作確認用のサンプルが同梱されている:

```sh
go run ./template < sample.txt   # => 6 test
```

## 提出時の注意

- AtCoder のジャッジは **go 1.25.1**。提出するのは `main.go` の中身だけ。
- `bufio.Scanner` の既定バッファは 64KB。長い 1 行を読む問題で切れるので、テンプレートでは 1MB に拡張してある。
- 出力は `bufio.Writer` にまとめる。`fmt.Println` を N 回呼ぶと TLE の原因になる。
