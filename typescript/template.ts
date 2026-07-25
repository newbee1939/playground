import { readFileSync } from "node:fs";

// 標準入力をまとめて読み、空白・改行区切りのトークンとして順に消費する
const tokens = readFileSync(0, "utf8").trim().split(/\s+/);
let cursor = 0;
const next = (): string => tokens[cursor++];
const nextNum = (): number => Number(next());

// 出力は溜めて最後に 1 回だけ書き出す（console.log の連打は遅い）
const outputs: string[] = [];
const print = (value: unknown): void => {
  outputs.push(String(value));
};

// 例: practice contest A —— 入力 "1", "2 3", "test" に対して "6 test" を出力する
const a = nextNum();
const b = nextNum();
const c = nextNum();
const s = next();
print(`${a + b + c} ${s}`);

process.stdout.write(outputs.join("\n") + "\n");
