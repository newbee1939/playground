import { readFileSync } from "node:fs";

// 標準入力をまとめて読み、空白・改行区切りのトークン列にする。
// fd 0 を直接読むので /dev/stdin が無い環境でも動く。
const tokens = readFileSync(0, "utf8").trim().split(/\s+/);
let cursor = 0;
const next = (): string => tokens[cursor++];
const nextNum = (): number => Number(next());
const nextBigInt = (): bigint => BigInt(next());
const nextNums = (n: number): number[] => Array.from({ length: n }, nextNum);

// 出力はバッファに溜めて最後に 1 回だけ書き出す（console.log の連打は遅い）。
const outputs: string[] = [];
const print = (value: unknown): void => {
  outputs.push(String(value));
};

function main(): void {
  // 例: practice contest A —— 入力 "a", "b c", "s" に対して "a+b+c s" を出力する
  const a = nextNum();
  const b = nextNum();
  const c = nextNum();
  const s = next();
  print(`${a + b + c} ${s}`);
}

main();
process.stdout.write(outputs.join("\n") + "\n");
