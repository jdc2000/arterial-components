import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import fs from 'fs';
import path from 'path';

const PACKAGES = 'packages';
export default fs
  .readdirSync(PACKAGES)
  .map(pkg => {
    const filepath = path.resolve(PACKAGES, pkg);
    const stat = fs.statSync(filepath);
    if (!stat.isDirectory()) {
      return null;
    }
    const external = ['react', 'prop-types', 'classnames'];
    if (pkg === 'menu-surface') {
      external.push('react-dom');
    }
    if (pkg === 'select') {
      external.push('react-dom', 'uuid');
    }
    if (pkg === 'typeahead') {
      external.push('fuse.js', 'react-dom');
    }
    return {
      external,
      input: path.resolve(filepath, 'index.js'),
      output: [
        {
          file: path.resolve(filepath, 'dist/index.js'),
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
            ['@babel/preset-react', { development: false, useBuiltIns: true }]
          ],
          plugins: [
            ['@babel/plugin-proposal-object-rest-spread', { useBuiltIns: true }]
          ]
        }),
        terser()
      ]
    };
  })
  .filter(opt => opt);
