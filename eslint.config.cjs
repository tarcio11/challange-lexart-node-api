module.exports = [
  {
    ...require('eslint-config-love'),
    files: ['**/*.js', '**/*.ts'],
    rules: {
      "@typescript-eslint/consistent-type-definitions": "off",
    }
  },
]
