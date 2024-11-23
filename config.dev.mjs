import * as esbuild from 'esbuild'

const ctx = await esbuild.context({
    entryPoints: ['src/index.ts'],
    bundle: true,
    sourcemap: true,
    define: {
        __DEV__: 'true',
        __JEST__: 'false',
        __FIEND_DEV__: 'false'
    },
    loader: {
        '.png': 'file'
    },
    outdir: 'dist/output',
    publicPath: 'output',
})

await ctx.watch()