# CLAUDE.md

该文件为 Claude Code 在本仓库中协作开发时提供规范与指引。

## 项目概览

**NEXT AI** 是一个区块链软件开发公司的营销网站，展示服务能力（智能合约、dApp、DeFi、NFT、安全审计、咨询）、项目案例、团队信息与联系表单。

- **类型**: 静态营销网站 + 单一 API 接口
- **框架**: Next.js 15 (App Router) + TypeScript 严格模式 + Tailwind CSS 3.4
- **部署目标**: Vercel / 任意 Node.js 主机
- **远程仓库**: `git@github.com:gitslagga/next-ai.git`（分支: `main`）

## 快速开始

```bash
npm install          # 安装依赖
npm run dev          # 启动开发服务器 -> http://localhost:3000
npm run build        # 生产构建（类型检查 + 编译 + 静态生成）
npm run start        # 启动生产环境服务
npm run lint         # ESLint 检查
```

## 技术栈

| 层级 | 技术 | 版本 |
|---|---|---|
| 框架 | Next.js (App Router) | ^15.1 |
| UI 库 | React | ^19.0 |
| 语言 | TypeScript（strict） | ^5.7 |
| 样式 | Tailwind CSS | ^3.4 |
| 字体 | Inter + JetBrains Mono | 通过 `next/font/google` |
| 包管理 | npm | - |

## 目录结构

```text
next-ai/
├── src/
│   ├── app/                          # Next.js App Router（基于文件系统路由）
│   │   ├── layout.tsx                # 根布局：<html>、metadata、Navbar、Footer
│   │   ├── page.tsx                  # 首页 "/"：组合所有 section
│   │   ├── globals.css               # Tailwind 指令 + @layer base/components/utilities
│   │   ├── about/page.tsx            # "/about"：公司故事 + 团队网格
│   │   ├── services/page.tsx         # "/services"：6 个服务卡片
│   │   ├── portfolio/page.tsx        # "/portfolio"：6 个案例卡片
│   │   ├── contact/page.tsx          # "/contact"：咨询表单
│   │   └── api/contact/route.ts      # POST /api/contact：带限流接口
│   │
│   ├── components/
│   │   ├── layout/                   # 全局持久化布局组件
│   │   │   ├── Navbar.tsx            # 顶部固定导航：滚动感知背景、移动端汉堡菜单
│   │   │   └── Footer.tsx            # 三栏页脚：品牌、导航、联系方式
│   │   │
│   │   ├── sections/                 # 页面区块组件（由 page 组合）
│   │   │   ├── HeroSection.tsx       # 首屏：主标题、CTA、四项指标
│   │   │   ├── ServicesSection.tsx   # 2x3 服务卡网格（GlowCard）
│   │   │   ├── AboutSection.tsx      # 公司故事 + 4 列管理团队网格
│   │   │   ├── PortfolioSection.tsx  # 2x3 案例网格（标签 + 结果）
│   │   │   ├── ContactSection.tsx    # 表单：name/email/company/service/message
│   │   │   └── CtaSection.tsx        # 全宽渐变 CTA 横幅
│   │   │
│   │   └── ui/                       # 可复用展示组件
│   │       ├── Button.tsx            # 多变体按钮/链接（<Link>/<a>/<button>）
│   │       ├── GlowCard.tsx          # 渐变边框 + hover 光效卡片
│   │       └── SectionHeading.tsx    # h2 + 渐变分隔线 + 可选副标题
│   │
│   └── lib/                          # 公共工具与数据
│       ├── constants.ts              # 站点内容与语言包（导航、公司、服务、SEO、文案）
│       ├── types.ts                  # TypeScript 接口定义（默认 readonly）
│       └── logger.ts                 # 结构化日志（输出 stdout/stderr，不使用 console.log）
│
├── tailwind.config.ts                # 自定义色板、字体、动画
├── tsconfig.json                     # strict: true，路径别名 "@/*" -> "./src/*"
├── next.config.ts                    # Next.js 基础配置
├── postcss.config.mjs                # Tailwind + autoprefixer
├── next-env.d.ts                     # Next.js 类型引用（自动生成）
└── package.json                      # 脚本与依赖
```

## 命名约定

### 文件与目录

