<template>
    <div id="app" class="min-h-screen relative overflow-hidden flex flex-col">

        <!-- 顶部导航区 -->
        <header class="fixed top-0 left-0 w-full z-40 bg-[#FDFDFD]/95 backdrop-blur-sm border-b border-gray-100 h-14">
            <nav-bar :current-view="view" @reset="resetApp" @open-sidebar="openSidebar"></nav-bar>
        </header>

        <!-- 主内容区 -->
        <main class="flex-1 pt-14 min-h-screen relative" role="main">

            <!-- 首页视图 -->
            <transition enter-active-class="transition duration-700 ease-out" enter-from-class="opacity-0 translate-y-4"
                enter-to-class="opacity-100 translate-y-0" leave-active-class="transition duration-300 ease-in"
                leave-from-class="opacity-100" leave-to-class="opacity-0">
                <home-view v-if="view === 'home'" @start="openSidebar"></home-view>
            </transition>

            <!-- 命盘视图 -->
            <transition enter-active-class="transition duration-1000 ease-out delay-150"
                enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100">
                <chart-view v-if="view === 'chart'" :user-data="formData" :full-chart-data="currentChartData"
                    @change-limit="handleLimitChange"></chart-view>
            </transition>
        </main>

        <!-- 侧边栏表单 (模态对话框) -->
        <sidebar-form v-model:is-open="isSidebarOpen" v-model:form-data="formData" @submit="handleFormSubmit"
            @save-local="saveToLocalStorage"></sidebar-form>
    </div>
</template>

<script>
import { ref, reactive, onMounted, computed } from 'vue';
import NavBar from './components/common/NavBar.vue';
import HomeView from './components/common/HomeView.vue';
import SidebarForm from './components/common/SidebarForm.vue';
import ChartView from './components/chart/ChartView.vue';
import { MockFullChartData, EarthlyBranches } from './constants/index.js';
import { GanZhiCalculator, NominalAgeCalculator, SolarToLunarConverter, GanzhiStringUtils } from './lib/utils/index.js';
import { ConstellationCalculator, ZodiacCalculator } from './lib/utils/person_info/index.js';
import { CalculateLifePalaceIndex, CalculateBodyPalaceIndex } from './lib/astrolabe/PalacePosition.js';
import { CalculateLifePalaceGanZhi } from './lib/astrolabe/GanZhi.js';
import { CalculateTwelvePalaces } from './lib/astrolabe/palaces.js';
import { GetFiveElementsClass } from './lib/astrolabe/FiveElements.js';
import { GetSoulAndBody } from './lib/astrolabe/SoulBody.js';

