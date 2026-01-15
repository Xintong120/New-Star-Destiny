<template>
    <nav class="w-full max-w-[1200px] mb-2 flex flex-col md:flex-row gap-2 md:gap-4 items-center justify-between bg-gray-50 p-2 border border-gray-200 rounded-sm" aria-label="运限导航">

        <span class="text-xs font-bold text-gray-500 uppercase tracking-widest hidden md:inline">运限导航</span>

        <div class="flex flex-wrap justify-center gap-2 w-full md:w-auto text-xs md:text-sm">

            <!-- 大限选择 -->
            <div class="relative">
                <button class="px-2 py-1 md:px-3 bg-white border border-gray-300 hover:border-black transition-colors flex items-center gap-1 shadow-sm" aria-haspopup="true" @click="isDecadeDropdownOpen = !isDecadeDropdownOpen">
                    <span>{{ selectedDecadeIndex >= 0 ? `第${selectedDecadeIndex + 1}大限 (${currentDecade.range[0]}-${currentDecade.range[1]}) ${currentDecade.heavenlyStem}${currentDecade.earthlyBranch}` : '选择大限' }}</span>
                    <svg class="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                </button>
                <div v-show="isDecadeDropdownOpen" class="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 shadow-lg z-50">
                    <div class="p-1 flex flex-col max-h-40 overflow-y-auto">
                        <button
                            v-for="(decade, index) in decades"
                            :key="index"
                            class="text-left px-2 py-1 hover:bg-gray-100"
                            :class="{ 'font-bold bg-gray-50': index === selectedDecadeIndex }"
                            @click="selectDecade(index)"
                        >
                            第{{ index + 1 }}大限 ({{ decade.range[0] }}-{{ decade.range[1] }}) {{ decade.heavenlyStem }}{{ decade.earthlyBranch }}
                        </button>
                    </div>
                </div>
            </div>

            <!-- 流年选择 -->
            <div class="relative">
                <button class="px-2 py-1 md:px-3 bg-white border border-gray-300 hover:border-black transition-colors flex items-center gap-1 shadow-sm" :class="{ 'opacity-50 cursor-not-allowed': selectedDecadeIndex < 0 }" :disabled="selectedDecadeIndex < 0" aria-haspopup="true" @click="selectedDecadeIndex >= 0 && (isYearDropdownOpen = !isYearDropdownOpen)">
                    <span>{{ selectedYearIndex >= 0 ? `${currentYear.actualYear} ${currentYear.heavenlyStem}${currentYear.earthlyBranch}` : '选择流年' }}</span>
                    <svg class="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                </button>
                <div v-show="isYearDropdownOpen" class="absolute top-full left-0 mt-1 w-36 bg-white border border-gray-200 shadow-lg z-50 max-h-40 overflow-y-auto">
                    <div class="p-1 flex flex-col">
                        <button
                            v-for="(year, index) in years"
                            :key="index"
                            class="text-left px-2 py-1 hover:bg-gray-100 text-xs"
                            :class="{ 'font-bold bg-gray-50': index === selectedYearIndex }"
                            @click="selectedDecadeIndex >= 0 && selectYear(index)"
                        >
                            {{ year.actualYear }}年 {{ year.heavenlyStem }}{{ year.earthlyBranch }}
                        </button>
                    </div>
                </div>
            </div>

            <!-- 流月选择 -->
             <div class="flex items-center gap-1 border-l border-gray-200 pl-2">
                <label for="select-month" class="text-[0.6rem] md:text-[10px] text-gray-400" :class="{ 'opacity-50': selectedYearIndex < 0 }">流月</label>
                <select
                    id="select-month"
                    class="bg-transparent border-b border-gray-300 focus:outline-none"
                    :class="{ 'cursor-pointer': selectedYearIndex >= 0, 'cursor-not-allowed opacity-50': selectedYearIndex < 0 }"
                    :disabled="selectedYearIndex < 0"
                    :value="selectedMonthIndex"
                    @change="selectedYearIndex >= 0 && selectMonth(parseInt($event.target.value))"
                >
                    <option
                        v-for="(month, index) in months"
                        :key="index"
                        :value="index"
                    >
                        {{ month.name }}
                    </option>
                </select>
            </div>

             <!-- 流日选择 -->
             <div class="flex items-center gap-1 border-l border-gray-200 pl-2">
                <label for="select-day" class="text-[0.6rem] md:text-[10px] text-gray-400" :class="{ 'opacity-50': selectedMonthIndex < 0 }">流日</label>
                <select
                    id="select-day"
                    class="bg-transparent border-b border-gray-300 focus:outline-none"
                    :class="{ 'cursor-pointer': selectedMonthIndex >= 0, 'cursor-not-allowed opacity-50': selectedMonthIndex < 0 }"
                    :disabled="selectedMonthIndex < 0"
                    :value="selectedDayIndex"
                    @change="selectedMonthIndex >= 0 && selectDay(parseInt($event.target.value))"
                >
                    <option
                        v-for="(day, index) in days"
                        :key="index"
                        :value="index"
                    >
                        {{ day.name }}
                    </option>
                </select>
            </div>

        </div>
    </nav>
