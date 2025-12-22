/**
 * 童限计算工具
 */
export class ChildhoodLimit {
  /**
   * 获取童限宫位
   * 一命二财三疾厄，四岁夫妻五福德，六岁事业为童限
   *
   * @param nominalAge 虚岁 (1-6)
   * @returns 童限宫位名称
   */
  static getChildhoodPalace(nominalAge: number): string {
    const childPalaces = ['', '命宫', '财帛宫', '疾厄宫', '夫妻宫', '福德宫', '官禄宫'];

    if (nominalAge >= 1 && nominalAge <= 6) {
      return childPalaces[nominalAge];
    }

    throw new Error(`童限年龄范围错误，应为1-6岁，实际为${nominalAge}岁`);
  }
}
