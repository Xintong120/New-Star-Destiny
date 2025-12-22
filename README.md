# 紫微斗数专业排盘

基于 `https://github.com/Xintong120/Star-Destiny` 优化ui设计的项目。

## 项目结构

```
src/
├── api/                 # API相关
│   └── README.md
├── components/          # Vue组件
│   ├── chart/           # 命盘相关组件
│   │   ├── CenterInfo.vue
│   │   ├── ChartView.vue
│   │   ├── PalaceCell.vue
│   │   └── TimeLimitNav.vue
│   └── common/          # 通用组件
│       ├── HomeView.vue
│       ├── NavBar.vue
│       └── SidebarForm.vue
├── constants/           # 常量和Mock数据
│   └── index.js
├── lib/                 # 核心库
│   ├── api/
│   ├── astrolabe/       # 星盘相关
│   ├── horoscope/       # 星座相关
│   ├── stars/           # 星曜相关
│   └── utils/           # 工具函数
│       ├── age/         # 年龄计算
│       ├── date/        # 日期处理
│       ├── ganzhi/      # 干支计算
│       └── person_info/ # 个人信息
├── styles/              # 样式文件
│   └── main.css
├── types/               # TypeScript类型定义
│   ├── age/
│   ├── astrolabe/
│   ├── date/
│   └── Person.ts
├── ui/                  # UI组件库
│   └── README.md
├── App.vue              # 根组件
└── main.js              # 应用入口
```

## 运行方式

```bash
# 安装依赖
npm install

# 启动Vite开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

Vite服务器将在 `http://localhost:4000` 启动。

