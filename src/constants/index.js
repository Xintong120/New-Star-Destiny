const EarthlyBranches = [
  { key: 'zi', label: '子时 (23:00-01:00)' },
  { key: 'chou', label: '丑时 (01:00-03:00)' },
  { key: 'yin', label: '寅时 (03:00-05:00)' },
  { key: 'mao', label: '卯时 (05:00-07:00)' },
  { key: 'chen', label: '辰时 (07:00-09:00)' },
  { key: 'si', label: '巳时 (09:00-11:00)' },
  { key: 'wu', label: '午时 (11:00-13:00)' },
  { key: 'wei', label: '未时 (13:00-15:00)' },
  { key: 'shen', label: '申时 (15:00-17:00)' },
  { key: 'you', label: '酉时 (17:00-19:00)' },
  { key: 'xu', label: '戌时 (19:00-21:00)' },
  { key: 'hai', label: '亥时 (21:00-23:00)' },
];

const MockFullChartData = {
    centerInfo: {
        name: "张三",
        gender: "male",
        wuxing: "木三局",
        age: 26,
        sizhu: "庚辰 甲申 丙午 己丑",
        solarDate: "2000-08-16",
        lunarDate: "二〇〇〇年七月十七",
        time: "丑时(01:00~03:00)",
        zodiac: "龙",
        constellation: "狮子座",
        lifeMaster: "武曲",
        bodyMaster: "文昌",
        lifePalace: "未",
        bodyPalace: "酉"
    },
    palaces: [
        {
            id: 'zi', name: '疾厄', stem: '戊', branch: '子',
            majorStars: [],
            minorStars: [{name:'火星', sihua:''}, {name:'天哭'}],
            miscStars: ['天德', '解神'],
            gods: { changSheng: '绝', boShi: '病符', jiangQian: '灾煞', suiQian: '岁煞' },
            ageRange: '64-73'
        },
        {
            id: 'chou', name: '财帛', stem: '己', branch: '丑',
            majorStars: [{name:'太阴', brightness:'庙', sihua:'科'}],
            minorStars: [{name:'天喜'}],
            miscStars: ['三台', '八座'],
            gods: { changSheng: '墓', boShi: '大耗', jiangQian: '天煞', suiQian: '咸池' },
            ageRange: '54-63'
        },
        { id: 'yin', name: '子女', stem: '庚', branch: '寅', majorStars: [{name:'廉贞', brightness:'利', sihua:'忌'}], minorStars: [{name:'文昌', sihua:'科'}], miscStars: [], gods: { changSheng: '死', boShi: '伏兵', jiangQian: '指背', suiQian: '月煞' }, ageRange: '44-53' },
        { id: 'mao', name: '夫妻', stem: '辛', branch: '卯', majorStars: [], minorStars: [{name:'禄存'}, {name:'天官'}], miscStars: ['台辅'], gods: { changSheng: '病', boShi: '官府', jiangQian: '咸池', suiQian: '亡神' }, ageRange: '34-43' },
        { id: 'chen', name: '兄弟', stem: '壬', branch: '辰', majorStars: [{name:'破军', brightness:'旺', sihua:'权'}], minorStars: [{name:'陀罗'}], miscStars: [], gods: { changSheng: '衰', boShi: '博士', jiangQian: '月煞', suiQian: '将星' }, ageRange: '24-33' },
        { id: 'si', name: '命宫', stem: '辛', branch: '巳', majorStars: [{name:'紫微', brightness:'庙', sihua:'权'}, {name:'七杀', brightness:'平'}], minorStars: [{name:'地劫'}, {name:'天马'}], miscStars: ['天贵'], gods: { changSheng: '帝旺', boShi: '力士', jiangQian: '亡神', suiQian: '攀鞍' }, ageRange: '14-23' },
        { id: 'wu', name: '父母', stem: '壬', branch: '午', majorStars: [{name:'天机', brightness:'陷'}], minorStars: [{name:'擎羊'}], miscStars: [], gods: { changSheng: '临官', boShi: '青龙', jiangQian: '将星', suiQian: '岁建' }, ageRange: '4-13' },
        { id: 'wei', name: '福德', stem: '癸', branch: '未', majorStars: [], minorStars: [{name:'左辅', sihua:'科'}, {name:'右弼'}], miscStars: [], gods: { changSheng: '冠带', boShi: '小耗', jiangQian: '攀鞍', suiQian: '晦气' }, ageRange: '114-123' },
        { id: 'shen', name: '田宅', stem: '甲', branch: '申', majorStars: [{name:'太阳', brightness:'旺', sihua:'忌'}, {name:'巨门', brightness:'庙'}], minorStars: [], miscStars: ['凤阁'], gods: { changSheng: '沐浴', boShi: '将军', jiangQian: '岁建', suiQian: '丧门' }, ageRange: '104-113' },
        { id: 'you', name: '官禄', stem: '乙', branch: '酉', majorStars: [{name:'武曲', brightness:'庙'}, {name:'贪狼', brightness:'庙', sihua:'禄'}], minorStars: [{name:'文曲'}], miscStars: [], gods: { changSheng: '长生', boShi: '奏书', jiangQian: '晦气', suiQian: '贯索' }, ageRange: '94-103' },
        { id: 'xu', name: '奴仆', stem: '丙', branch: '戌', majorStars: [{name:'天同', brightness:'平', sihua:'禄'}], minorStars: [{name:'红鸾'}], miscStars: [], gods: { changSheng: '养', boShi: '飞廉', jiangQian: '丧门', suiQian: '官符' }, ageRange: '84-93' },
        { id: 'hai', name: '迁移', stem: '丁', branch: '亥', majorStars: [{name:'天府', brightness:'得'}], minorStars: [{name:'天魁'}], miscStars: [], gods: { changSheng: '胎', boShi: '喜神', jiangQian: '贯索', suiQian: '小耗' }, ageRange: '74-83' },
    ]
};

export { EarthlyBranches, MockFullChartData };
