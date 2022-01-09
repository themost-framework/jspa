import typescript from '@rollup/plugin-typescript';
import * as pkg from './package.json';
export default [
    {
        input: 'src/index.ts',
        output: {
            dir: 'dist',
            format: 'cjs',
            sourcemap: true
        },
        external: Object.keys(pkg.dependencies),
        plugins: [typescript()]
    },
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/index.esm.js',
            format: 'esm',
            sourcemap: true
        },
        external: Object.keys(pkg.dependencies),
        plugins: [typescript()]
    }
];