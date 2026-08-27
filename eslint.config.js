import { globalIgnores } from 'eslint/config'
import pluginVue from 'eslint-plugin-vue'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default defineConfigWithVueTs(
  globalIgnores(['dist/**', 'node_modules/**']),
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,vue}'],
  },
  pluginVue.configs['flat/recommended'],
  vueTsConfigs.recommended,
  {
    name: 'app/rules',
    rules: {
      // Props are typed as optional via `defineProps`; a runtime default is not wanted.
      'vue/require-default-prop': 'off',
    },
  },
  {
    // shadcn-vue primitives are intentionally single-word (Card, Button, Badge).
    name: 'app/ui-primitives',
    files: ['src/components/ui/**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
  // Must stay last: turns off every rule Prettier already handles.
  skipFormatting,
)
