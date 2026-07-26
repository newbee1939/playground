#!/bin/sh
# サンプルで実行して期待出力と比べる。使い方: ./scripts/test.sh atcoder/abc468/a [main.ts]
set -eu
cd "$(dirname "$0")/.."
dir=${1:?usage: test.sh <dir> [file.ts]}
src="$dir/${2:-main.ts}"

status=0
for input in "$dir"/tests/*.in; do
  [ -e "$input" ] || { echo "tests が空: $dir/tests" >&2; exit 1; }
  name=$(basename "$input" .in)
  expected=$(cat "${input%.in}.out")

  if ! actual=$(node "$src" < "$input"); then
    echo "RE $name"
    status=1
  elif [ "$actual" = "$expected" ]; then
    echo "AC $name"
  else
    echo "WA $name"
    printf 'expected:\n%s\nactual:\n%s\n' "$expected" "$actual"
    status=1
  fi
done

exit $status
