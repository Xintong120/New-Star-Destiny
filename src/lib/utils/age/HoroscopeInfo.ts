import { DecadalLimit } from './DecadalLimit';
import { AgeLimit } from './AgeLimit';
import { ChildhoodLimit } from './ChildhoodLimit';
import { DecadalMethod, HoroscopeInfo as HoroscopeInfoType } from '../../../types/age/AgeTypes';

/**
 * 运限信息整合工具
 */
export class HoroscopeInfo {
  /**
   * 获取年龄对应的运限信息
   *
   * @param birthYearBranch 出生年地支
   * @param gender 性别
   * @param nominalAge 虚岁
   * @param method 大限计算方法
   * @returns 运限信息
   */
  static getHoroscopeInfo(
    birthYearBranch: string,
    gender: '男' | '女',
    nominalAge: number,
    method: DecadalMethod = 1
  ): HoroscopeInfoType {
    const isChildhood = DecadalLimit.isInChildhood(birthYearBranch, gender, nominalAge, method);
    const decadalIndex = isChildhood ? -1 : DecadalLimit.getDecadalPalaceIndex(birthYearBranch, gender, nominalAge, method);
    const ageIndex = AgeLimit.getAgePalaceIndex(birthYearBranch, gender, nominalAge);

    let decadalName = '大限';
    let childPalace: string | undefined;

    if (isChildhood) {
      decadalName = '童限';
      childPalace = ChildhoodLimit.getChildhoodPalace(nominalAge);
    }

    return {
      isChildhood,
      decadalIndex,
      ageIndex,
      decadalName,
      childPalace
    };
  }
}
