export interface PersonInfo {
  // 原始输入信息
  name: string;
  gender: 'male' | 'female';
  calendarType: 'solar' | 'lunar';
  birthDate: string;        // YYYY-MM-DD
  birthTime: string;        // 时辰key，如 'chou'
  
  // 计算后的衍生信息
  wuxing?: string;          // 五行局
  sizhu?: string;           // 四柱
  zodiac?: string;          // 生肖
  constellation?: string;   // 星座
  lifeMaster?: string;      // 命主
  bodyMaster?: string;      // 身主
  // ... 其他计算结果
}
