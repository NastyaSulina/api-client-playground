import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'
import prettier from 'eslint-plugin-prettier/recommended'
import { defineConfig, globalIgnores } from 'eslint/config'

const ROOT = process.cwd()

export default defineConfig([
    globalIgnores(['dist', 'node_modules']),
    {
        files: ['src/**/*.{ts,tsx}', 'shared/**/*.{ts,tsx}'],
        extends: [
            js.configs.recommended,
            ...tseslint.configs.recommendedTypeChecked,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
            reactX.configs['recommended-typescript'],
            reactDom.configs.recommended,
            prettier,
        ],
        languageOptions: {
            globals: globals.browser,
            parserOptions: {
                project: ['./tsconfig.app.json', './tsconfig.node.json'],
                tsconfigRootDir: ROOT,
            },
        },
        rules: {
            'prettier/prettier': ['error'],
        },
    },
    {
        files: ['server/**/*.{ts,tsx}'],
        extends: [js.configs.recommended, ...tseslint.configs.recommendedTypeChecked, prettier],
        languageOptions: {
            globals: globals.node,
            parserOptions: {
                project: ['./server/tsconfig.json'],
                tsconfigRootDir: ROOT,
            },
        },
        rules: {
            '@typescript-eslint/no-floating-promises': 'error',
            '@typescript-eslint/await-thenable': 'error',
            '@typescript-eslint/no-misused-promises': 'error',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                },
            ],

            '@typescript-eslint/no-explicit-any': 'warn',
            'no-console': 'off',
        },
    },
])
