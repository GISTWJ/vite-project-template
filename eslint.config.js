/**
 * ESLint 配置文件
 * 支持 JavaScript 和 Vue 文件的代码规范检查
 *
 * 配置说明：
 * - 使用 ESLint 9.x 的 flat config 格式
 * - 集成 Vue 3 官方推荐规则
 * - 支持 Prettier 代码格式化
 * - 针对现代 JavaScript 和 Vue 3 Composition API 优化
 */

import js from '@eslint/js'
import configPrettier from 'eslint-config-prettier'
import pluginPrettier from 'eslint-plugin-prettier'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import vueEslintParser from 'vue-eslint-parser'

export default [
  // 忽略文件配置
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
      '*.min.js',
      'public/**',
      '.vite/**',
      '.vscode/**',
      '.idea/**',
      '*.log',
      'pnpm-lock.yaml',
      'package-lock.json',
      'yarn.lock'
    ]
  },

  // JavaScript 基础配置
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 2024, // 支持最新的 ECMAScript 特性
      sourceType: 'module', // 使用 ES 模块
      globals: {
        ...globals.browser, // 浏览器环境全局变量
        ...globals.node, // Node.js 环境全局变量
        ...globals.es2024, // ES2024 全局变量
        // 自定义全局变量
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        withDefaults: 'readonly',
        // Vite 相关
        import: 'readonly',
        importMeta: 'readonly'
      }
    },
    rules: {
      ...js.configs.recommended.rules, // 继承 JavaScript 推荐规则

      // === 基础规则 ===
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // 生产环境警告 console
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off', // 生产环境禁止 debugger
      'no-alert': 'warn', // 警告使用 alert
      'no-var': 'error', // 禁止使用 var
      'prefer-const': 'error', // 优先使用 const
      'no-unused-vars': 'warn', // 警告未使用的变量
      'no-undef': 'error', // 禁止使用未定义的变量

      // === 代码质量规则 ===
      eqeqeq: ['error', 'always'], // 强制使用 === 和 !==
      curly: ['error', 'all'], // 强制使用大括号
      'no-eval': 'error', // 禁止使用 eval
      'no-implied-eval': 'error', // 禁止隐式 eval
      'no-new-func': 'error', // 禁止使用 Function 构造函数
      'no-script-url': 'error', // 禁止使用 javascript: URL
      'no-sequences': 'error', // 禁止使用逗号操作符
      'no-throw-literal': 'error', // 禁止抛出字面量
      'no-unmodified-loop-condition': 'error', // 禁止循环条件不变
      'no-useless-call': 'error', // 禁止不必要的 call 和 apply
      'no-useless-concat': 'error', // 禁止不必要的字符串连接
      'no-useless-return': 'error', // 禁止不必要的 return
      'prefer-arrow-callback': 'error', // 优先使用箭头函数作为回调
      'prefer-template': 'error', // 优先使用模板字符串
      'template-curly-spacing': ['error', 'never'], // 模板字符串内禁止空格

      // === 代码风格规则 ===
      indent: [
        'error',
        2,
        {
          SwitchCase: 1, // switch 语句的 case 子句缩进
          VariableDeclarator: 1, // 变量声明缩进
          outerIIFEBody: 1, // 外层 IIFE 缩进
          MemberExpression: 1, // 成员表达式缩进
          FunctionDeclaration: { parameters: 1, body: 1 }, // 函数声明缩进
          FunctionExpression: { parameters: 1, body: 1 }, // 函数表达式缩进
          CallExpression: { arguments: 1 }, // 函数调用缩进
          ArrayExpression: 1, // 数组表达式缩进
          ObjectExpression: 1, // 对象表达式缩进
          ImportDeclaration: 1, // import 声明缩进
          flatTernaryExpressions: false, // 三元表达式不强制扁平化
          ignoredNodes: ['TemplateLiteral *'] // 忽略模板字符串
        }
      ],
      quotes: [
        'error',
        'single',
        {
          avoidEscape: true, // 避免转义
          allowTemplateLiterals: true // 允许模板字符串
        }
      ],
      semi: ['error', 'never'], // 禁止分号
      'comma-dangle': ['error', 'never'], // 禁止尾随逗号
      'comma-spacing': ['error', { before: false, after: true }], // 逗号间距
      'comma-style': ['error', 'last'], // 逗号风格
      'computed-property-spacing': ['error', 'never'], // 计算属性间距
      'func-call-spacing': ['error', 'never'], // 函数调用间距
      'key-spacing': ['error', { beforeColon: false, afterColon: true }], // 键值对间距
      'keyword-spacing': ['error', { before: true, after: true }], // 关键字间距
      'object-curly-spacing': ['error', 'always'], // 对象大括号间距
      'array-bracket-spacing': ['error', 'never'], // 数组方括号间距
      'space-before-blocks': ['error', 'always'], // 块前空格
      'space-before-function-paren': [
        'error',
        {
          anonymous: 'always', // 匿名函数
          named: 'never', // 命名函数
          asyncArrow: 'always' // 异步箭头函数
        }
      ],
      'space-in-parens': ['error', 'never'], // 圆括号内空格
      'space-infix-ops': 'error', // 操作符间距
      'space-unary-ops': ['error', { words: true, nonwords: false }], // 一元操作符间距
      'spaced-comment': ['error', 'always'], // 注释间距
      'arrow-spacing': ['error', { before: true, after: true }], // 箭头函数间距
      'block-spacing': ['error', 'always'], // 块间距
      'brace-style': ['error', '1tbs', { allowSingleLine: true }], // 大括号风格
      camelcase: ['error', { properties: 'never' }], // 驼峰命名
      'eol-last': ['error', 'always'], // 文件末尾换行
      'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }], // 限制空行
      'no-trailing-spaces': 'error', // 禁止尾随空格
      'no-whitespace-before-property': 'error', // 属性前禁止空格
      'padded-blocks': ['error', 'never'], // 块内禁止空行

      // === 最佳实践规则 ===
      'no-duplicate-imports': 'error', // 禁止重复导入
      'no-useless-rename': 'error', // 禁止不必要的重命名
      'object-shorthand': ['error', 'always'], // 对象简写
      'prefer-destructuring': [
        'error',
        {
          array: true, // 数组解构
          object: true // 对象解构
        }
      ],
      'prefer-rest-params': 'error', // 优先使用 rest 参数
      'prefer-spread': 'error', // 优先使用扩展操作符
      'rest-spread-spacing': ['error', 'never'], // rest/spread 操作符间距
      'sort-imports': [
        'error',
        {
          ignoreCase: false, // 忽略大小写
          ignoreDeclarationSort: true, // 忽略声明排序
          ignoreMemberSort: false, // 不忽略成员排序
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'] // 成员语法排序
        }
      ]
    }
  },

  // Vue 文件配置
  {
    files: ['**/*.vue'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      parser: vueEslintParser,
      globals: {
        ...globals.browser,
        ...globals.es2024,
        // Vue 3 全局变量
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        withDefaults: 'readonly',
        // Vite 相关
        import: 'readonly',
        importMeta: 'readonly'
      }
    },
    plugins: {
      vue: pluginVue,
      prettier: pluginPrettier
    },
    rules: {
      // === Vue 基础规则 ===
      'vue/multi-word-component-names': 'off', // 允许单单词组件名
      'vue/no-unused-vars': 'warn', // 警告未使用的变量
      'vue/no-multiple-template-root': 'off', // 允许多个根节点（Vue 3）
      'vue/no-v-model-argument': 'off', // 允许 v-model 参数（Vue 3）
      'vue/require-default-prop': 'off', // 不要求 prop 默认值
      'vue/require-explicit-emits': 'error', // 要求显式 emits
      'vue/require-prop-types': 'error', // 要求 prop 类型
      'vue/require-v-for-key': 'error', // 要求 v-for 的 key
      'vue/valid-v-for': 'error', // 验证 v-for 指令
      'vue/valid-v-if': 'error', // 验证 v-if 指令
      'vue/valid-v-model': 'error', // 验证 v-model 指令
      'vue/valid-v-on': 'error', // 验证 v-on 指令
      'vue/valid-v-show': 'error', // 验证 v-show 指令
      'vue/valid-v-slot': 'error', // 验证 v-slot 指令

      // === Vue 代码风格规则 ===
      'vue/html-indent': ['error', 2], // HTML 缩进
      'vue/html-quotes': ['error', 'double'], // HTML 引号
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always', // 自闭合标签
            normal: 'always',
            component: 'always'
          },
          svg: 'always',
          math: 'always'
        }
      ],
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: 3, // 单行最大属性数
          multiline: 1 // 多行最大属性数
        }
      ],
      'vue/multiline-html-element-content-newline': 'error', // 多行 HTML 元素内容换行
      'vue/mustache-interpolation-spacing': ['error', 'always'], // 插值间距
      'vue/no-multi-spaces': 'error', // 禁止多个空格
      'vue/no-spaces-around-equal-signs-in-attribute': 'error', // 属性等号周围禁止空格
      'vue/script-indent': ['error', 2, { baseIndent: 0 }], // script 缩进
      'vue/singleline-html-element-content-newline': 'off', // 单行 HTML 元素内容换行
      'vue/template-curly-spacing': ['error', 'never'], // 模板插值间距

      // === Vue 最佳实践规则 ===
      'vue/component-definition-name-casing': ['error', 'PascalCase'], // 组件名大小写
      'vue/component-name-in-template-casing': ['error', 'PascalCase'], // 模板中组件名大小写
      'vue/custom-event-name-casing': ['error', 'camelCase'], // 自定义事件名大小写
      'vue/define-macros-order': [
        'error',
        {
          order: ['defineProps', 'defineEmits'] // 宏定义顺序
        }
      ],
      'vue/html-comment-content-spacing': ['error', 'always'], // HTML 注释内容间距
      'vue/no-duplicate-attributes': 'error', // 禁止重复属性
      'vue/no-empty-component-block': 'error', // 禁止空组件块
      'vue/no-multiple-slot-args': 'error', // 禁止多个插槽参数
      'vue/no-static-inline-styles': 'warn', // 警告静态内联样式
      'vue/no-template-key': 'error', // 禁止模板中的 key
      'vue/no-useless-mustaches': 'error', // 禁止无用的插值
      'vue/no-useless-v-bind': 'error', // 禁止无用的 v-bind
      'vue/padding-line-between-blocks': ['error', 'always'], // 块之间空行
      'vue/prefer-separate-static-class': 'error', // 优先分离静态类
      'vue/prefer-true-attribute-shorthand': 'error', // 优先使用 true 属性简写
      'vue/require-prop-type-constructor': 'error', // 要求 prop 类型构造函数
      'vue/require-render-return': 'error', // 要求 render 函数返回值
      'vue/require-valid-default-prop': 'error', // 要求有效的默认 prop
      'vue/return-in-computed-property': 'error', // 计算属性中要求 return
      'vue/return-in-emits-validator': 'error', // emits 验证器中要求 return
      'vue/use-v-on-exact': 'error', // 使用精确的 v-on
      'vue/v-for-delimiter-style': ['error', 'in'], // v-for 分隔符风格
      'vue/valid-define-props': 'error', // 验证 defineProps
      'vue/valid-define-emits': 'error', // 验证 defineEmits
      'vue/valid-next-tick': 'error', // 验证 nextTick
      'vue/valid-template-root': 'error', // 验证模板根节点
      'vue/valid-v-bind-sync': 'error', // 验证 v-bind.sync
      'vue/valid-v-html': 'error', // 验证 v-html
      'vue/valid-v-text': 'error', // 验证 v-text

      // === Prettier 集成 ===
      'prettier/prettier': [
        'error',
        {
          semi: false, // 不使用分号
          singleQuote: true, // 使用单引号
          trailingComma: 'none', // 不使用尾随逗号
          tabWidth: 2, // 缩进宽度
          useTabs: false, // 使用空格缩进
          printWidth: 100, // 行宽
          endOfLine: 'auto', // 行尾符（兼容 Windows CRLF 与 Unix LF）
          arrowParens: 'avoid', // 箭头函数参数括号
          bracketSpacing: true, // 对象大括号间距
          jsxBracketSameLine: false, // JSX 大括号位置
          jsxSingleQuote: true, // JSX 使用单引号
          quoteProps: 'as-needed', // 对象属性引号
          vueIndentScriptAndStyle: false, // Vue 文件 script 和 style 缩进
          htmlWhitespaceSensitivity: 'ignore' // HTML 空白敏感度
        }
      ]
    }
  },

  // 继承 Prettier 配置（禁用与 Prettier 冲突的规则）
  configPrettier
]
