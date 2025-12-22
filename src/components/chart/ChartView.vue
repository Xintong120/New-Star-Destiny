<template>
    <section class="min-h-screen py-4 md:py-8 px-2 md:px-4 lg:px-8 flex flex-col items-center" aria-label="命盘详情">

        <!-- 导航: 使用 nav 标签 -->
        <time-limit-nav @change="$emit('change-limit', $event)"></time-limit-nav>

        <!-- 命盘主体 Grid -->
        <!--
            [重大更新] 移动端布局逻辑:
            原来: flex flex-col (垂直列表)
            现在: grid grid-cols-4 aspect-square (强制 4x4 正方形)

            技术细节：
            - grid-cols-4: 无论手机还是电脑都保持 4 列。
            - aspect-square: 强制保持正方形宽高比。
            - 手机端宫格内字体需要极小 (text-[0.5rem] 或更小)，否则放不下。
            - 中心信息区在手机端也是占据 grid-area 中间位置。
        -->
        <div class="w-full max-w-[1200px] mt-4 md:mt-6 bg-white border border-black shadow-2xl grid grid-cols-4 grid-rows-4 aspect-square relative" aria-label="紫微斗数十二宫">

            <!-- 中心信息区 (Grid Center) -->
            <!--
                Desktop: col-start-2 col-span-2 row-start-2 row-span-2
                Mobile: 同样占据中间，但内部字体缩小
            -->
            <section class="col-start-2 col-span-2 row-start-2 row-span-2 flex flex-col relative bg-[#FAFAFA] z-10 p-2 md:p-6" aria-label="命主核心信息">
                <!-- 装饰边角 -->
                <div class="absolute top-1 left-1 md:top-2 md:left-2 w-2 h-2 md:w-4 md:h-4 border-t border-l border-black"></div>
                <div class="absolute top-1 right-1 md:top-2 md:right-2 w-2 h-2 md:w-4 md:h-4 border-t border-r border-black"></div>
                <div class="absolute bottom-1 left-1 md:bottom-2 md:left-2 w-2 h-2 md:w-4 md:h-4 border-b border-l border-black"></div>
                <div class="absolute bottom-1 right-1 md:bottom-2 md:right-2 w-2 h-2 md:w-4 md:h-4 border-b border-r border-black"></div>

                <!-- 中心信息内容 -->
                <center-info :info="fullChartData.centerInfo"></center-info>
            </section>

            <!-- 12 宫位渲染 -->
            <!-- 使用 <article> 标签增强语义 -->
            <palace-cell
                v-for="(palace, index) in uiGridOrder"
                :key="palace.id"
                :data="palace"
                :index="index"
                :grid-class="getGridPositionClass(index)"
            ></palace-cell>

        </div>

        <footer class="mt-8 text-[0.6rem] md:text-xs text-gray-400 font-light tracking-widest">
            * 仅供参考，具体解释请咨询专业命理师
        </footer>
    </section>
</template>

<script>
import { computed } from 'vue';
import PalaceCell from './PalaceCell.vue';
import CenterInfo from './CenterInfo.vue';
import TimeLimitNav from './TimeLimitNav.vue';

export default {
    name: 'ChartView',
    props: ['userData', 'fullChartData'],
    emits: ['change-limit'],
    components: {
        'palace-cell': PalaceCell,
        'center-info': CenterInfo,
        'time-limit-nav': TimeLimitNav
    },
    setup(props) {
        const uiGridOrder = computed(() => {
            const p = (branch) => props.fullChartData.palaces.find(x => x.branch === branch);
            return [
                p('巳'), p('午'), p('未'), p('申'), // Top
                p('酉'),                         // Right Top
                p('戌'),                         // Right Bottom
                p('亥'), p('子'), p('丑'), p('寅'), // Bottom
                p('卯'),                         // Left Bottom
                p('辰')                          // Left Top
            ];
        });

        const getGridPositionClass = (index) => {
            // grid position: 0-3 (row 1), 4 (row 2 col 4), 5 (row 3 col 4), 6-9 (row 4 reverse), 10 (row 3 col 1), 11 (row 2 col 1)
            // 这里使用通用的 col/row start, 配合 Tailwind 的 arbitrary value 可能会更灵活
            // 但为了清晰，我们分别指定

            // 移动端和桌面端逻辑一致了 (都是4列Grid)
            // 需要注意的是 Tailwind 的类名在不加前缀时默认作用于所有尺寸

            // 顶部一行
            if (index === 0) return 'col-start-1 row-start-1 border-b-[0.5px] border-r-[0.5px]';
            if (index === 1) return 'col-start-2 row-start-1 border-b-[0.5px] border-r-[0.5px]';
            if (index === 2) return 'col-start-3 row-start-1 border-b-[0.5px] border-r-[0.5px]';
            if (index === 3) return 'col-start-4 row-start-1 border-b-[0.5px]';

            // 右侧一列
            if (index === 4) return 'col-start-4 row-start-2 border-b-[0.5px]';
            if (index === 5) return 'col-start-4 row-start-3 border-b-[0.5px]';

            // 底部一行 (注意顺序是 亥 子 丑 寅)
            // uiGridOrder[6]是亥(Bottom Right), [7]是子, [8]是丑, [9]是寅(Bottom Left)
            if (index === 6) return 'col-start-4 row-start-4 border-l-[0.5px]';
            if (index === 7) return 'col-start-3 row-start-4 border-r-[0.5px]';
            if (index === 8) return 'col-start-2 row-start-4 border-r-[0.5px]';
            if (index === 9) return 'col-start-1 row-start-4 border-r-[0.5px]';

            // 左侧一列
            if (index === 10) return 'col-start-1 row-start-3 border-t-[0.5px] border-r-[0.5px]';
            if (index === 11) return 'col-start-1 row-start-2 border-t-[0.5px] border-r-[0.5px]';

            return '';
        };

        return { uiGridOrder, getGridPositionClass };
    }
};
</script>
