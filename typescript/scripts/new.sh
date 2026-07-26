#!/bin/sh
# 問題用のディレクトリをまとめて作る。使い方: ./scripts/new.sh atcoder/abc468 a b c
set -eu
cd "$(dirname "$0")/.."
[ $# -ge 2 ] || { echo "usage: new.sh <parent> <name>..." >&2; exit 1; }

parent=$1
shift
for name in "$@"; do
  dir="$parent/$name"
  mkdir -p "$dir/tests"
  # 既にあるファイルは上書きしない
  [ -e "$dir/main.ts" ] || cp template.ts "$dir/main.ts"
  [ -e "$dir/tests/1.in" ] || : > "$dir/tests/1.in"
  [ -e "$dir/tests/1.out" ] || : > "$dir/tests/1.out"
  echo "created: $dir"
done
