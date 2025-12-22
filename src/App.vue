<template>
  <div id="app" class="min-h-screen relative overflow-hidden flex flex-col">

      <!-- 顶部导航区 -->
      <header class="fixed top-0 left-0 w-full z-40 bg-[#FDFDFD]/95 backdrop-blur-sm border-b border-gray-100 h-14">
          <nav-bar
              :current-view="view"
              @reset="resetApp"
              @open-sidebar="openSidebar"
          ></nav-bar>
      </header>

      <!-- 主内容区 -->
      <main class="flex-1 pt-14 min-h-screen relative" role="main">

          <!-- 首页视图 -->
          <transition
              enter-active-class="transition duration-700 ease-out"
              enter-from-class="opacity-0 translate-y-4"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition duration-300 ease-in"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
          >
              <home-view v-if="view === 'home'" @start="openSidebar"></home-view>
          </transition>

          <!-- 命盘视图 -->
          <transition
              enter-active-class="transition duration-1000 ease-out delay-150"
              enter-from-class="opacity-0 scale-95"
              enter-to-class="opacity-100 scale-100"
          >
              <chart-view
                  v-if="view === 'chart'"
                  :user-data="formData"
                  :full-chart-data="currentChartData"
                  @change-limit="handleLimitChange"
              ></chart-view>
          </transition>
      </main>

      <!-- 侧边栏表单 (模态对话框) -->
      <sidebar-form
          v-model:is-open="isSidebarOpen"
          v-model:form-data="formData"
          @submit="handleFormSubmit"
          @save-local="saveToLocalStorage"
      ></sidebar-form>
  </div>
</template>

<script>
import { ref, reactive, onMounted, computed } from 'vue';
import NavBar from './components/common/NavBar.vue';
import HomeView from './components/common/HomeView.vue';
import SidebarForm from './components/common/SidebarForm.vue';
import ChartView from './components/chart/ChartView.vue';
import { MOCK_FULL_CHART_DATA, EARTHLY_BRANCHES } from './constants/index.js';
import { GanZhiCalculator, AgeCalculation, SolarToLunarConverter, GanzhiStringUtils } from './lib/utils/index.js';

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
                return MOCK_FULL_CHART_DATA; // 如果没有输入数据，返回默认mock数据
            }

            // 获取时辰索引
            const timeIndex = EARTHLY_BRANCHES.findIndex(b => b.key === formData.birthTime);

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
            const age = AgeCalculation.calculateNominalAge(birthdayLunar, todayLunar, 'birthday');

            // 计算四柱
            const ganzhi = GanZhiCalculator.getGanZhi(new Date(solarBirthDate), timeIndex);
            const ganzhiStrings = GanzhiStringUtils.ganZhiResultToString(ganzhi);
            const sizhu = `${ganzhiStrings.yearly} ${ganzhiStrings.monthly} ${ganzhiStrings.daily} ${ganzhiStrings.hourly}`;

            // 获取时辰标签
            const timeLabel = EARTHLY_BRANCHES.find(b => b.key === formData.birthTime)?.label || '';

            // 返回计算后的数据
            return {
                ...MOCK_FULL_CHART_DATA,
                centerInfo: {
                    name: formData.name || '无名氏',
                    gender: formData.gender,
                    wuxing: "木三局", // 暂时保持mock
                    age: age,
                    sizhu: sizhu,
                    solarDate: solarBirthDate,
                    lunarDate: lunarDate,
                    time: timeLabel,
                    zodiac: "龙", // 暂时mock
                    constellation: "狮子座", // 暂时mock
                    lifeMaster: "武曲", // 暂时mock
                    bodyMaster: "文昌", // 暂时mock
                    lifePalace: "未", // 暂时mock
                    bodyPalace: "酉" // 暂时mock
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
