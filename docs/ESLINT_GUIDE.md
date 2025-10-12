# ESLint 配置指南

本项目使用 ESLint 9.x 的 flat config 格式，集成了 Vue
3、Prettier 和现代 JavaScript 的最佳实践。

## 📋 配置文件说明

### 主要配置文件

- `eslint.config.js` - ESLint 主配置文件
- `.eslintignore` - 忽略文件配置
- `.prettierrc.cjs` - Prettier 格式化配置
- `.vscode/settings.json` - VSCode 编辑器配置
- `.vscode/extensions.json` - 推荐扩展配置

## 🚀 快速开始

### 安装依赖

```bash
pnpm install
```

### 运行命令

```bash
# 检查代码规范（不修复）
pnpm run lint:check

# 检查并自动修复代码规范
pnpm run lint

# 格式化代码
pnpm run format

# 检查代码格式
pnpm run format:check

# 同时执行 lint 和 format
pnpm run lint:format
```

## 📝 规则说明

### JavaScript 规则

#### 基础规则

- `no-console` - 生产环境警告 console 使用
- `no-debugger` - 生产环境禁止 debugger
- `no-var` - 禁止使用 var，优先使用 let/const
- `prefer-const` - 优先使用 const
- `eqeqeq` - 强制使用 === 和 !==

#### 代码质量规则

- `no-eval` - 禁止使用 eval
- `no-implied-eval` - 禁止隐式 eval
- `no-new-func` - 禁止使用 Function 构造函数
- `prefer-arrow-callback` - 优先使用箭头函数
- `prefer-template` - 优先使用模板字符串

#### 代码风格规则

- `indent` - 2 空格缩进
- `quotes` - 使用单引号
- `semi` - 不使用分号
- `comma-dangle` - 不使用尾随逗号
- `object-curly-spacing` - 对象大括号内空格
- `array-bracket-spacing` - 数组方括号内无空格

### Vue 规则

#### 基础规则

- `vue/multi-word-component-names` - 允许单单词组件名
- `vue/no-unused-vars` - 警告未使用的变量
- `vue/require-explicit-emits` - 要求显式 emits
- `vue/require-prop-types` - 要求 prop 类型

#### 代码风格规则

- `vue/html-indent` - HTML 2 空格缩进
- `vue/html-quotes` - HTML 使用双引号
- `vue/html-self-closing` - 自闭合标签
- `vue/max-attributes-per-line` - 限制每行属性数量
- `vue/script-indent` - script 2 空格缩进

#### 最佳实践规则

- `vue/component-definition-name-casing` - 组件名 PascalCase
- `vue/component-name-in-template-casing` - 模板中组件名 PascalCase
- `vue/custom-event-name-casing` - 自定义事件名 camelCase
- `vue/define-macros-order` - 宏定义顺序

## 🎨 Prettier 集成

### 配置特点

- 与 ESLint 规则保持一致
- 支持 Vue 文件格式化
- 自动处理换行和缩进
- 统一引号和分号使用

### 格式化规则

```javascript
{
  semi: false,           // 不使用分号
  singleQuote: true,     // 使用单引号
  trailingComma: 'none', // 不使用尾随逗号
  tabWidth: 2,           // 2 空格缩进
  printWidth: 100,       // 行宽限制 100
  endOfLine: 'lf'        // 使用 LF 换行符
}
```

## 🔧 VSCode 集成

### 推荐扩展

- ESLint - 代码规范检查
- Prettier - 代码格式化
- Vue Language Features (Volar) - Vue 3 支持
- Auto Rename Tag - 自动重命名标签

### 自动格式化

- 保存时自动格式化
- 粘贴时自动格式化
- 保存时自动修复 ESLint 错误

## 📁 忽略文件

以下文件和目录会被 ESLint 忽略：

```
node_modules/          # 依赖目录
dist/                  # 构建输出
.vite/                 # Vite 缓存
*.min.js              # 压缩文件
public/                # 静态资源
*.config.js           # 配置文件
```

## 🐛 常见问题

### 1. ESLint 不工作

- 确保安装了所有依赖
- 检查 VSCode 是否安装了 ESLint 扩展
- 重启 VSCode 编辑器

### 2. Prettier 与 ESLint 冲突

- 确保安装了 `eslint-config-prettier`
- 检查配置文件中是否正确继承了 Prettier 配置

### 3. Vue 文件格式化问题

- 确保安装了 `vue.volar` 扩展
- 检查 VSCode 设置中的默认格式化程序

### 4. 自动修复不工作

- 检查 `package.json` 中的脚本命令
- 确保文件没有被 `.eslintignore` 忽略

## 📚 相关文档

- [ESLint 官方文档](https://eslint.org/)
- [Vue ESLint 插件](https://eslint.vuejs.org/)
- [Prettier 官方文档](https://prettier.io/)
- [VSCode ESLint 扩展](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## 🤝 贡献指南

1. 确保代码通过 ESLint 检查
2. 使用 Prettier 格式化代码
3. 遵循项目的代码规范
4. 提交前运行 `pnpm run lint:format`

---

如有问题，请查看项目文档或提交 Issue。
