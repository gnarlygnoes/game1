import {defineConfig} from 'vite'
import {configDefaults} from 'vitest/config'

export default defineConfig({
  define: {
    __DEV__: JSON.stringify(true),
    __FIEND_DEV__: false,
    __VITEST__: JSON.stringify(process.env.NODE_ENV === 'test'),
  },
  test: {
    exclude: [...configDefaults.exclude, 'cottontail-js'],
  },
})
