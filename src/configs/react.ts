import type { FlatESLintConfig } from 'eslint-define-config';
import { isPackageExists } from 'local-pkg';
import { ensurePackages, interopDefault } from '../shared';
import { GLOB_JSX, GLOB_TSX } from '../constants/glob';

export async function createReactConfig(enable?: boolean, reactNative?: boolean) {
  if (!enable && !reactNative) return [];

  await ensurePackages(['eslint-plugin-react', 'eslint-plugin-react-hooks', 'eslint-plugin-react-refresh']);
  if (reactNative) {
    await ensurePackages(['eslint-plugin-react-native']);
  }

  const [pluginReact, pluginReactHooks, pluginReactRefresh] = await Promise.all([
    interopDefault(import('eslint-plugin-react')),
    interopDefault(import('eslint-plugin-react-hooks')),
    interopDefault(import('eslint-plugin-react-refresh'))
  ] as const);

  // react refresh
  const ReactRefreshAllowConstantExportPackages = ['vite'];

  const isAllowConstantExport = ReactRefreshAllowConstantExportPackages.some(i => isPackageExists(i));

  const files = [GLOB_JSX, GLOB_TSX];

  const configs: FlatESLintConfig[] = [
    {
      plugins: {
        react: pluginReact,
        'react-hooks': pluginReactHooks,
        'react-refresh': pluginReactRefresh
      },
      settings: {
        react: {
          version: 'detect'
        }
      }
    },
    {
      files,
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true
          }
        }
      },
      rules: {
        // recommended rules react-hooks
        'react-hooks/exhaustive-deps': 'warn',
        'react-hooks/rules-of-hooks': 'error',

        // react refresh
        'react-refresh/only-export-components': ['warn', { allowConstantExport: isAllowConstantExport }],

        ...pluginReact.configs.recommended.rules,
        // react runtime
        'react/react-in-jsx-scope': 'off',
        'react/jsx-uses-react': 'off'
      }
    }
  ];

  if (reactNative) {
    const pluginReactNative = await interopDefault(import('eslint-plugin-react-native'));

    const reactNativeConfig: FlatESLintConfig[] = [
      {
        plugins: {
          'react-native': pluginReactNative
        }
      },
      {
        files,
        languageOptions: {
          parserOptions: {
            ecmaFeatures: {
              jsx: true
            }
          },
          globals: {
            ...pluginReactNative.environments['react-native'].globals
          }
        },
        rules: {
          ...pluginReactNative.configs.all.rules
        }
      }
    ];

    configs.push(...reactNativeConfig);
  }

  return configs;
}
