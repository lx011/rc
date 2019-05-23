import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import sourceMaps from 'rollup-plugin-sourcemaps';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import { terser } from 'rollup-plugin-terser';
import fileSize from 'rollup-plugin-filesize';
// import rollupReplace from 'rollup-plugin-replace';

const pkg = require('./package.json');

export default [
  {
    input: pkg.source,
    output: [
      {
        file: pkg.main,
        format: 'esm',
        sourcemap: true
      }
    ],
    plugins: [
      external({
        includeDependencies: true
      }),
      postcss({
        // modules: true,
        extract: true,
        minimize: true,
        plugins: [
          autoprefixer()
        ]
      }),
      typescript({
        // clean: true,
        exclude: [
          '*.d.ts',
          '**/*.d.ts',
          '**/*.story.tsx'
        ]
      }),
      resolve(),
      sourceMaps(),
      terser({
        toplevel: true
      }),
      fileSize()
    ]
  }
];