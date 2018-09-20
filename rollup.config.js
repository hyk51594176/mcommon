
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import VuePlugin from 'rollup-plugin-vue'
import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import createBanner from 'create-banner'
import changeCase from 'change-case'
const pkg = require('./package')
const name = changeCase.pascalCase(pkg.name.replace('@hanyk/', ''))
const banner = createBanner({
  data: {
    name: `${name}.js`,
    year: '2018-present'
  }
})
export default {
  input: 'src/index.js',
  output: {
    banner,
    file: 'dist/index.js',
    format: 'cjs',
    name
  },
  cache: true,
  plugins: [
    VuePlugin(),
    postcss({
      plugins: [autoprefixer, cssnano],
      extensions: ['.css']
    }),
    babel({
      exclude: 'node_modules/**' // 排除引入的库
    }),
    uglify()
  ]
}
