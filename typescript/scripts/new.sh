#!/bin/sh
# 問題用のディレクトリをまとめて作る。使い方: ./scripts/new.sh atcoder/abc468 a b c
set -eu
cd "$(dirname "$0")/.."

# 最初から用意するサンプルの枠の数
samples=4

usage() {
  cat <<'EOS'
usage: ./scripts/new.sh <parent> <name>...

第 1 引数が親ディレクトリ、残りが問題名。並べた分だけまとめて作る。
既にあるファイルは上書きしないので、後から問題を足したいときは同じコマンドでよい。

問題ごとに作るもの:
  <parent>/<name>/main.ts            提出するコード（template.ts のコピー）
  <parent>/<name>/answer.ts          コンテスト後に正解を書き直す用（同上）
  <parent>/<name>/tests/{1,2,3,4}.in   サンプル入力
  <parent>/<name>/tests/{1,2,3,4}.out  サンプル出力

例:
  ./scripts/new.sh atcoder/abc468 a b c d e f g   AtCoder のコンテスト
  ./scripts/new.sh practice fizzbuzz              企業のコーディング試験など

サンプルが 5 つ以上ある問題は tests/5.in と 5.out を手で足す。
中身が空の .in は test.sh が読み飛ばすので、余った枠は放っておいてよい。
EOS
}

case "${1:-}" in
-h | --help)
  usage
  exit 0
  ;;
esac

[ $# -ge 2 ] || {
  usage >&2
  exit 1
}

parent=$1
shift
for name in "$@"; do
  dir="$parent/$name"
  mkdir -p "$dir/tests"
  # 既にあるファイルは上書きしない
  [ -e "$dir/main.ts" ] || cp template.ts "$dir/main.ts"
  [ -e "$dir/answer.ts" ] || cp template.ts "$dir/answer.ts"
  i=1
  while [ "$i" -le "$samples" ]; do
    [ -e "$dir/tests/$i.in" ] || : >"$dir/tests/$i.in"
    [ -e "$dir/tests/$i.out" ] || : >"$dir/tests/$i.out"
    i=$((i + 1))
  done
  echo "created: $dir"
done
