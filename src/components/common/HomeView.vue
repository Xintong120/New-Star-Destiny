<template>
    <section class="flex flex-col items-center justify-center h-[calc(100vh-60px)] px-4" aria-label="欢迎页面">
        <div class="max-w-md w-full text-center space-y-12 md:space-y-16">
            <!-- 装饰 Logo (纯装饰，aria-hidden) -->
            <div class="relative mx-auto w-40 h-40 md:w-48 md:h-48 border-[1px] border-gray-200 rounded-full flex items-center justify-center group cursor-default" aria-hidden="true">
                <div class="absolute w-[140%] h-[1px] bg-gray-100 rotate-45 transition-transform duration-[2s] group-hover:rotate-[225deg]"></div>
                <div class="absolute w-[140%] h-[1px] bg-gray-100 -rotate-45 transition-transform duration-[2s] group-hover:rotate-[135deg]"></div>

                <div class="w-28 h-28 md:w-32 md:h-32 border border-gray-300 rotate-45 flex items-center justify-center transition-transform duration-700 group-hover:rotate-90 bg-white z-10">
                        <div class="w-16 h-16 md:w-20 md:h-20 border border-black flex items-center justify-center -rotate-45 group-hover:-rotate-90 transition-transform duration-700">
                        <span class="text-3xl md:text-4xl font-thin select-none">紫</span>
                        </div>
                </div>
            </div>

            <header class="space-y-4 md:space-y-6">
                <h2 class="text-4xl md:text-5xl font-thin tracking-[0.3em] ml-4 text-black">斗数排盘</h2>
                <p class="text-gray-400 font-light tracking-[0.4em] text-[10px] md:text-xs uppercase">Zi Wei Dou Shu Chart</p>
            </header>

            <button
                @click="$emit('start')"
                class="group relative inline-flex items-center justify-center gap-4 px-10 py-3 md:px-12 md:py-4 border border-black text-black hover:bg-black hover:text-white transition-all duration-500 ease-out overflow-hidden w-64 mx-auto focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                aria-label="立即开始排盘"
            >
                <span class="absolute inset-0 w-full h-full bg-black transform translate-x-full group-hover:translate-x-0 transition-transform duration-300 origin-right"></span>
                <span class="relative tracking-[0.2em] text-base md:text-lg group-hover:text-white">立即排盘</span>
                <svg class="relative w-4 h-4 group-hover:translate-x-2 transition-transform duration-300 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
            </button>
        </div>
    </section>
</template>

<script>
export default {
    name: 'HomeView',
    emits: ['start']
};
</script>
