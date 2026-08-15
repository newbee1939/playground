#!/bin/sh
# LeetCode の問題用ディレクトリを作る。使い方: ./scripts/new-leetcode.sh 1 two-sum
set -eu
cd "$(dirname "$0")/.."

usage() {
  cat <<'EOS'
usage: ./scripts/new-leetcode.sh <id> <slug>

<id> は問題番号、<slug> は URL の末尾（https://leetcode.com/problems/<slug>/）。
leetcode/<4 桁に 0 埋めした id>-<slug>/ に 3 つのファイルを作る。

  solution.ts        解答。LeetCode に貼るのはこのファイルの中身
  solution.test.ts   サンプルをアサーションで書く（node:test）
  README.md          方針・計算量・学びを書き溜める

例:
  ./scripts/new-leetcode.sh 1 two-sum   -> leetcode/0001-two-sum/

既にあるファイルは上書きしない。テストの実行は npm test。
EOS
}

case "${1:-}" in
-h | --help)
  usage
  exit 0
  ;;
esac

[ $# -eq 2 ] || {
  usage >&2
  exit 1
}

id=$(printf '%04d' "$1")
slug=$2
dir="leetcode/$id-$slug"
url="https://leetcode.com/problems/$slug/"
mkdir -p "$dir"

# 既にあるファイルは上書きしない
[ -e "$dir/solution.ts" ] || cat >"$dir/solution.ts" <<EOS
// $url

// TODO: LeetCode の関数シグネチャに合わせて名前・引数・戻り値を書き換える
export function solve(nums: number[]): number {
  return nums.length;
}
EOS

[ -e "$dir/solution.test.ts" ] || cat >"$dir/solution.test.ts" <<'EOS'
import assert from 'node:assert/strict';
import { test } from 'node:test';

import { solve } from './solution.ts';

// 問題ページの Example をそのままケースにする
test('example 1', () => {
  assert.deepEqual(solve([]), 0);
});
EOS

[ -e "$dir/README.md" ] || cat >"$dir/README.md" <<EOS
# $1. $slug

$url

## 方針

## 計算量

- 時間: O()
- 空間: O()

## 学び
EOS

echo "created: $dir"
