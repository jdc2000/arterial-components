import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import fs from 'fs';
import path from 'path';

const PACKAGES = 'packages';
async function getConfig() {
  const result = [];
  const packages = fs.readdirSync(PACKAGES);
  for (const pkg of packages) {
    const filepath = path.resolve(PACKAGES, pkg);
    const stat = fs.statSync(filepath);
    if (!stat.isDirectory() || pkg === 'date-picker') continue;
    const {dependencies} = await import(`${filepath}/package.json`);
    const deps = Object.keys(dependencies || {});
    const external = ['react', 'prop-types', 'classnames', ...deps];
    result.push({
      external,
      input: path.resolve(filepath, 'index.js'),
      output: [{file: path.resolve(filepath, 'dist/index.js'), format: 'cjs'}],
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
            ['@babel/preset-react', {development: false, useBuiltIns: true}],
          ],
          plugins: [
            ['@babel/plugin-proposal-object-rest-spread', {useBuiltIns: true}],
          ],
        }),
      ],
    });
  }
  return result;
}
export const config = getConfig();
export default config;
