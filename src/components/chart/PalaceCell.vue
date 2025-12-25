<template>
    <article
        class="relative border-[0.5px] border-gray-300 flex flex-col justify-between hover:bg-gray-50 transition-colors duration-300 overflow-hidden"
        :class="gridClass"
        :aria-label="data.name + '宫'"
    >
        <!-- A. 顶部：天干地支 & 宫位名称 -->
        <header class="flex justify-between items-start mb-0.5 md:mb-1 p-1 md:p-2">
            <div class="flex flex-col items-center">
                 <!-- 天干: 移动端极小字体 -->
                 <span class="text-[0.5rem] md:text-xs text-gray-500 font-serif leading-none scale-90 md:scale-100 origin-center">{{ data.stem }}</span>
                 <!-- 地支 -->
                 <span class="text-[0.5rem] md:text-sm font-bold bg-black text-white w-3 h-3 md:w-5 md:h-5 flex items-center justify-center rounded-[1px] md:rounded-sm mt-0.5 leading-none">{{ data.branch }}</span>
            </div>

            <div class="flex flex-col items-end">
                <!-- 宫位名称 -->
                <!-- 移动端：宽度极窄，字体极小 -->
                <h3 class="text-[0.6rem] md:text-lg font-bold tracking-tighter md:tracking-widest writing-vertical-lr border-l md:border-l-2 border-red-800 pl-[1px] md:pl-1 h-auto text-red-900 leading-none">
                    {{ data.name }}
                </h3>
            </div>
        </header>

        <!-- B. 中部：星曜布局 -->
        <section class="flex-1 flex justify-between relative px-0.5 md:px-1 min-h-0" aria-label="星曜列表">

            <!-- 左侧：辅星 & 杂曜 -->
            <div class="flex flex-col gap-0 md:gap-1 w-1/2 pr-[1px]">
                 <div class="flex flex-wrap content-start">
                    <!-- 辅星: 手机端 text-[0.4rem] 甚至更小，使用 scale 缩放以保证清晰度 -->
                    <div v-for="star in data.minorStars" :key="star.name" class="flex flex-col items-start">
                        <span class="text-[0.4rem] md:text-xs text-gray-700 leading-tight transform scale-90 md:scale-100 origin-left whitespace-nowrap">
                            {{ star.name }}
                        </span>
                        <!-- 庙旺利陷 & 四化 -->
                        <div class="flex items-center gap-[1px] mt-[1px]">
                            <span v-if="star.brightness && star.brightness !== ''" class="text-[0.3rem] md:text-[8px] text-gray-400 scale-75 md:scale-90 origin-left">{{ star.brightness }}</span>
                            <span v-if="star.mutagen" class="text-[0.3rem] md:text-[8px] font-bold text-white bg-blue-600 px-[1px] rounded scale-75 md:scale-90 origin-left">{{ star.mutagen }}</span>
                        </div>
                    </div>
                 </div>
                 <div class="flex flex-wrap mt-0.5 md:mt-2">
                    <!-- 杂曜 -->
                    <span v-for="star in data.miscStars" :key="star" class="text-[0.35rem] md:text-[10px] text-gray-400 scale-75 md:scale-95 origin-left whitespace-nowrap leading-none">
                        {{ star }}
                    </span>
                 </div>
            </div>

            <!-- 右侧：主星 -->
            <div class="flex flex-col items-end gap-0.5 md:gap-2 w-1/2 pl-[1px]">
                <div v-for="star in data.majorStars" :key="star.name" class="flex flex-col items-center relative group">
                    <!-- 主星名字: 移动端加粗红色 -->
                    <span class="text-[0.55rem] md:text-base font-bold text-red-700 tracking-tighter md:tracking-widest leading-none">
                        {{ star.name }}
                    </span>
                    <!-- 庙旺利陷 & 四化 -->
                    <div class="flex items-center gap-[1px] md:gap-0.5 mt-[1px] md:mt-0.5">
                        <span class="text-[0.35rem] md:text-[9px] text-gray-400 scale-75 md:scale-90 origin-right">{{ star.brightness }}</span>
                        <span v-if="star.mutagen" class="text-[0.35rem] md:text-[9px] font-bold text-white bg-red-600 px-[1px] md:px-0.5 rounded-[1px] md:rounded-sm scale-75 md:scale-90 origin-right">{{ star.mutagen }}</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- C. 底部：神煞 & 博士 & 大限 -->
        <footer class="mt-0.5 md:mt-2 border-t border-gray-100 pt-[1px] md:pt-1 px-0.5 md:px-2 pb-0.5 md:pb-2">
            <!-- 神煞: 极小字体 -->
            <div class="flex justify-between text-[0.35rem] md:text-[10px] text-gray-500 leading-none">
                <span class="scale-90 origin-left">{{ calculatedGods.changSheng }}</span>
                <span class="scale-90">{{ calculatedGods.boShi }}</span>
                <span class="scale-90">{{ calculatedGods.jiangQian }}</span>
                <span class="scale-90 origin-right">{{ calculatedGods.suiQian }}</span>
            </div>

            <div class="flex justify-between items-end mt-[1px] md:mt-0.5">
                <!-- 大限 -->
                <span class="text-[0.45rem] md:text-sm font-mono font-bold bg-gray-100 px-[1px] md:px-1 rounded-[1px] md:rounded-sm text-gray-800 leading-none">
                    {{ data.ageRange }}
                </span>
                <!-- Index -->
                <span class="text-[0.35rem] md:text-[9px] text-gray-300 leading-none">{{ index + 1 }}</span>
            </div>
        </footer>
    </article>
