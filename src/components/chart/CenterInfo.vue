<template>
    <div class="w-full h-full flex flex-col justify-between text-center overflow-hidden">
        <!-- 标题区域 -->
        <header class="space-y-0.5 md:space-y-2 mb-1 md:mb-4">
             <h2 class="text-sm md:text-3xl font-bold tracking-[0.1em] md:tracking-[0.2em]">{{ info.name || '无名氏' }}</h2>
             <div class="text-[0.4rem] md:text-xs text-gray-500 flex justify-center gap-2 md:gap-4 uppercase tracking-widest leading-none">
                 <span>{{ info.gender === 'male' ? '乾造' : '坤造' }}</span>
                 <span class="text-red-800 font-bold">{{ info.wuxing }}</span>
             </div>
        </header>

        <!-- 核心信息: 使用 dl (Description List) 语义化标签 -->
        <!-- 移动端: text-[0.45rem], 桌面端: text-sm -->
        <dl class="grid grid-cols-2 gap-x-1 md:gap-x-4 gap-y-0.5 md:gap-y-2 text-left text-[0.45rem] md:text-sm font-light leading-tight">

            <div class="flex justify-between border-b border-gray-100 pb-[1px] md:pb-1">
                <dt class="text-gray-400">年龄</dt>
                <dd class="font-mono">{{ info.age }} 岁</dd>
            </div>
            <div class="flex justify-between border-b border-gray-100 pb-[1px] md:pb-1">
                <dt class="text-gray-400">生肖</dt>
                <dd>{{ info.zodiac }}</dd>
            </div>

            <div class="flex justify-between border-b border-gray-100 pb-[1px] md:pb-1">
                <dt class="text-gray-400">星座</dt>
                <dd>{{ info.constellation }}</dd>
            </div>
            <div class="flex justify-between border-b border-gray-100 pb-[1px] md:pb-1">
                <dt class="text-gray-400">命主</dt>
                <dd>{{ info.lifeMaster }}</dd>
            </div>

            <div class="col-span-2 flex justify-between border-b border-gray-100 pb-[1px] md:pb-1">
                <dt class="text-gray-400">四柱</dt>
                <dd class="font-mono tracking-wide scale-90 origin-right md:scale-100">{{ info.sizhu }}</dd>
            </div>
            <div class="col-span-2 flex justify-between border-b border-gray-100 pb-[1px] md:pb-1">
                <dt class="text-gray-400">阳历</dt>
                <dd class="font-mono">{{ info.solarDate }}</dd>
            </div>
            <div class="col-span-2 flex justify-between border-b border-gray-100 pb-[1px] md:pb-1">
                <dt class="text-gray-400">农历</dt>
                <dd>{{ info.lunarDate }}</dd>
            </div>
             <div class="col-span-2 flex justify-between border-b border-gray-100 pb-[1px] md:pb-1">
                <dt class="text-gray-400">时辰</dt>
                <dd class="scale-90 origin-right md:scale-100">{{ info.time }}</dd>
            </div>

            <div class="flex justify-between pt-[1px] md:pt-1">
                <dt class="text-gray-400">命宫</dt>
                <dd class="font-bold">{{ info.lifePalace }}</dd>
            </div>
            <div class="flex justify-between pt-[1px] md:pt-1">
                <dt class="text-gray-400">身宫</dt>
                <dd class="font-bold">{{ info.bodyPalace }}</dd>
            </div>
            <div class="flex justify-between pt-[1px] md:pt-1">
                <dt class="text-gray-400">身主</dt>
                <dd>{{ info.bodyMaster }}</dd>
            </div>
        </dl>

        <!-- 背景水印 -->
        <div class="hidden md:flex absolute inset-0 items-center justify-center opacity-[0.02] pointer-events-none" aria-hidden="true">
            <span class="text-9xl font-serif">命</span>
        </div>
    </div>
</template>

<script>
import { watch } from 'vue';

export default {
    name: 'CenterInfo',
    props: ['info'],
    setup(props) {
        // 调试输出个人信息
        watch(() => props.info, (newInfo) => {
            if (newInfo) {
                console.log('=== 用户个人信息 ===');
                console.log('姓名:', newInfo.name);
                console.log('性别:', newInfo.gender === 'male' ? '男' : '女');
                console.log('五行局:', newInfo.wuxing);
                console.log('年龄:', newInfo.age, '岁');
                console.log('生肖:', newInfo.zodiac);
                console.log('星座:', newInfo.constellation);
                console.log('命主星:', newInfo.lifeMaster);
                console.log('身主星:', newInfo.bodyMaster);
                console.log('四柱:', newInfo.sizhu);
                console.log('阳历生日:', newInfo.solarDate);
                console.log('农历生日:', newInfo.lunarDate);
                console.log('出生时辰:', newInfo.time);
                console.log('命宫:', newInfo.lifePalace);
                console.log('身宫:', newInfo.bodyPalace);
                console.log('===================');
            }
        }, { immediate: true });

        return {};
    }
};
</script>
