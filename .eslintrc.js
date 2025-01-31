module.exports = {
  root: true,
  extends: [
    '@react-native',
    'plugin:react/recommended',
    'airbnb',
    'prettier',
    'prettier/react',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'react-native'],
  rules: {
    'ban-ts-comment': 0,
    'react/react-in-jsx-scope': 0,
    'react/function-component-definition': 0,
    'import/prefer-default-export': 0,
    'react/jsx-props-no-spreading': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'no-param-reassign': 0,
    'react/require-default-props': 0,
    'no-console': 0,
    'no-nested-ternary': 0,
    'no-plusplus': 0,
  },
};