export default {
    name: 'App',
    components: {
        NavBar,
        HomeView,
        SidebarForm,
        ChartView
    },
    setup() {
        const view = ref('home');
        const isSidebarOpen = ref(false);
        const formData = reactive({
            name: '',
            gender: 'male',
            calendarType: 'solar',
            birthDate: '',
            birthTime: 'zi'
        });

        const LOCAL_STORAGE_KEY = 'ziwei_user_profile';

        // 计算当前命盘数据
        const currentChartData = computed(() => {
            if (!formData.birthDate || !formData.birthTime) {
                return MockFullChartData; // 如果没有输入数据，返回默认mock数据
            }

            // 获取时辰索引
            const timeIndex = EarthlyBranches.findIndex(b => b.key === formData.birthTime);

            // 出生日期处理
            let solarBirthDate = formData.birthDate;
            if (formData.calendarType === 'lunar') {
                // 如果是农历，需要转换，但目前暂不支持，假设都是阳历
                solarBirthDate = formData.birthDate;
            }

            // 计算农历日期
            const birthdayLunar = SolarToLunarConverter.solar2lunar(solarBirthDate);
            const lunarDate = birthdayLunar.toString();

            // 计算年龄
            const todayDate = new Date().toISOString().slice(0, 10);
            const todayLunar = SolarToLunarConverter.solar2lunar(todayDate);
            const age = NominalAgeCalculator.CalculateNominalAge(birthdayLunar, todayLunar, 'birthday');

            // 计算四柱
            const ganzhi = GanZhiCalculator.getGanZhi(new Date(solarBirthDate), timeIndex);
            const ganzhiStrings = GanzhiStringUtils.ganZhiResultToString(ganzhi);
            const sizhu = `${ganzhiStrings.yearly} ${ganzhiStrings.monthly} ${ganzhiStrings.daily} ${ganzhiStrings.hourly}`;

            // 获取时辰标签
            const timeLabel = EarthlyBranches.find(b => b.key === formData.birthTime)?.label || '';

            // 计算星座和生肖
            const zodiac = ZodiacCalculator.getZodiacBySolarDate(solarBirthDate);
            const constellation = ConstellationCalculator.getConstellationBySolarDate(solarBirthDate);


            // 计算命宫和身宫位置
            const lunarMonth = birthdayLunar.lunarMonth || birthdayLunar.month || 1; // 农历月份 1-12
            const lifePalaceIndex = CalculateLifePalaceIndex(lunarMonth, timeIndex);
            const bodyPalaceIndex = CalculateBodyPalaceIndex(lunarMonth, timeIndex);

            // 地支数组：0=寅, 1=卯, ..., 11=丑
            const earthlyBranches = ['寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥', '子', '丑'];
            const lifePalace = earthlyBranches[lifePalaceIndex];
            const bodyPalace = earthlyBranches[bodyPalaceIndex];

            // 计算五行局
            const lifePalaceInfo = CalculateLifePalaceGanZhi(lifePalaceIndex, ganzhi);
            const wuxing = GetFiveElementsClass(lifePalaceInfo.heavenlyStem, lifePalaceInfo.earthlyBranch);

            // 计算真正的十二宫天干地支和主星分布
            const calculatedPalaces = CalculateTwelvePalaces(
                lifePalaceInfo,
                lifePalaceIndex,
                bodyPalaceIndex,
                birthdayLunar.lunarDay,
                wuxing,
                ganzhi.yearly[0], // 年干
                ganzhi.yearly[1], // 年支
                birthdayLunar.lunarMonth, // 农历月份
                timeIndex // 时辰索引
            );

            // 计算命主星和身主星
            const soulAndBody = GetSoulAndBody(lifePalace, ganzhi.yearly[1], bodyPalaceIndex);

            // 地支到英文key的映射
            const branchToKey = {
                '子': 'zi', '丑': 'chou', '寅': 'yin', '卯': 'mao',
                '辰': 'chen', '巳': 'si', '午': 'wu', '未': 'wei',
                '申': 'shen', '酉': 'you', '戌': 'xu', '亥': 'hai'
            };

            // 将计算的palaces转换为mock格式
            const palaces = calculatedPalaces.map((palace, index) => {
                const mockPalace = MockFullChartData.palaces.find(p => p.branch === palace.earthlyBranch);
                return {
                    id: branchToKey[palace.earthlyBranch],
                    name: palace.name,
                    stem: palace.heavenlyStem,
                    branch: palace.earthlyBranch,
                    majorStars: palace.majorStars || [],
                    minorStars: palace.minorStars || [],
                    miscStars: mockPalace ? mockPalace.miscStars : [],
                    gods: mockPalace ? mockPalace.gods : {},
                    ageRange: mockPalace ? mockPalace.ageRange : ''
                };
            });

            // 在控制台输出十二宫位天干地支信息
            console.log('=== 十二宫位天干地支计算结果 ===');
            palaces.forEach((palace, index) => {
                console.log(`${index}: ${palace.name}宫 - ${palace.stem}${palace.branch} (${palace.id})`);
            });
            console.log('================================');


            // 返回计算后的数据
            return {
                ...MockFullChartData,
                palaces,
                centerInfo: {
                    name: formData.name || '无名氏', // 用户姓名
                    gender: formData.gender, // 性别：male/female
                    wuxing: wuxing, // 五行局
                    age: age, // 虚岁年龄
                    sizhu: sizhu, // 四柱（年月日时干支）
                    solarDate: solarBirthDate, // 阳历出生日期
                    lunarDate: lunarDate, // 农历出生日期
                    time: timeLabel, // 出生时辰描述
                    zodiac: zodiac, // 生肖
                    constellation: constellation, // 星座
                    lifeMaster: soulAndBody.soul, // 命主星
                    bodyMaster: soulAndBody.body, // 身主星
                    lifePalace: lifePalace, // 命宫地支
                    bodyPalace: bodyPalace // 身宫地支
                }
            };
        });

        onMounted(() => {
            const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    Object.assign(formData, parsed);
                } catch (e) {
                    console.error(e);
                }
            }
        });

        const openSidebar = () => { isSidebarOpen.value = true; };

        const handleFormSubmit = () => {
            isSidebarOpen.value = false;
            setTimeout(() => { view.value = 'chart'; }, 300);
        };

        const saveToLocalStorage = () => {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
            alert('个人信息已保存至您的浏览器缓存');
        };

        const handleLimitChange = (type) => {
            console.log(`切换时间维度: ${type}`);
            alert(`模拟：切换到了 ${type === 'next-year' ? '下一年' : '上一年'}，排盘数据应更新`);
        };

        const resetApp = () => {
            view.value = 'home';
            isSidebarOpen.value = false;
        };

        return {
            view,
            isSidebarOpen,
            formData,
            currentChartData,
            openSidebar,
            handleFormSubmit,
            saveToLocalStorage,
            handleLimitChange,
            resetApp
        };
    }
};
</script>
