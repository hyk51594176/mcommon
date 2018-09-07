import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import VuePlugin from 'rollup-plugin-vue'
import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'

// import cssnano from 'cssnano';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
    name: 'mcommon'
  },
  cache: true,
  // external: [
  //   'element-ui/lib/'
  // ],
  plugins: [
    VuePlugin(),
    commonjs({
      include: 'node_modules/**' // 包括
    }),
    postcss({
      plugins: [autoprefixer, cssnano]
      // extensions: [ '.less' ],
    }),
    babel({
      exclude: 'node_modules/**' // 排除引入的库
    }),
    uglify()
  ]
}
