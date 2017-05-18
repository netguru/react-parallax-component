import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import jsx from 'rollup-plugin-jsx';

const plugins = [
  postcss(),
  resolve({ jsnext: true }),
  commonjs(),
];

if (process.env.TYPE !== 'next') {
  plugins.push(babel({
    exclude: 'node_modules/**',
  }));
} else {
  plugins.push(jsx({ factory: 'React.createElement' }));
}

export default {
  dest: `dist/index.${process.env.TYPE || 'es5'}.js`,
  entry: 'src/index.jsx',
  moduleName: 'react-parallax-component',
  format: process.env.TYPE !== 'next' ? 'umd' : 'es',
  plugins,
  external: ['react', 'prop-types', 'lodash/throttle'],
  globals: {
    react: 'React',
    'prop-types': 'PropTypes',
    'lodash/throttle': 'lodash/throttle',
  },
  sourceMap: true,
  acorn: {
    allowReserved: true,
    ecmaVersion: 8,
  },
};
