
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import createBanner from 'create-banner'
import changeCase from 'change-case'
import alias from 'rollup-plugin-alias'
import path from 'path'
const resolve = p => path.resolve(__dirname, p)
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
    format: 'umd',
    name: 'mcommon'
  },
  cache: true,
  plugins: [
    alias({
      '@': resolve('src')
    }),
    babel({
      exclude: 'node_modules/**' // 排除引入的库
    }),
    uglify()
  ]
}
