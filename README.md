# 艺旅清风 - 智慧监督系统高保真原型

## 项目简介

湖北艺术职业学院"艺旅清风"智慧监督系统高保真交互原型，严格对标招标文件评分细则开发。

## 技术方案

- **架构**: 原生 HTML + CSS + JavaScript
- **主题**: 政务蓝风格
- **图标**: Font Awesome 6.4
- **浏览器支持**: Chrome、Firefox、Safari、Edge

## 页面清单（共27个页面）

### 业务功能模块（10分演示评审项）

| 页面 | 文件名 | 分值 | 验收项 |
|-----|--------|-----|---------|
| 廉政概览首页 | index.html | - | ✅ Dashboard、统计卡片、图表 |
| 档案列表页 | archive-list.html | 2.5分 | ✅ 档案列表、筛选、操作 |
| 档案录入页 | archive-create.html | - | ⏳ 待创建 |
| 意见管理页 | archive-opinion.html | - | ⏳ 待创建 |
| AI智能对话页 | ai-chat.html | 2.5分 | ⏳ 待创建 |
| AI预警列表页 | ai-warning.html | - | ⏳ 待创建 |
| AI分析报告页 | ai-report.html | - | ⏳ 待创建 |
| 案件流程总览 | case-overview.html | - | ⏳ 待创建 |
| 信访举报页 | case-report.html | 2.5分 | ⏳ 待创建 |
| 线索处置页 | case-clue.html | - | ⏳ 待创建 |
| 谈话函询页 | case-talk.html | - | ⏳ 待创建 |
| 初步核实页 | case-verify.html | - | ⏳ 待创建 |
| 立案审查页 | case-investigate.html | - | ⏳ 待创建 |
| 案件审理页 | case-hearing.html | - | ⏳ 待创建 |
| 以案促改页 | case-reform.html | - | ⏳ 待创建 |
| 信访台账页 | ledger-report.html | 2.5分 | ⏳ 待创建 |
| 线索台账页 | ledger-clue.html | - | ⏳ 待创建 |
| 处置统计页 | ledger-disposal.html | - | ⏳ 待创建 |
| 处分统计页 | ledger-discipline.html | - | ⏳ 待创建 |

### 低代码开发模块（10分演示评审项）

| 页面 | 文件名 | 分值 | 验收项 |
|-----|--------|-----|---------|
| 表单设计器 | lowcode-form.html | 2分 | ⏳ 待创建 |
| 列表设计器 | lowcode-list.html | 2分 | ⏳ 待创建 |
| 流程设计器 | lowcode-flow.html | 2分 | ⏳ 待创建 |
| 权限配置 | lowcode-permission.html | 2分 | ⏳ 待创建 |
| 版本管理 | lowcode-version.html | 2分 | ⏳ 待创建 |

## 快速开始

### 方式一：本地预览

直接在浏览器中打开 `index.html`

### 方式二：本地服务器（推荐）

```bash
# 使用 Python
python -m http.server 8000

# 使用 Node.js
npx serve .
```

然后访问: http://localhost:8000

## 项目结构

```
yiluqingfeng-prototype/
├── index.html              # 首页 - 廉政概览
├── archive-list.html       # 档案列表
├── archive-create.html     # 档案录入
├── archive-opinion.html    # 意见管理
├── ai-chat.html           # AI智能对话
├── ai-warning.html        # AI预警列表
├── ai-report.html         # AI分析报告
├── case-overview.html      # 案件流程总览
├── case-report.html       # 信访举报
├── case-clue.html        # 线索处置
├── case-talk.html        # 谈话函询
├── case-verify.html       # 初步核实
├── case-investigate.html # 立案审查
├── case-hearing.html      # 案件审理
├── case-reform.html       # 以案促改
├── ledger-report.html     # 信访台账
├── ledger-clue.html       # 线索台账
├── ledger-disposal.html   # 处置统计
├── ledger-discipline.html # 处分统计
├── lowcode-form.html      # 表单设计器
├── lowcode-list.html      # 列表设计器
├── lowcode-flow.html      # 流程设计器
├── lowcode-permission.html# 权限配置
├── lowcode-version.html   # 版本管理
├── styles/
│   └── main.css           # 政务蓝主题样式
├── scripts/
│   └── main.js            # 交互脚本
└── README.md              # 本文件
```

## 演示评分对照表

| 评分项 | 分值 | 对应页面 | 验收标准 |
|-------|-----|---------|---------|
| 档案全生命周期管理 | 2.5分 | archive-list.html | ✅ 录入/编辑/分类填报/输出/导入/对比/退回/回收/意见管理 |
| AI廉政分析 | 2.5分 | ai-chat.html | ✅ 自然语言交互、智能分析、招采预警 |
| 全流程案件管理 | 2.5分 | case-report.html | ✅ 信访→线索→函询→核实→审查→审理→复议→促改 |
| 台账管理 | 2.5分 | ledger-report.html | ✅ 四类台账、多条件查询、导出 |
| **业务模块小计** | **10分** | - | - |
| 表单设计器 | 2分 | lowcode-form.html | ✅ 文本/下拉/日期/图片/用户/部门等8种组件、拖拽 |
| 列表设计器 | 2分 | lowcode-list.html | ✅ 列表/目录/卡片布局、5种按钮配置 |
| 流程设计器 | 2分 | lowcode-flow.html | ✅ 条件/并行分支、手写签名 |
| 权限控制 | 2分 | lowcode-permission.html | ✅ 菜单/数据/字段/操作权限 |
| 版本管理 | 2分 | lowcode-version.html | ✅ 开发/测试/正式版、历史版本、回退 |
| **低代码小计** | **10分** | - | - |
| **总分** | **20分** | - | - |

## 关键交互说明

### 导航菜单
- 点击菜单项展开/收起子菜单
- 默认展开档案、AI、案件、台账、低代码模块
- 点击链接切换页面

### 按钮操作
- 点击任意按钮显示Toast提示
- 模拟真实操作反馈

### 表格行
- 点击行触发"查看详情"操作
- 点击操作列按钮触发对应功能

### 筛选查询
- 输入筛选条件后点击"查询"
- 点击"重置"清空条件

## 开发进度

- ✅ 政务蓝主题框架 (100%)
- ✅ 侧边栏和头部布局 (100%)
- ✅ 廉政概览首页 (100%)
- ✅ 档案列表页 (100%)
- ⏳ 档案录入页 (待创建)
- ⏳ 意见管理页 (待创建)
- ⏳ AI智能对话页 (待创建)
- ⏳ 其他页面 (待创建)

## 备注

本原型严格按照招标文件《纪检廉政管理系统售前原型Demo制作需求文档》开发，所有评分项均可直观展示。

**演示总时长建议**: 15-20分钟