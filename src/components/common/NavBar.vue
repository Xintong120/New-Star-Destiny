<template>
    <nav class="h-full flex items-center justify-between px-4 md:px-6 transition-all duration-300" aria-label="主导航">
        <div
            @click="$emit('reset')"
            class="flex items-center gap-3 cursor-pointer group"
            role="button"
            tabindex="0"
            aria-label="返回首页"
            @keydown.enter="$emit('reset')"
        >
            <div class="w-6 h-6 border-[1.5px] border-black flex items-center justify-center rounded-sm transition-transform group-hover:rotate-45 duration-500" aria-hidden="true">
                <div class="w-1.5 h-1.5 bg-black rounded-full"></div>
            </div>
            <h1 class="font-bold tracking-[0.2em] text-base md:text-lg m-0">紫微 · 命盘</h1>
        </div>

        <button
            v-if="currentView === 'chart'"
            @click="$emit('open-sidebar')"
            class="text-xs border border-gray-300 px-3 py-1.5 rounded-sm hover:border-black hover:bg-black hover:text-white transition-all duration-300 tracking-widest uppercase focus:outline-none focus:ring-2 focus:ring-black"
            aria-label="重新输入信息排盘"
        >
            重新排盘
        </button>
    </nav>
</template>

<script>
export default {
    name: 'NavBar',
    props: ['currentView'],
    emits: ['reset', 'open-sidebar']
};
</script>
