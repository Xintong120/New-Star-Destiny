/**
 * 博士十二神模块 - 博士十二神星曜位置计算
 *
 * 职责：
 * - 根据年干和性别计算博士十二神的位置
 * - 从禄存起，阳男阴女顺行，阴男阳女逆行
 * - 安博士、力士、青龙、小耗、将军、奏书、飞廉、喜神、病符、大耗、伏兵、官府
 * - 提供函数式实现
 *
 * 算法说明：
 * 1. 先计算年干的禄存位置（依赖 LuYangTuoMa 模块的 GetLuYangTuoMaIndex 函数）
 * 2. 根据性别和年支的阴阳属性决定顺逆行
 * 3. 从禄存位置开始安排十二神
 *
 * @version 2.0.0
 */

import { GetLuYangTuoMaIndex } from '../minor/LuYangTuoMa.js';

/**
 * 修正索引到指定范围内
 * @param index 当前索引
 * @param max 最大循环数，默认为12
 * @returns 处理后的索引
 */
const FixIndex = (index: number, max: number = 12): number => {
  if (index < 0) {
    return FixIndex(index + max, max);
  }
  if (index > max - 1) {
    return FixIndex(index - max, max);
  }
  // 处理 -0 的情况
  return 1 / index === -Infinity ? 0 : index;
};

/**
 * 天干名称类型
 */
export type HeavenlyStemName = '甲' | '乙' | '丙' | '丁' | '戊' | '己' | '庚' | '辛' | '壬' | '癸';

/**
 * 地支名称类型
 */
export type EarthlyBranchName = '子' | '丑' | '寅' | '卯' | '辰' | '巳' | '午' | '未' | '申' | '酉' | '戌' | '亥';

/**
 * 性别名称类型
 */
export type GenderName = '男' | '女';

// ==================== 类型定义 ====================

/**
 * 博士十二神位置结果
 */
export interface DoctorTwelvePosition {
  /** 博士索引 */
  boshiIndex: number;
  /** 力士索引 */
  lishiIndex: number;
  /** 青龙索引 */
  qinglongIndex: number;
  /** 小耗索引 */
  xiaohaoIndex: number;
  /** 将军索引 */
  jiangjunIndex: number;
  /** 奏书索引 */
  zhoushuIndex: number;
  /** 飞廉索引 */
  feiliianIndex: number;
  /** 喜神索引 */
  xishenIndex: number;
  /** 病符索引 */
  bingfuIndex: number;
  /** 大耗索引 */
  dahaoIndex: number;
  /** 伏兵索引 */
  fubingIndex: number;
  /** 官府索引 */
  guanfuIndex: number;
}

/**
 * 博士十二神名称
 */
export type DoctorTwelveName =
  | '博士' | '力士' | '青龙' | '小耗' | '将军' | '奏书'
  | '飞廉' | '喜神' | '病符' | '大耗' | '伏兵' | '官府';

/**
 * 天干键值类型
 */
type HeavenlyStemKey = 'jia' | 'yi' | 'bing' | 'ding' | 'wu' | 'ji' | 'geng' | 'xin' | 'ren' | 'gui';

/**
 * 地支键值类型
 */
type EarthlyBranchKey = 'zi' | 'chou' | 'yin' | 'mao' | 'chen' | 'si' | 'wu' | 'wei' | 'shen' | 'you' | 'xu' | 'hai';

/**
 * 性别键值类型
 */
type GenderKey = 'male' | 'female';

// ==================== 映射表 ====================

/**
 * 地支阴阳属性映射
 */
const EarthlyBranchYinYang: Record<string, 'yang' | 'yin'> = {
  '子': 'yang',   // 子阳
  '丑': 'yin',    // 丑阴
  '寅': 'yang',   // 寅阳
  '卯': 'yin',    // 卯阴
  '辰': 'yang',   // 辰阳
  '巳': 'yin',    // 巳阴
  '午': 'yang',   // 午阳
  '未': 'yin',    // 未阴
  '申': 'yang',   // 申阳
  '酉': 'yin',    // 酉阴
  '戌': 'yang',   // 戌阳
  '亥': 'yin'     // 亥阴
};

/**
 * 性别阴阳属性映射
 */
const GenderYinYang: Record<GenderKey, 'yang' | 'yin'> = {
  male: 'yang',   // 男为阳
  female: 'yin'   // 女为阴
};

/**
 * 性别名称到键值的映射
 */
const GenderNameToKey: Record<GenderName, GenderKey> = {
  '男': 'male',
  '女': 'female'
};

/**
 * 博士十二神顺序（从博士开始）
 */
