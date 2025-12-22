<template>
    <nav class="w-full max-w-[1200px] mb-2 flex flex-col md:flex-row gap-2 md:gap-4 items-center justify-between bg-gray-50 p-2 border border-gray-200 rounded-sm" aria-label="运限导航">

        <span class="text-xs font-bold text-gray-500 uppercase tracking-widest hidden md:inline">运限导航</span>

        <div class="flex flex-wrap justify-center gap-2 w-full md:w-auto text-xs md:text-sm">

            <!-- 大限选择 -->
            <div class="relative group">
                <button class="px-2 py-1 md:px-3 bg-white border border-gray-300 hover:border-black transition-colors flex items-center gap-1 shadow-sm" aria-haspopup="true">
                    <span>第四大限 (34-43)</span>
                    <svg class="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                </button>
                <div class="absolute top-full left-0 mt-1 w-40 bg-white border border-gray-200 shadow-lg hidden group-hover:block z-50">
                    <div class="p-1 flex flex-col">
                        <button class="text-left px-2 py-1 hover:bg-gray-100">第三大限 (24-33)</button>
                        <button class="text-left px-2 py-1 hover:bg-gray-100 font-bold bg-gray-50">第四大限 (34-43)</button>
                        <button class="text-left px-2 py-1 hover:bg-gray-100">第五大限 (44-53)</button>
                    </div>
                </div>
            </div>

            <!-- 流年选择 -->
            <div class="flex items-center gap-1">
                <button class="w-5 h-5 md:w-6 md:h-6 flex items-center justify-center border border-gray-200 hover:bg-black hover:text-white transition-colors" @click="$emit('change', 'prev-year')" aria-label="上一年"><</button>
                <span class="px-1 md:px-2 font-mono">2024 甲辰</span>
                <button class="w-5 h-5 md:w-6 md:h-6 flex items-center justify-center border border-gray-200 hover:bg-black hover:text-white transition-colors" @click="$emit('change', 'next-year')" aria-label="下一年">></button>
            </div>

            <!-- 流月选择 -->
             <div class="flex items-center gap-1 border-l border-gray-200 pl-2">
                <label for="select-month" class="text-[0.6rem] md:text-[10px] text-gray-400">流月</label>
                <select id="select-month" class="bg-transparent border-b border-gray-300 focus:outline-none cursor-pointer">
                    <option>正月</option>
                    <option>二月</option>
                    <option>三月</option>
                </select>
            </div>

             <!-- 流日选择 -->
             <div class="flex items-center gap-1 border-l border-gray-200 pl-2">
                <label for="select-day" class="text-[0.6rem] md:text-[10px] text-gray-400">流日</label>
                <select id="select-day" class="bg-transparent border-b border-gray-300 focus:outline-none cursor-pointer">
                    <option>初一</option>
                    <option>十五</option>
                    <option>三十</option>
                </select>
            </div>

        </div>
    </nav>
</template>

<script>
export default {
    name: 'TimeLimitNav',
    emits: ['change']
};
</script>
