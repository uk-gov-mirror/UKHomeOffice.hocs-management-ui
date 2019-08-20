module.exports = {
    'env': {
        'es6': true,
        'node': true
    },
    'extends': [
        'airbnb',
        'eslint:recommended',
        'plugin:react/recommended'
    ],
    'parser': 'babel-eslint',
    'parserOptions': {
        'ecmaVersion': 2018,
        'sourceType': 'module'
    },
    'rules': {
        'react/forbid-prop-types': false,
        'import/extensions': false
    },
    'overrides': [
        {
            'files': [ '**/__tests__/**' ],
            'env': {
                'jest': true
            },
            'globals': {
                'render': false,
                'shallow': false,
                'wrapper': false,
                'mount': false
            }
        },
        {
            'files': [ '**/__snapshots__/**' ],
            'excludedFiles': '*.js.snap'
        },
        {
            'files': [ 'src/**' ],
            'env': {
                'commonjs': true
            }
        }
    ]
};
