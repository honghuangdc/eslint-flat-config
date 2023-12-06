import globals from 'globals';
import jsRules from '@eslint/js';
import type { FlatESLintConfig } from 'eslint-define-config';
import { GLOB_SRC, GLOB_SRC_EXT, GLOB_TESTS } from '../constants/glob';

export function createJsConfig() {
  const js: FlatESLintConfig[] = [
    {
      languageOptions: {
        globals: {
          ...globals.browser,
          ...globals.es2021,
          ...globals.node
        },
        parserOptions: {
          ecmaFeatures: {
            jsx: true
          },
          sourceType: 'module'
        }
      },
      rules: {
        ...jsRules.configs.all.rules,
        'accessor-pairs': ['error', { enforceForClassMembers: true, setWithoutGet: true }],
        camelcase: 'off',
        'capitalized-comments': 'off',
        'dot-notation': ['error', { allowKeywords: true }],
        'func-style': 'off',
        'id-length': 'off',
        'init-declarations': 'off',
        'max-classes-per-file': 'off',
        'max-lines': 'off',
        'max-lines-per-function': 'off',
        'max-statements': 'off',
        'multiline-comment-style': 'off',
        'new-cap': ['error', { newIsCap: true, capIsNew: false, properties: true }],
        'no-console': 'warn',
        'no-duplicate-imports': 'off',
        'no-empty': ['error', { allowEmptyCatch: true }],
        'no-labels': ['error', { allowLoop: false, allowSwitch: false }],
        'no-magic-numbers': 'off',
        'no-mixed-operators': [
          'error',
          {
            groups: [
              ['+', '-', '*', '/', '%', '**'],
              ['&', '|', '^', '~', '<<', '>>', '>>>'],
              ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
              ['&&', '||'],
              ['in', 'instanceof']
            ],
            allowSamePrecedence: true
          }
        ],
        'no-negated-condition': 'off',
        'no-redeclare': ['error', { builtinGlobals: false }],
        'no-restricted-globals': [
          'error',
          { message: 'Use `globalThis` instead.', name: 'global' },
          { message: 'Use `globalThis` instead.', name: 'self' }
        ],
        'no-restricted-properties': [
          'error',
          {
            message: 'Use `Object.getPrototypeOf` or `Object.setPrototypeOf` instead.',
            property: '__proto__'
          },
          {
            message: 'Use `Object.defineProperty` instead.',
            property: '__defineGetter__'
          },
          {
            message: 'Use `Object.defineProperty` instead.',
            property: '__defineSetter__'
          },
          {
            message: 'Use `Object.getOwnPropertyDescriptor` instead.',
            property: '__lookupGetter__'
          },
          {
            message: 'Use `Object.getOwnPropertyDescriptor` instead.',
            property: '__lookupSetter__'
          }
        ],
        'no-restricted-syntax': [
          'error',
          'DebuggerStatement',
          'LabeledStatement',
          'WithStatement',
          'TSEnumDeclaration[const=true]',
          'TSExportAssignment'
        ],
        'no-self-assign': ['error', { props: true }],
        'no-ternary': 'off',
        'no-undefined': 'off',
        'no-unneeded-ternary': ['error', { defaultAssignment: false }],
        'no-unused-expressions': [
          'error',
          {
            allowShortCircuit: true,
            allowTaggedTemplates: true,
            allowTernary: true
          }
        ],
        'no-unused-vars': [
          'error',
          {
            vars: 'all',
            args: 'all',
            ignoreRestSiblings: false,
            varsIgnorePattern: '^_',
            argsIgnorePattern: '^_'
          }
        ],
        'no-use-before-define': ['error', { functions: false, classes: false, variables: true }],
        'object-shorthand': [
          'error',
          'always',
          {
            ignoreConstructors: false,
            avoidQuotes: true
          }
        ],
        'one-var': ['error', 'never'],
        'prefer-arrow-callback': [
          'error',
          {
            allowNamedFunctions: false,
            allowUnboundThis: true
          }
        ],
        'prefer-const': [
          'error',
          {
            destructuring: 'all',
            ignoreReadBeforeAssign: true
          }
        ],
        'prefer-destructuring': 'off',
        'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
        'require-await': 'off',
        'require-unicode-regexp': 'off',
        'sort-imports': [
          'error',
          {
            allowSeparatedGroups: false,
            ignoreCase: false,
            ignoreDeclarationSort: true,
            ignoreMemberSort: false,
            memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single']
          }
        ],
        'sort-keys': 'off',
        'spaced-comment': [
          'error',
          'always',
          {
            line: { markers: ['*package', '!', '/', ',', '='] },
            block: {
              balanced: true,
              markers: ['*package', '!', ',', ':', '::', 'flow-include'],
              exceptions: ['*']
            }
          }
        ],
        'unicode-bom': ['error', 'never']
      }
    },
    {
      files: [`**/scripts/${GLOB_SRC}`, `**/cli.${GLOB_SRC_EXT}`],
      rules: {
        'no-console': 'off'
      }
    },
    {
      files: GLOB_TESTS,
      rules: {
        'no-unused-expressions': 'off'
      }
    }
  ];

  return js;
}
