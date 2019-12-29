import typescript from 'rollup-plugin-typescript2';
import scss from 'rollup-plugin-scss';
import pkg from './package.json';
import { uglify } from 'rollup-plugin-uglify';
// import fs from 'fs';

const plugins = [
    typescript({
        typescript: require('typescript'),
    }),
    scss({
        output: false,
    }), 
];

if (process.env.BUILD === 'production') {
    plugins.push(
        uglify({
            nameCache: {},
        }),
    );
}

// scss({
//     output: function(styles, styleNodes) {
//         fs.writeFileSync('dist/index.css', styles);
//         fs.writeFileSync('example/src/react-html-layout/index.css', styles);
//     },
// }),

export default [
    {
        input: 'src/index.ts',
        dest: 'index.js',
        external: Object.keys(pkg.peerDependencies || {}),
        plugins,
        output: [
            { file: pkg.main, format: 'cjs' },
            { file: pkg.module, format: 'esm' },
            {
                file: 'example/src/i2ui/index.js',
                format: 'es',
                banner: '/* eslint-disable */',
            },
        ],
    },
];