</template>

<script>
import { HoroscopeManager, HoroscopeFlowingStarsCalculator } from '../../lib/horoscope';

export default {
    name: 'TimeLimitNav',
    props: {
        astrolabe: {
            type: Object,
            required: true
        },
        currentDate: {
            type: [String, Date],
            default: () => new Date()
        }
    },
    emits: ['change', 'horoscope-change'],
    data() {
        return {
            // 大限相关
            decades: [],
            selectedDecadeIndex: -1,
            isDecadeDropdownOpen: false,

            // 流年相关
            years: [],
            selectedYearIndex: -1,
            isYearDropdownOpen: false,

            // 流月相关
            months: [],
            selectedMonthIndex: -1,

            // 流日相关
            days: [],
            selectedDayIndex: -1
        };
    },
    computed: {
        currentDecade() {
            return this.selectedDecadeIndex >= 0 ? this.decades[this.selectedDecadeIndex] : null;
        },
        currentYear() {
            return this.selectedYearIndex >= 0 ? this.years[this.selectedYearIndex] : null;
        },
        currentMonth() {
            return this.selectedMonthIndex >= 0 ? this.months[this.selectedMonthIndex] : null;
        },
        currentDay() {
            return this.selectedDayIndex >= 0 ? this.days[this.selectedDayIndex] : null;
        }
    },
    mounted() {
        this.calculateHoroscopeData();
        // 添加全局点击事件监听器，点击其他地方关闭下拉框
        document.addEventListener('click', this.handleGlobalClick);
    },
    watch: {
        astrolabe: {
            handler() {
                // 当astrolabe数据变化时重新计算运限
                this.calculateHoroscopeData();
            },
            deep: true // 深度监听对象变化
        }
    },
    beforeUnmount() {
        // 移除事件监听器
        document.removeEventListener('click', this.handleGlobalClick);
    },
    methods: {
        calculateHoroscopeData() {
            if (!this.astrolabe) return;

            try {
                // 计算大限
                this.decades = HoroscopeManager.calculateDecades(this.astrolabe);
                console.log('大限计算结果:', this.decades);

            } catch (error) {
                console.error('计算运限数据出错:', error);
            }
        },

        setCurrentDecade() {
            // 根据当前日期找到对应的大限
            const currentAge = this.calculateCurrentAge();
            const currentDecade = this.decades.find(decade =>
                currentAge >= decade.range[0] && currentAge <= decade.range[1]
            );
            if (currentDecade) {
                this.selectedDecadeIndex = this.decades.indexOf(currentDecade);
            }
        },

        calculateCurrentAge() {
            // 简化计算当前年龄
            const birthYear = new Date(this.astrolabe.solarDate).getFullYear();
            const currentYear = new Date().getFullYear();
            return currentYear - birthYear;
        },

        calculateYears() {
            if (this.selectedDecadeIndex < 0) return;

            console.log('当前选择的大限:', this.currentDecade);

            this.years = HoroscopeManager.calculateYears(this.astrolabe, this.currentDecade);
            console.log('流年计算结果:', this.years);

            // 不自动选择流年
            this.selectedYearIndex = -1;
        },

        calculateMonths() {
            if (this.selectedYearIndex < 0) return;
            this.months = HoroscopeManager.calculateMonths(this.currentYear.actualYear);
            console.log('流月计算结果:', this.months);

            // 不自动选择流月
            this.selectedMonthIndex = -1;
        },

        calculateDays() {
            if (this.selectedMonthIndex < 0) return;
            this.days = HoroscopeManager.calculateDays(this.currentYear.actualYear, this.selectedMonthIndex + 1);
            console.log('流日计算结果:', this.days);

            // 不自动选择流日
            this.selectedDayIndex = -1;
        },

        // 大限切换
        selectDecade(index) {
            this.selectedDecadeIndex = index;
            this.isDecadeDropdownOpen = false; // 选择后关闭下拉框

            // 重置下级选择
            this.years = [];
            this.months = [];
            this.days = [];
            this.selectedYearIndex = -1;
            this.selectedMonthIndex = -1;
            this.selectedDayIndex = -1;

            this.calculateYears();
            this.emitHoroscopeChange();
        },

        // 流年切换
        selectYear(index) {
            this.selectedYearIndex = index;
            this.isYearDropdownOpen = false; // 选择后关闭下拉框

            // 重置下级选择
            this.months = [];
            this.days = [];
            this.selectedMonthIndex = -1;
            this.selectedDayIndex = -1;

            this.calculateMonths();
            this.emitHoroscopeChange();
        },

        // 流月切换
        selectMonth(index) {
            this.selectedMonthIndex = index;

            // 重置下级选择
            this.days = [];
            this.selectedDayIndex = -1;

            this.calculateDays();
            this.emitHoroscopeChange();
        },

        // 流日切换
        selectDay(index) {
            this.selectedDayIndex = index;
            this.emitHoroscopeChange();
        },



        // 发出运限变化事件
        emitHoroscopeChange() {
            // 计算各级别流曜星
            const flowingStars = this.calculateFlowingStars();

            console.log('=== 发出horoscope-change事件 ===');
            console.log('传递的horoscopeData:', {
                decade: this.currentDecade,
                year: this.currentYear,
                month: this.currentMonth,
                day: this.currentDay,
                flowingStars: flowingStars
            });

            this.$emit('horoscope-change', {
                decade: this.currentDecade,
                year: this.currentYear,
                month: this.currentMonth,
                day: this.currentDay,
                flowingStars: flowingStars
            });
        },

        // 计算各级别流曜星
        calculateFlowingStars() {
            console.log('=== 开始计算流动星 ===');
            console.log('当前选择状态:', {
                decade: this.currentDecade,
                year: this.currentYear,
                month: this.currentMonth
            });

            const earthBranches = ['寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥', '子', '丑'];
            const flowingStars = {};

            // 获取命宫地支
            const lifePalaceBranch = this.getLifePalaceBranch();

            earthBranches.forEach((branch, palaceIndex) => {
                flowingStars[palaceIndex] = [];

                // 大限流曜星 (绿色)
                if (this.currentDecade) {
                    const decadalStars = HoroscopeFlowingStarsCalculator.calculateDecadalFlowingStars(
                        this.currentDecade.heavenlyStem,
                        branch,
                        lifePalaceBranch
                    );
                    console.log(`大限流动星: 宫位${branch}(索引${palaceIndex}), 天干${this.currentDecade.heavenlyStem}, 命宫${lifePalaceBranch} ->`, decadalStars);
                    flowingStars[palaceIndex].push(...decadalStars);
                }

                // 流年流曜星 (蓝色)
                if (this.currentYear) {
                    const yearlyStars = HoroscopeFlowingStarsCalculator.calculateYearlyFlowingStars(
                        this.currentYear.heavenlyStem,
                        branch,
                        lifePalaceBranch
                    );
                    console.log(`流年流动星: 宫位${branch}(索引${palaceIndex}), 天干${this.currentYear.heavenlyStem}, 命宫${lifePalaceBranch} ->`, yearlyStars);
                    flowingStars[palaceIndex].push(...yearlyStars);
                }

                // 流月流曜星 (红色)
                if (this.currentMonth) {
                    const monthlyStars = HoroscopeFlowingStarsCalculator.calculateMonthlyFlowingStars(
                        this.currentMonth.heavenlyStem,
                        branch,
                        lifePalaceBranch
                    );
                    flowingStars[palaceIndex].push(...monthlyStars);
                }
            });

            console.log('流动星计算结果:', flowingStars);
            console.log('=== 流动星计算结束 ===');
            return flowingStars;
        },

        // 处理全局点击事件，关闭下拉框
        handleGlobalClick(event) {
            // 检查点击是否在组件内部
            if (!this.$el.contains(event.target)) {
                this.isDecadeDropdownOpen = false;
                this.isYearDropdownOpen = false;
            }
        },

        // 获取命宫地支
        getLifePalaceBranch() {
            // 从centerInfo获取命宫地支
            const branch = this.astrolabe?.centerInfo?.lifePalace || '寅';
            console.log('命宫地支:', branch);
            return branch;
        }
    }
};
</script>