export const DoctorTwelveOrder: DoctorTwelveName[] = [
  '博士', '力士', '青龙', '小耗', '将军', '奏书',
  '飞廉', '喜神', '病符', '大耗', '伏兵', '官府'
];

// ==================== 核心计算函数 ====================

/**
 * 获取博士十二神位置索引 - 函数式版本
 *
 * 算法说明：
 * 1. 从禄存起，阳男阴女顺行，阴男阳女逆行
 * 2. 安博士、力士、青龙、小耗、将军、奏书、飞廉、喜神、病符、大耗、伏兵、官府
 *
 * @param heavenlyStemName 年干名称
 * @param earthlyBranchName 年支名称
 * @param genderName 性别名称
 * @returns 博士十二神位置索引
 */
export const GetDoctorTwelveIndex = (
  heavenlyStemName: HeavenlyStemName,
  earthlyBranchName: EarthlyBranchName,
  genderName: GenderName
): DoctorTwelvePosition => {
  // 步骤1：获取禄存位置（使用 LuYangTuoMa 模块的标准实现）
  const { luIndex } = GetLuYangTuoMaIndex(heavenlyStemName, earthlyBranchName);

  // 步骤2：判断顺逆行
  // 阳男阴女顺行，阴男阳女逆行
  const genderYinYang = GenderYinYang[GenderNameToKey[genderName]];
  const branchYinYang = EarthlyBranchYinYang[earthlyBranchName];
  const isForward = genderYinYang === branchYinYang;

  // 步骤4：计算各神位置
  const positions: number[] = [];
  for (let i = 0; i < 12; i++) {
    if (isForward) {
      positions.push(FixIndex(luIndex + i));
    } else {
      positions.push(FixIndex(luIndex - i));
    }
  }

  return {
    boshiIndex: positions[0],    // 博士
    lishiIndex: positions[1],    // 力士
    qinglongIndex: positions[2], // 青龙
    xiaohaoIndex: positions[3],  // 小耗
    jiangjunIndex: positions[4], // 将军
    zhoushuIndex: positions[5],  // 奏书
    feiliianIndex: positions[6], // 飞廉
    xishenIndex: positions[7],   // 喜神
    bingfuIndex: positions[8],   // 病符
    dahaoIndex: positions[9],    // 大耗
    fubingIndex: positions[10],  // 伏兵
    guanfuIndex: positions[11]   // 官府
  };
};

/**
 * 获取博士十二神数组形式 - 从寅宫开始的12个位置
 *
 * @param heavenlyStemName 年干名称
 * @param earthlyBranchName 年支名称
 * @param genderName 性别名称
 * @returns 从寅宫(索引0)开始的博士十二神数组，空位置为null
 */
export const GetDoctorTwelveArray = (
  heavenlyStemName: HeavenlyStemName,
  earthlyBranchName: EarthlyBranchName,
  genderName: GenderName
): (DoctorTwelveName | null)[] => {
  const positions = GetDoctorTwelveIndex(heavenlyStemName, earthlyBranchName, genderName);
  const result: (DoctorTwelveName | null)[] = new Array(12).fill(null);

  // 将各神安排到对应位置
  result[positions.boshiIndex] = '博士';
  result[positions.lishiIndex] = '力士';
  result[positions.qinglongIndex] = '青龙';
  result[positions.xiaohaoIndex] = '小耗';
  result[positions.jiangjunIndex] = '将军';
  result[positions.zhoushuIndex] = '奏书';
  result[positions.feiliianIndex] = '飞廉';
  result[positions.xishenIndex] = '喜神';
  result[positions.bingfuIndex] = '病符';
  result[positions.dahaoIndex] = '大耗';
  result[positions.fubingIndex] = '伏兵';
  result[positions.guanfuIndex] = '官府';

  return result;
};

/**
 * 获取算法描述
 *
 * @returns 博士十二神算法说明
 */
export const GetDoctorTwelveAlgorithmDescription = (): string => {
  return `
博士十二神算法说明：
1. 从禄存起：先根据年干确定禄存位置
   - 甲禄到寅宫(2)，乙禄居卯府(3)，丙戊禄在巳(5)
   - 丁己禄在午(6)，庚禄居申位(8)，辛禄居酉乡(9)
   - 壬禄在亥宫(11)，癸禄居子位(0)

2. 顺逆行规则：
   - 阳男阴女顺行：男性+阳支 或 女性+阴支
   - 阴男阳女逆行：男性+阴支 或 女性+阳支

3. 十二神顺序：
   博士 → 力士 → 青龙 → 小耗 → 将军 → 奏书 →
   飞廉 → 喜神 → 病符 → 大耗 → 伏兵 → 官府
  `.trim();
};
