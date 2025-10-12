/**
 * Prettier 配置文件
 * 与 ESLint 配置保持一致，确保代码格式化统一
 */

module.exports = {
  // 基础配置
  semi: false, // 不使用分号
  singleQuote: true, // 使用单引号
  trailingComma: 'none', // 不使用尾随逗号
  tabWidth: 2, // 缩进宽度
  useTabs: false, // 使用空格缩进

  // 行宽和换行
  printWidth: 100, // 行宽限制
  endOfLine: 'lf', // 行尾符（LF）

  // 括号和空格
  bracketSpacing: true, // 对象大括号内空格
  bracketSameLine: false, // 多行 JSX 元素的大括号位置
  arrowParens: 'avoid', // 箭头函数参数括号（单参数时避免）

  // 引号配置
  quoteProps: 'as-needed', // 对象属性引号（按需）
  jsxSingleQuote: true, // JSX 使用单引号

  // Vue 特定配置
  vueIndentScriptAndStyle: false, // Vue 文件 script 和 style 不缩进

  // HTML 配置
  htmlWhitespaceSensitivity: 'ignore', // HTML 空白敏感度

  // 其他配置
  embeddedLanguageFormatting: 'auto', // 嵌入式语言格式化
  singleAttributePerLine: false, // 单行多个属性
  proseWrap: 'preserve', // 散文换行保持
  insertPragma: false, // 不插入 pragma
  requirePragma: false, // 不要求 pragma

  // 文件类型配置
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 80,
        tabWidth: 2
      }
    },
    {
      files: '*.md',
      options: {
        printWidth: 80,
        proseWrap: 'always',
        tabWidth: 2
      }
    },
    {
      files: '*.yml',
      options: {
        tabWidth: 2
      }
    }
  ]
}
