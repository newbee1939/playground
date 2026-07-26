#!/bin/sh
# サンプルで実行して期待出力と比べる。使い方: ./scripts/test.sh atcoder/abc468/a [main.ts]
set -eu
cd "$(dirname "$0")/.."

usage() {
  cat <<'EOS'
usage: ./scripts/test.sh <dir> [file.ts]

<dir>/tests/*.in を順に流し込み、対応する .out と比べて AC / WA / RE を出す。
1 つでも落ちたら終了コード 1 を返す。第 2 引数を省くと main.ts を実行する。

例:
  ./scripts/test.sh atcoder/abc468/a             main.ts を全サンプルで試す
  ./scripts/test.sh atcoder/abc468/a answer.ts   コンテスト後に書き直した方を試す

中身が空の .in は SKIP する（new.sh が作ったサンプルの空き枠）。
提出前の型チェックは npm run check。
EOS
}

case "${1:-}" in
-h | --help)
  usage
  exit 0
  ;;
esac

[ $# -ge 1 ] || {
  usage >&2
  exit 1
}

dir=$1
src="$dir/${2:-main.ts}"
[ -f "$src" ] || {
  echo "見つからない: $src" >&2
  exit 1
}

status=0
ran=0
for input in "$dir"/tests/*.in; do
  [ -e "$input" ] || {
    echo "tests が空: $dir/tests" >&2
    exit 1
  }
  name=$(basename "$input" .in)

  # サンプルを貼っていない空き枠は飛ばす
  [ -s "$input" ] || continue
  expected_file="${input%.in}.out"
  [ -f "$expected_file" ] || {
    echo "対応する .out がない: $expected_file" >&2
    status=1
    continue
  }

  ran=$((ran + 1))
  expected=$(cat "$expected_file")
  if ! actual=$(node "$src" <"$input"); then
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

[ "$ran" -gt 0 ] || {
  echo "流せるサンプルがない: $dir/tests/1.in と 1.out に入力例と出力例を貼る" >&2
  exit 1
}

exit $status
