import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import fs from 'fs';
import path from 'path';

const PACKAGES = 'packages';
export default fs
  .readdirSync(PACKAGES)
  .map((pkg) => {
    const filepath = path.resolve(PACKAGES, pkg);
    const stat = fs.statSync(filepath);
    if (!stat.isDirectory()) {
      return null;
    }
    const external = ['react', 'prop-types', 'classnames'];
    const pkgJson = fs.readFileSync(`${filepath}/package.json`);
    const { dependencies } = JSON.parse(pkgJson);
    const keys = dependencies ? Object.keys(dependencies) : [];
    for (const key of keys) external.push(key);
    return {
      external,
      input: path.resolve(filepath, 'index.js'),
      output: [
        {
          file: path.resolve(filepath, 'dist/index.js'),
          format: 'esm',
        },
      ],
      plugins: [
        resolve(),
        babel({
          babelHelpers: 'bundled',
          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: 'entry',
                corejs: 3,
                modules: false,
                exclude: ['transform-typeof-symbol'],
              },
            ],
            ['@babel/preset-react', { development: false, useBuiltIns: true }],
          ],
          plugins: [
            [
              '@babel/plugin-proposal-object-rest-spread',
              { useBuiltIns: true },
            ],
          ],
        }),
      ],
    };
  })
  .filter((opt) => opt);
