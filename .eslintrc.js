module.exports = {
    // parserに'vue-eslint-parser'を指定し、'@typescript-eslint/parser'はparserOptionsに指定する
    // parser:  'vue-eslint-parser',
    // parserOptions: {
    //     'parser': '@typescript-eslint/parser',
    // },
    // extends:  [
    //     // 'plugin:@typescript-eslint/recommended',
    //     // 'plugin:vue/recommended',
    //     // 'prettier/@typescript-eslint',
    //     // 'plugin:prettier/recommended',
    //     "plugin:vue/essential",
    //     "@vue/prettier",
    //     "@vue/typescript"
    // ],
    root: true,
    env: {
      node: true
    },
    extends: ["plugin:vue/essential", "@vue/prettier", "@vue/typescript"],
    rules: {
      "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
    },
    parserOptions: {
      parser: "@typescript-eslint/parser"
    },
    rules: {
        'prettier/prettier': [
            'error',
            {
                'singleQuote': true,
                'semi': true,
                'trailingComma': 'all',
            }
        ]
    }

}