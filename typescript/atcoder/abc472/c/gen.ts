// 最悪ケース（制約の最大値）を標準出力に吐く。./scripts/bench.sh から呼ばれる。
// N = M にすると直近 M 日の窓が最大まで広がり、窓をなめ直す実装が一番遅くなる。
const n = 200000;
const m = 200000;
const k = 10 ** 15;
const a = Array.from({ length: n }, () => 1 + Math.floor(Math.random() * 1e9));

console.log(`${n} ${m} ${k}`);
console.log(a.join(' '));
