import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import jsx from 'rollup-plugin-jsx';

const plugins = [
  postcss(),
  resolve({ jsnext: true }),
];

if (process.env.TYPE !== 'next') {
  plugins.push(babel());
} else {
  plugins.push(jsx({ factory: 'React.createElement' }));
}

export default {
  dest: `dist/index.${process.env.TYPE || 'es5'}.js`,
  entry: 'src/index.jsx',
  moduleName: 'react-parallax-component',
  format: process.env.TYPE !== 'next' ? 'umd' : 'es',
  plugins,
  external: ['react', 'prop-types'],
  globals: {
    react: 'React',
    'prop-types': 'PropTypes',
  },
  sourceMap: true,
  acorn: {
    allowReserved: true,
    ecmaVersion: 8,
  },
};
