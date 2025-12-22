<template>
    <div class="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="form-title" :class="{'pointer-events-none': !isOpen}">
        <transition enter-active-class="transition-opacity duration-500 ease-out" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition-opacity duration-500 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
            <div v-if="isOpen" @click="$emit('update:isOpen', false)" class="absolute inset-0 bg-white/60 backdrop-blur-sm cursor-pointer pointer-events-auto" aria-label="关闭侧边栏"></div>
        </transition>

        <transition enter-active-class="transform transition duration-500 cubic-bezier(0.16, 1, 0.3, 1)" enter-from-class="-translate-x-full" enter-to-class="translate-x-0" leave-active-class="transform transition duration-300 ease-in" leave-from-class="translate-x-0" leave-to-class="-translate-x-full">
            <div v-if="isOpen" class="absolute top-0 left-0 h-full w-full sm:w-[420px] bg-white shadow-2xl pointer-events-auto flex flex-col border-r border-gray-100">
                <header class="px-8 pt-8 pb-4 flex items-center justify-between border-b border-gray-50">
                    <h2 id="form-title" class="text-2xl font-bold tracking-[0.15em]">信息录入</h2>
                    <button @click="$emit('update:isOpen', false)" class="group p-2 hover:bg-gray-50 rounded-full transition-colors" aria-label="关闭">
                        <svg class="w-6 h-6 text-gray-400 group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </header>

                <form @submit.prevent="submit" class="flex-1 overflow-y-auto px-8 py-8 space-y-10">

                    <div class="space-y-2 group">
                        <label for="input-name" class="block text-xs font-bold text-gray-400 tracking-[0.2em] uppercase">
                            姓名 Name
                        </label>
                        <input
                            id="input-name"
                            v-model="internalData.name"
                            type="text"
                            placeholder="请输入称呼"
                            class="w-full bg-transparent border-b border-gray-200 py-2 text-md focus:outline-none focus:border-black transition-colors"
                        />
                    </div>

                    <fieldset class="space-y-2">
                        <legend class="block text-xs font-bold text-gray-400 tracking-[0.2em] uppercase mb-3">
                            性别 Gender *
                        </legend>
                        <div class="grid grid-cols-2 gap-4">
                            <label class="cursor-pointer">
                                <input type="radio" v-model="internalData.gender" value="male" class="custom-radio hidden">
                                <div class="border border-gray-200 py-3 text-center text-md tracking-widest hover:border-gray-400 transition-all">
                                    乾造 (男)
                                </div>
                            </label>
                            <label class="cursor-pointer">
                                <input type="radio" v-model="internalData.gender" value="female" class="custom-radio hidden">
                                <div class="border border-gray-200 py-3 text-center text-md tracking-widest hover:border-gray-400 transition-all">
                                    坤造 (女)
                                </div>
                            </label>
                        </div>
                    </fieldset>

                    <fieldset class="space-y-2">
                        <legend class="block text-xs font-bold text-gray-400 tracking-[0.2em] uppercase mb-3">
                            历法 Calendar *
                        </legend>
                        <div class="inline-flex border-b border-gray-200 w-full" role="radiogroup">
                            <button
                                type="button"
                                role="radio"
                                :aria-checked="internalData.calendarType === 'solar'"
                                @click="internalData.calendarType = 'solar'"
                                class="flex-1 pb-2 text-md tracking-widest relative"
                                :class="internalData.calendarType === 'solar' ? 'text-black' : 'text-gray-400'"
                            >
                                公历
                                <span v-if="internalData.calendarType === 'solar'" class="absolute bottom-0 left-0 w-full h-[2px] bg-black"></span>
                            </button>
                            <button
                                type="button"
                                role="radio"
                                :aria-checked="internalData.calendarType === 'lunar'"
                                @click="internalData.calendarType = 'lunar'"
                                class="flex-1 pb-2 text-md tracking-widest relative"
                                :class="internalData.calendarType === 'lunar' ? 'text-black' : 'text-gray-400'"
                            >
                                农历
                                <span v-if="internalData.calendarType === 'lunar'" class="absolute bottom-0 left-0 w-full h-[2px] bg-black"></span>
                            </button>
                        </div>
                    </fieldset>

                    <div class="space-y-2">
                        <label for="input-date" class="block text-xs font-bold text-gray-400 tracking-[0.2em] uppercase">
                            出生日期 Date *
                        </label>
                        <input
                            id="input-date"
                            v-model="internalData.birthDate"
                            type="date"
                            required
                            class="w-full bg-transparent border-b border-gray-200 py-2 text-md  focus:outline-none focus:border-black transition-colors"
                        />
                    </div>

                    <div class="space-y-2">
                        <label for="select-time" class="block text-xs font-bold text-gray-400 tracking-[0.2em] uppercase">
                            时辰 Time *
                        </label>
                        <div class="relative">
                            <select
                                id="select-time"
                                v-model="internalData.birthTime"
                                class="w-full appearance-none bg-transparent border-b border-gray-200 py-2 text-md focus:outline-none focus:border-black transition-colors cursor-pointer"
                            >
                                <option v-for="t in branches" :key="t.key" :value="t.key">{{ t.label }}</option>
                            </select>
                            <div class="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-end pt-2">
                        <button
                            type="button"
                            @click="$emit('save-local')"
                            class="text-xs text-gray-500 hover:text-black border-b border-dotted border-gray-400 hover:border-black transition-colors pb-0.5"
                            aria-label="保存当前输入的信息到浏览器"
                        >
                            保存个人信息至本机
                        </button>
                    </div>

                </form>

                <footer class="p-8 border-t border-gray-50 bg-gray-50/50">
                    <button
                        @click="submit"
                        class="w-full bg-black text-white h-14 hover:bg-gray-800 transition-colors flex items-center justify-center gap-3 group focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                        <span class="tracking-[0.3em] text-lg font-light pl-1">开始排盘</span>
                        <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </button>
                </footer>
            </div>
        </transition>
    </div>
