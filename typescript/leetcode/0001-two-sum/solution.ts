// https://leetcode.com/problems/two-sum/

export function twoSum(nums: number[], target: number): number[] {
  // 「値 -> その添字」を左から入れていき、相方が既に入っているかだけ見る
  const seen = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const rest = target - nums[i]!;
    const j = seen.get(rest);
    if (j !== undefined) return [j, i];
    seen.set(nums[i]!, i);
  }
  return [];
}
