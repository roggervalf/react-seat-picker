import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import sass from 'rollup-plugin-sass'
//import autoprefixer from 'autoprefixer'
import postcss from 'rollup-plugin-postcss'
//import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'
import url from 'rollup-plugin-url'
import svgr from '@svgr/rollup'
//import cssnano from 'cssnano'

// postCSS plugins

import simplevars from 'postcss-simple-vars'
import nested from 'postcss-nested'

import pkg from './package.json'

// const sassOptions = {
//   output(styles, styleNodes) {
//     fs.mkdirSync('dist/css', { recursive: true }, (err) => {
//       if (err) {
//         throw err;
//       }
//     });

//     styleNodes.forEach(({ id, content }) => {
//       const scssName = id.substring(id.lastIndexOf('/') + 1, id.length);
//       const name = scssName.split('.')[0];
//       fs.writeFileSync(`dist/css/${name}.css`, content);
//     });
//   },
//   processor: css => postcss([
//     autoprefixer({
//       grid: false
//     }),
//     cssnano()
//   ])
//     .process(css)
//     .then(result => result.css)
// };

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    }
  ],
  plugins: [
    external(),
    postcss({
      plugins:[
        simplevars(),
        nested(),
      ],
      modules: true
    }),
    sass({insert:true}),
    url(),
    svgr(),
    babel({
      exclude: 'node_modules/**',
      plugins: [ 'external-helpers' ]
    }),
    resolve(),
    commonjs()
  ]
}
