module.exports = {
    env: {
        es6: true,
        node: true
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module'
    },
    extends: [
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off', // TODO: This needs reviewing
        '@typescript-eslint/no-explicit-any': 'off', // TODO: This need reviewing
        '@typescript-eslint/no-var-requires': 'off', // TODO: This need reviewing
        '@typescript-eslint/no-empty-function': 'off', // TODO: This needs reviewing
        '@typescript-eslint/no-unused-vars': 'off', // TODO: This needs reviewing
        '@typescript-eslint/no-non-null-assertion': 'off', // TODO: This needs reviewing
        '@typescript-eslint/ban-ts-comment': 'off', // TODO: This needs reviewing
        'react/prop-types': 'off', // TODO: This needs reviewing
        'react/no-children-prop': 'off', // TODO: This needs reviewing
        'indent': [
            'error',
            4
            , { 'SwitchCase': 1 }
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        // TODO: this needs looking at.
        'no-unused-vars': 'off',
        /*'no-unused-vars': [
            'error',
            { 'argsIgnorePattern': '^_$'  }
        ],*/
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ],
        'object-curly-spacing': [
            'error', 'always'
        ],
        'no-trailing-spaces': [
            'error'
        ]
    },
    overrides: [
        {
            'files': ['*.ts', '*.tsx'],
            'rules': {
                '@typescript-eslint/semi': ['error'],
                'semi': 'off'
            }
        }
    ]
};