</template>

<script>
import { computed } from 'vue';
import {
    GetChangshengTwelveArray,
    GetDoctorTwelveArray,
    GetJiangqianTwelveArray,
    GetSuiqianTwelveArray
} from '../../lib/stars/48-ShenSha/index.js';

export default {
    name: 'PalaceCell',
    props: ['data', 'index', 'gridClass', 'userInfo'],
    setup(props) {
        // 计算真正的装饰星
        const calculatedGods = computed(() => {
            if (!props.userInfo) {
                return props.data.gods; // 如果没有用户信息，返回原有数据
            }

            const { heavenlyStem, earthlyBranch, gender, fiveElementsClass, yearBranchYinYang } = props.userInfo;

            // 计算长生十二神
            const changshengArray = GetChangshengTwelveArray({
                fiveElementsClass: fiveElementsClass,
                gender: gender,
                yearBranchYinYang: yearBranchYinYang
            });

            // 计算博士十二神
            const doctorArray = GetDoctorTwelveArray(heavenlyStem, earthlyBranch, gender);

            // 计算岁前十二星
            const suiqianArray = GetSuiqianTwelveArray({
                yearBranchIndex: getYinIndex(earthlyBranch)
            });

            // 计算将前十二星
            const jiangqianArray = GetJiangqianTwelveArray({
                yearBranchIndex: getYinIndex(earthlyBranch)
            });

            // 获取当前宫位索引
            const palaceIndex = getYinIndex(props.data.branch);

            const result = {
                changSheng: changshengArray[palaceIndex] || '',
                boShi: doctorArray[palaceIndex] || '',
                suiQian: suiqianArray[palaceIndex] || '',
                jiangQian: jiangqianArray[palaceIndex] || ''
            };

            // 调试输出：宫位index、宫位名称、对应的将前12神
            console.log(`宫位 ${props.index}: ${props.data.name}宫 (${props.data.branch}) - 将前12神: ${result.jiangQian}`);

            return result;
        });

        // 地支转宫位索引（从寅宫开始）
        function getYinIndex(branch) {
            const palaceMap = {
                '寅': 0, '卯': 1, '辰': 2, '巳': 3, '午': 4, '未': 5,
                '申': 6, '酉': 7, '戌': 8, '亥': 9, '子': 10, '丑': 11
            };
            return palaceMap[branch] || 0;
        }

        return {
            calculatedGods
        };
    }
};
</script>
