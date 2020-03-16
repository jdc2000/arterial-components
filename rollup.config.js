import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import { readdirSync, statSync } from 'fs';
import { resolve as resolvePath } from 'path';

const PACKAGES = 'packages';
export default readdirSync(PACKAGES)
  .map(pkg => {
    const filepath = resolvePath(PACKAGES, pkg);
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
      input: resolvePath(filepath, 'index.js'),
      output: [
        {
          file: resolvePath(filepath, 'dist/index.js'),
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
            ['@babel/preset-react', { useBuiltIns: true }]
          ]
        }),
        terser()
      ]
    };
  })
  .filter(opt => opt);
