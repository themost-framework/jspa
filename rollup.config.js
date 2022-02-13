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
        external: Object.keys(pkg.dependencies).concat(Object.keys(pkg.peerDependencies)),
        plugins: [typescript()]
    },
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/index.esm.js',
            format: 'esm',
            sourcemap: true
        },
        external: Object.keys(pkg.dependencies).concat(Object.keys(pkg.peerDependencies)),
        plugins: [typescript(
        )]
    },
    {
        input: 'listener/src/index.ts',
        output: {
            dir: 'listener/dist',
            format: 'cjs',
            sourcemap: true
        },
        plugins: [typescript({
            tsconfig: './listener/tsconfig.json'
        })]
    },
    {
        input: 'listener/src/index.ts',
        output: {
            file: 'listener/dist/index.esm.js',
            format: 'esm',
            sourcemap: true
        },
        plugins: [typescript({
            tsconfig: './listener/tsconfig.json'
        })]
    }
];