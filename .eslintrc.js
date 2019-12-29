module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
    ],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    rules: {
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_|^req|^next' }],
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/explicit-function-return-type': 0,
        'react/prop-types': 0,
        'react/jsx-no-target-blank': 0,
        '@typescript-eslint/no-use-before-define': 0,
        'no-console': ['error', { allow: ['warn', 'error'] }],
        '@typescript-eslint/member-ordering': [
            'error',
            {
                default: ['public-static-field', 'static-field', 'instance-field'],
                classExpressions: ['public-instance-method', 'public-static-field'],
            },
        ],
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
