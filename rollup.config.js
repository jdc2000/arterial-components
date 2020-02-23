import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import { readdirSync, statSync } from 'fs';
import { resolve as pathResolve } from 'path';

const PACKAGES = 'packages';
export default readdirSync(PACKAGES)
  .map(pkg => {
    const filepath = pathResolve(PACKAGES, pkg);
    const stat = statSync(filepath);
    if (!stat.isDirectory()) {
      return null;
    }
    const external = ['react', 'prop-types', 'classnames'];
    if (pkg === 'menu-surface') {
      external.push('react-dom');
    }
    if (pkg === 'typeahead') {
      external.push('fuse.js', 'react-dom');
    }
    return {
      external,
      input: pathResolve(filepath, 'index.js'),
      output: [
        {
          file: pathResolve(filepath, 'dist/index.js'),
          format: 'esm'
        }
      ],
      plugins: [
        resolve(),
        babel({
          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: 'entry',
                corejs: 3,
                modules: false,
                exclude: ['transform-typeof-symbol']
              }
            ],
            ['@babel/preset-react', { development: true, useBuiltIns: true }]
          ]
        })
      ]
    };
  })
  .filter(opt => opt);