| 实体 | 约定 | 示例 |
|---|---|---|
| 页面/路由 | `kebab-case` 目录 + `page.tsx` | `about/page.tsx`, `api/contact/route.ts` |
| 组件 | `PascalCase.tsx` | `HeroSection.tsx`, `GlowCard.tsx` |
| lib 模块 | `kebab-case.ts` | `logger.ts`, `constants.ts` |
| 组件目录 | 按职责分组 | `layout/`, `sections/`, `ui/` |

### 代码标识符

| 实体 | 约定 | 示例 |
|---|---|---|
| 组件 | `PascalCase`，默认导出或具名导出 | `export function Navbar()` |
| 类型/接口 | `PascalCase`，使用实体语义命名 | `NavLink`, `ContactFormData`, `ApiResponse<T>` |
| 常量（数据） | `UPPER_SNAKE_CASE` | `NAV_LINKS`, `SERVICES`, `COMPANY` |
| 常量（配置） | `UPPER_SNAKE_CASE` | `RATE_LIMIT_WINDOW_MS`, `MAX_REQUESTS_PER_WINDOW` |
| 样式常量 | `UPPER_SNAKE_CASE` 字符串 | `BASE_STYLES`, `INPUT_STYLES`, `ERROR_STYLES` |
| 函数 | `camelCase` | `validateForm`, `isRateLimited`, `handleSubmit` |
| Props 接口 | `{ComponentName}Props` | `ButtonProps`, `GlowCardProps` |
| 回调 | `handle` + 事件语义 | `handleChange`, `handleScroll`, `handleSubmit` |
| 布尔状态 | `is` / `has` 前缀 | `isOpen`, `scrolled`, `isRateLimited` |

### CSS 类名

| 层级 | 约定 | 示例 |
|---|---|---|
| 自定义工具类 | 写在 globals.css 的 `@layer components` | `.gradient-text`, `.gradient-border`, `.glow`, `.bg-grid` |
| Tailwind 颜色命名 | `primary-*`, `accent-*`, `dark-*` | `text-primary`, `bg-dark-400`, `border-primary/10` |
| 动画命名 | `animate-{name}` | `animate-float`, `animate-glow-pulse`, `animate-slide-up` |

## TypeScript 约定

### 严格模式（无例外）

```typescript
// ✅ 推荐：不可变数据使用 readonly
export interface NavLink {
  readonly label: string;
  readonly href: string;
}

// ✅ 推荐：catch 使用 unknown，并通过 instanceof 收窄
catch (error: unknown) {
  const message = error instanceof Error ? error.message : "Unknown error";
}

// ❌ 禁止：any
// ❌ 禁止：非必要可变字段（除非对象是渐进式构建）
```

### 导入顺序（强制）

```typescript
// 1. React / Next.js 核心
import React, { useState, useCallback } from "react";
import Link from "next/link";

// 2. 第三方库（如有）

// 3. 本地模块（@/ 别名）
import { SERVICES } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
```

### 返回类型

- 所有导出函数都必须显式声明返回类型
- 组件返回 `React.ReactElement`
- API 路由返回 `Promise<NextResponse<ApiResponse>>`

### 不可变性

- 常量数组使用 `readonly T[]` 或 `as const`
- 接口字段默认 `readonly`（仅在渐进构建时允许可变，如 `ContactFormErrors`）
- 样式/配置映射使用 `Readonly<Record<K, V>>`

## 架构模式

### 组件层级

```text
layout.tsx
├── Navbar                  <- "use client"（滚动监听 + 移动菜单状态）
├── {page content}
│   └── *Section            <- 主要可服务端渲染；ContactSection 为 "use client"
│       └── ui/Button       <- 根据 href 渲染 <Link> / <a> / <button>
│       └── ui/GlowCard     <- 渐变边框伪元素容器
│       └── ui/SectionHeading <- h2 + 渐变强调线
└── Footer                  <- 可服务端渲染（纯静态）
```

### 数据流

```text
constants.ts（站点静态数据 + 语言包）
  -> page.tsx 组合 sections
    -> sections 引用 constants + ui 组件
      -> ContactSection: 表单状态 -> POST /api/contact -> logger.info()
```

