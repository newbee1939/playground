#!/bin/sh
# 問題用のディレクトリを作る。使い方: ./scripts/new.sh atcoder/abc468/a
set -eu
cd "$(dirname "$0")/.."

[ $# -eq 1 ] || { echo "usage: $0 <dir>   e.g. atcoder/abc468/a" >&2; exit 1; }
dir=$1

mkdir -p "$dir/tests"
# 既にあるファイルは上書きしない
[ -e "$dir/main.ts" ] || cp template.ts "$dir/main.ts"
[ -e "$dir/tests/1.in" ] || : > "$dir/tests/1.in"
[ -e "$dir/tests/1.out" ] || : > "$dir/tests/1.out"

echo "created: $dir"
