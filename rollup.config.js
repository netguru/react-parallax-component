import postcss from 'rollup-plugin-postcss';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import jsx from 'rollup-plugin-jsx';

const plugins = [
  postcss(),
  resolve({ jsnext: true }),
  commonjs(),
  jsx({ factory: 'React.createElement' }),
];

export default {
  dest: 'dist/index.js',
  entry: 'src/index.jsx',
  moduleName: 'react-parallax-component',
  format: 'es',
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
