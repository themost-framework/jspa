import typescript from '@rollup/plugin-typescript';
import * as pkg from './package.json';
import path from 'path';

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
        input: path.resolve(process.cwd(), 'listener/src/index.ts'),
        output: {
            dir: 'listener/dist',
            format: 'cjs',
            sourcemap: true
        },
        external: [ '@themost/jspa', '@themost/common' ],
        plugins: [
            typescript({
                tsconfig: path.resolve(process.cwd(), 'listener/tsconfig.lib.json'),
                declaration: true,
                declarationDir: 'listener/dist/'
            })]
    },
    {
        input: 'listener/src/index.ts',
        output: {
            file: 'listener/dist/index.esm.js',
            format: 'esm',
            sourcemap: true
        },
        external: [ '@themost/jspa', '@themost/common' ],
        plugins: [typescript({
            tsconfig: path.resolve(process.cwd(), 'listener/tsconfig.lib.json')
        })]
    }
];