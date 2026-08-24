#!/bin/sh
# 制約の最大値で実行時間を測る。使い方: ./scripts/bench.sh atcoder/abc472/c [main.ts]
set -eu
cd "$(dirname "$0")/.."

# AtCoder の実行時間制限（秒）。3 秒の問題なら LIMIT=3 を頭に付ける
limit=${LIMIT:-2}

usage() {
  cat <<'EOS'
usage: ./scripts/bench.sh <dir> [file.ts]

<dir>/gen.ts で最悪ケースを作り、それを流して実行時間を測る。
制限時間を超えたら終了コード 1 を返す。第 2 引数を省くと main.ts を実行する。

サンプルは小さいので TLE は test.sh では見えない。提出前にこれを 1 回叩く。

例:
  ./scripts/bench.sh atcoder/abc472/c             main.ts を最悪ケースで測る
  ./scripts/bench.sh atcoder/abc472/c answer.ts   書き直した方を測る
  LIMIT=3 ./scripts/bench.sh atcoder/abc472/c     実行時間制限が 3 秒の問題

gen.ts が無ければ雛形を作るので、問題の制約を見て最大値に書き換える。
N を 2 倍にして時間が 4 倍になるなら O(N^2)。書き直さないと本番で落ちる。

手元とジャッジのマシンは速度が違うので、結果は目安。制限の半分を超えたら赤信号と思う。
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

gen="$dir/gen.ts"
[ -f "$gen" ] || {
  cat >"$gen" <<'EOS'
// 最悪ケース（制約の最大値）を標準出力に吐く。./scripts/bench.sh から呼ばれる。
// 問題の制約を見て、N やクエリ数・値の上限を最大に書き換える。
const n = 200000;
const a = Array.from({ length: n }, () => 1 + Math.floor(Math.random() * 1e9));

console.log(String(n));
console.log(a.join(' '));
EOS
  echo "作った: $gen" >&2
  echo "問題の制約を見て最大値に書き換えてから、もう一度同じコマンドを叩く。" >&2
  exit 1
}

input="${TMPDIR:-/tmp}/bench.$$.in"
trap 'rm -f "$input"' EXIT INT TERM
node "$gen" >"$input"
echo "入力: $(wc -c <"$input" | tr -d ' ') バイト ($gen)"

# date に %N が無い環境があるので node で時刻を取る。2 回目の node 起動ぶん
# （数十ミリ秒）だけ多めに出るが、安全側に振れるのでそのままにしている
now() { node -e 'process.stdout.write(String(Date.now()))'; }

start=$(now)
status=0
node "$src" <"$input" >/dev/null || status=$?
end=$(now)

[ "$status" -eq 0 ] || {
  echo "実行に失敗した (exit $status)" >&2
  exit 1
}

awk -v s="$start" -v e="$end" -v l="$limit" -v src="$src" 'BEGIN {
  t = (e - s) / 1000
  printf "%s: %.2f 秒 / 制限 %s 秒\n", src, t, l
  if (t > l)     { print "TLE。計算量から見直す（N を 2 倍にして 4 倍なら O(N^2)）"; exit 1 }
  if (t > l / 2) { print "ギリギリ。ジャッジの方が遅いことがあるので詰めておきたい"; exit 1 }
  print "OK"
}'
