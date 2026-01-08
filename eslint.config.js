import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';

export default defineConfig(
  
  {
    ignores: ['dist/**', 'node_modules/**', 'coverage/**', 'build/**', 'webpack.config.js', 'eslint*'],
  },

  
  js.configs.recommended,
  ...tseslint.configs.strict,    
  ...tseslint.configs.stylistic, 

  
  {
    files: ['**/*.ts', '**/*.js'],
    plugins: {
      '@stylistic': stylistic,
      'import': importPlugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        
        project: true, 
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
    },
    settings: {
      'import/resolver': {
       
        typescript: true,
        node: true,
      },
    },
    rules: {
     
      'arrow-body-style': ['error', 'as-needed'],      
      'no-param-reassign': ['error', { props: true }],
      'no-var': 'error',
      'prefer-const': 'error',

      

      
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      
      '@typescript-eslint/no-explicit-any': 'error',
      
      '@typescript-eslint/no-unused-vars': ['error', { 
        args: 'all', 
        argsIgnorePattern: '^_', 
        varsIgnorePattern: '^_', 
      }],
      
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],

     
      'import/order': ['error', { 
        'newlines-between': 'always',
        'alphabetize': { 'order': 'asc' } 
      }],
      'import/no-duplicates': 'error',
      
      'import/prefer-default-export': 'off',

      
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/indent': ['error', 2],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/arrow-parens': ['error', 'always'],
      '@stylistic/member-delimiter-style': ['error', {
        multiline: { delimiter: 'semi', requireLast: true },
        singleline: { delimiter: 'semi', requireLast: false },
      }],
      
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          ts: 'never',
          scss: 'always', 
        },
      ],
      
      'import/no-unresolved': ['error', { ignore: ['\\.scss$', '\\.sass$', '\\.css$'] }],
    },
  },
);
