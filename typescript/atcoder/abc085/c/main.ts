import * as fs from 'fs';

function main() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  // n枚
  let n = Number(input[0]);
  // y円
  let y = Number(input[1]);

  // ぞれぞれの札を何枚持っているかを管理するmap
  const moneyMap = new Map();

  while (y > 0 && n > 0) {
    const a = y / 10000;
    const b = y / 5000;
    const c = y / 1000;

    if (y / 10000 > 0) {
      y = y - Math.floor(a) * 10000;
      const tmp = moneyMap.get("10000");
      !tmp ? moneyMap.set("10000", tmp+1) : moneyMap.set("10000", 1);
      n--;
    } else if (y / 5000 > 0) {
      y = y - Math.floor(b) * 5000;
      const tmp = moneyMap.get("5000");
      !tmp ? moneyMap.set("5000", tmp+1) : moneyMap.set("5000", 1);
      n--;
    } else if (y / 1000 > 0) {
      y = y - Math.floor(c) * 1000;
      const tmp = moneyMap.get("1000");
      !tmp ? moneyMap.set("1000", tmp+1) : moneyMap.set("1000", 1);
      n--;
    } else {
      // どの値でも割り切れなくなったら終了
      break;
    }
  }

  if (y === 0){
    console.log(`${moneyMap.get("10000")} ${moneyMap.get("5000")} moneyMap.get("1000")`);
  } else {
    console.log("-1 -1 -1");
  }
}

main();
