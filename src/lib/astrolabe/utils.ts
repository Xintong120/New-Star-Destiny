/**
 * 紫微斗数计算工具函数
 */

import { HeavenlyStemNames, EarthlyBranchNames } from '../utils/ganzhi/GanzhiConstants';

// ==================== 工具函数 ====================

/**
 * 修正索引到指定范围内（循环）
 * @param index 原始索引
 * @param max 最大值
 * @returns 修正后的索引
 */
export function fixIndex(index: number, max: number = 12): number {
  return ((index % max) + max) % max;
}

// ==================== 常量定义 ====================

/**
 * 天干数组
 */
export const HEAVENLY_STEMS = HeavenlyStemNames;

/**
 * 地支数组
 */
export const EARTHLY_BRANCHES = EarthlyBranchNames;

/**
 * 宫位名称数组（从命宫开始）
 */
export const PALACE_NAMES = [
  '命宫', '父母', '福德', '田宅', '官禄', '仆役',
  '迁移', '疾厄', '财帛', '子女', '夫妻', '兄弟'
];

/**
 * 地支对应命主
 */
export const EARTHLY_BRANCH_TO_SOUL: Record<string, string> = {
  '子': '贪狼', '丑': '巨门', '寅': '禄存', '卯': '文曲',
  '辰': '廉贞', '巳': '武曲', '午': '破军', '未': '武曲',
  '申': '廉贞', '酉': '文曲', '戌': '禄存', '亥': '巨门'
};

/**
 * 地支对应身主
 */
export const EARTHLY_BRANCH_TO_BODY: Record<string, string> = {
  '子': '火星', '丑': '天相', '寅': '天梁', '卯': '天同',
  '辰': '文昌', '巳': '天机', '午': '火星', '未': '天相',
  '申': '天梁', '酉': '天同', '戌': '文昌', '亥': '天机'
};

/**
 * 五虎遁规则（年上起月法）
 * 甲己之年丙作首，乙庚之岁戊为头
 * 丙辛必定寻庚起，丁壬壬位顺行流
 * 若问戊癸何方发，甲寅之上好追求
 */
export const TIGER_RULE: Record<string, string> = {
  '甲': '丙', '己': '丙',
  '乙': '戊', '庚': '戊',
  '丙': '庚', '辛': '庚',
  '丁': '壬', '壬': '壬',
  '戊': '甲', '癸': '甲'
};

/**
 * 解析五行局字符串，提取数字
 *
 * @param fiveElementsClass 五行局字符串（如"火六局"）
 * @returns 五行局数字（2/3/4/5/6）
 */
export function parseFiveElementsClass(fiveElementsClass: string): number {
  // 先尝试匹配阿拉伯数字
  const arabicMatch = fiveElementsClass.match(/\d+/);
  if (arabicMatch) {
    return parseInt(arabicMatch[0]);
  }

  // 匹配中文数字
  const chineseNumbers: Record<string, number> = {
    '二': 2, '两': 2,
    '三': 3,
    '四': 4,
    '五': 5,
    '六': 6,
  };

  for (const [chinese, number] of Object.entries(chineseNumbers)) {
    if (fiveElementsClass.includes(chinese)) {
      return number;
    }
  }

  return 0;
}

/**
 * 获取地支的阴阳属性
 *
 * @param earthlyBranch 地支名称
 * @returns 阴阳属性
 */
export function getYinYangOfEarthlyBranch(earthlyBranch: string): '阴' | '阳' {
  const yangBranches = ['子', '寅', '辰', '午', '申', '戌'];
  return yangBranches.includes(earthlyBranch) ? '阳' : '阴';
}

/**
 * 获取地支的索引（从子宫开始，子=0）
 *
 * @param earthlyBranch 地支名称
 * @returns 地支索引（0-11）
 */
export function getEarthlyBranchIndex(earthlyBranch: string): number {
  const branches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
  return branches.indexOf(earthlyBranch);
}