</template>

<!-- ========================================== -->
<!-- 脚本部分：Vue 3 Composition API -->
<!-- ========================================== -->
<script>
/**
 * Vue 3 Composition API 导入
 * - computed: 创建响应式计算属性
 * - 其他API按需导入，保持代码简洁
 */
import { computed } from 'vue';

/**
 * 常量导入：地支时辰数据
 * - EARTHLY_BRANCHES: 12个时辰选项数组
 * - 每个选项包含key(值)和label(显示文本)
 */
import { EARTHLY_BRANCHES } from '../../constants/index.js';

/**
 * Vue组件定义
 * 使用Options API风格，但内部使用Composition API的setup函数
 */
export default {
    /**
     * 组件名称：用于调试和递归引用
     */
    name: 'SidebarForm',

    /**
     * 属性定义 (Props)
     * - isOpen: 控制侧边栏显示/隐藏
     * - formData: 表单数据对象，包含所有输入字段的值
     */
    props: ['isOpen', 'formData'],

    /**
     * 事件定义 (Emits)
     * - update:isOpen: v-model语法糖，用于双向绑定侧边栏状态
     * - update:formData: v-model语法糖，用于双向绑定表单数据
     * - submit: 表单提交事件
     * - save-local: 保存到本地存储事件
     */
    emits: ['update:isOpen', 'update:formData', 'submit', 'save-local'],

    /**
     * Composition API setup函数
     * @param {Object} props - 响应式属性对象
     * @param {Object} context - 上下文对象，包含emit函数
     * @returns {Object} - 返回给模板使用的响应式数据和方法
     */
    setup(props, { emit }) {

        /**
         * 计算属性：内部表单数据
         * 双向绑定桥梁：连接父组件的formData和子组件的表单控件
         *
         * getter: 返回父组件传入的formData
         * setter: 当表单数据改变时，通过emit通知父组件更新
         */
        const internalData = computed({
            // 获取：直接返回父组件的formData
            get: () => props.formData,

            // 设置：触发update:formData事件更新父组件数据
            set: (val) => emit('update:formData', val)
        });

        /**
         * 时辰选项数据
         * 从常量导入，直接提供给模板的v-for使用
         */
        const branches = EARTHLY_BRANCHES;

        /**
         * 表单提交处理函数
         * 验证必填字段（性别、历法、出生日期、时辰）并触发提交事件
         * 注意：姓名字段为可选，不需要验证
         */
        const submit = () => {
            // 验证必填字段
            if (!internalData.value.gender) {
                alert('请选择性别');
                return;
            }
            if (!internalData.value.calendarType) {
                alert('请选择历法');
                return;
            }
            if (!internalData.value.birthDate) {
                alert('请选择出生日期');
                return;
            }
            if (!internalData.value.birthTime) {
                alert('请选择时辰');
                return;
            }

            // 所有验证通过，触发父组件的提交逻辑
            emit('submit');
        };

        /**
         * 返回给模板的响应式数据和方法
         * - internalData: 计算属性，用于表单双向绑定
         * - branches: 时辰选项数组
         * - submit: 提交处理函数
         */
        return {
            internalData,
            branches,
            submit
        };
    }
};
</script>