- **静态数据**: 放在 `src/lib/constants.ts`，页面在构建期静态生成。
- **动态数据**: 仅存在于联系表单流程（客户端状态 -> 校验 -> POST API -> 服务端日志）。
- **无数据库、无外部 API 依赖**: 当前 `/api/contact` 仅记录日志，生产环境可接入邮件服务或数据库。

### API 设计

- **单一接口**: `POST /api/contact`
- **响应包结构**: `{ data: T | null, error: string | null, meta: { timestamp, status } }`
- **限流策略**: 内存限流，按 IP（`x-forwarded-for`）每 15 分钟最多 10 次
- **状态码**: `201`（创建成功）、`400`（参数错误）、`429`（限流）、`500`（服务错误）
- **错误处理**: `instanceof SyntaxError` 返回 400；其他异常返回 500

### 样式策略

1. 90% 场景使用 Tailwind 工具类
2. Tailwind 不易表达的效果用自定义类：`.gradient-border`、`.glow`、`.bg-grid`、`.bg-dots`
3. `tailwind.config.ts` 中维护主题 token：3 组颜色族 x 10 阶 + 4 组关键帧
4. 通过 `next/font` 注入 CSS 变量给 Tailwind：`var(--font-inter)`、`var(--font-jetbrains-mono)`

## 代码风格规则

### 项目规则

- **TypeScript strict**：禁止 `any`，使用 `unknown` + 类型收窄
- **函数长度** <= 40 行：超出请拆分子函数/子组件
- **优先 `const`**：尽量使用不可变绑定
- **导出项补全 JSDoc**：函数、组件、类型、接口
- **禁止 `console.log`**：统一使用 `@/lib/logger` 的 `logger.info()` / `logger.error()`
- **导入顺序**：标准库 -> 第三方 -> 本地模块（`@/*`）

### 代码评审中沉淀的实践

- **回调稳定性**：`useCallback` 优先空依赖 `[]` + 函数式更新，避免依赖整个 state 对象
- **表单提交**：从 `FormData` / event target 读取提交值，避免闭包引用旧 state
- **Button 组件策略**：内部链接用 `<Link>`，外链用 `<a target="_blank">`，无 href 用 `<button>`
- **接口限流**：接收用户输入的 API 必须配套限流
- **可访问性**：状态提示用 `role="alert"`；装饰元素用 `aria-hidden`；切换按钮用 `aria-expanded`；隐藏菜单项设 `tabIndex={-1}`
- **字体加载**：使用 `next/font/google` 且 `display: "swap"`，不要在 CSS 中 `@import`
- **错误处理**：`catch (error: unknown)` -> `instanceof` 收窄 -> 结构化日志 -> 返回用户安全提示

## 常见任务

### 新增页面

1. 新建 `src/app/{route}/page.tsx`
2. 导出 `metadata`（SEO）
3. 复用现有 section 或新增 `src/components/sections/` 组件
4. 在 `src/lib/constants.ts` 的 `NAV_LINKS` 中增加导航项

### 新增服务/案例/团队成员

直接编辑 `src/lib/constants.ts`，站点内容统一维护在类型化数组中（如 `SERVICES`、`PORTFOLIO`、`TEAM`）。

### 新增颜色或动画

1. 在 `tailwind.config.ts` 的 `theme.extend` 中新增 token
2. 复杂视觉效果写入 `src/app/globals.css` 的 `@layer components`

### 新增 API 端点

1. 新建 `src/app/api/{resource}/route.ts`
2. 导出命名函数：`GET`、`POST` 等
3. 使用 `@/lib/types` 的 `ApiResponse<T>` 并遵循 `{ data, error, meta }` 响应结构
4. 对接收用户输入的接口加限流
5. 使用 `logger` 记录日志
6. 返回正确 HTTP 状态码

### 使用 code-review 检查改动

在完成一个逻辑模块后，调用 `code-review` agent 检查以下内容：

- TypeScript strict 合规（无 `any`）
- 函数长度是否超限
- 导出项是否缺少 JSDoc
- 是否存在 `console.log`
- 安全问题（限流、输入校验、XSS）
- 可访问性（aria 属性、键盘可达）
- 性能问题（不稳定的 `useCallback` 依赖、重复内联样式常量）
