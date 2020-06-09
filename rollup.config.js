import babel from 'rollup-plugin-babel';
import copy from 'rollup-plugin-copy';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import fs from 'fs';
import path from 'path';

const PACKAGES = 'packages';
function getCssPath(pkg) {
  return path.resolve(`node_modules/@material/${pkg}/dist/mdc.${pkg}.min.css`);
}
function getDistPath(filepath) {
  return path.resolve(filepath, 'dist');
}
function getExternal() {
  return ['react', 'prop-types', 'classnames'];
}
function getPlugins() {
  return [
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
  ];
}

export default fs
  .readdirSync(PACKAGES)
  .map(pkg => {
    const filepath = path.resolve(PACKAGES, pkg);
    const stat = fs.statSync(filepath);
    if (!stat.isDirectory()) {
      return null;
    }
    const external = getExternal();
    const plugins = getPlugins();
    if (pkg === 'menu-surface') {
      external.push('react-dom');
    }
    if (pkg === 'select') {
      external.push('react-dom', 'uuid');
    }
    if (pkg === 'textfield') {
      external.push('uuid');
    }
    if (pkg === 'typeahead') {
      external.push('fuse.js', 'react-dom', 'uuid');
    }
    if (pkg === 'tabs') {
      plugins.push(
        copy({
          targets: [
            { src: getCssPath('tab'), dest: getDistPath(filepath) },
            { src: getCssPath('tab-bar'), dest: getDistPath(filepath) },
            { src: getCssPath('tab-indicator'), dest: getDistPath(filepath) },
            { src: getCssPath('tab-scroller'), dest: getDistPath(filepath) }
          ],
          verbose: true
        })
      );
    }
    if (pkg !== 'icon' && pkg !== 'tabs' && pkg !== 'typeahead') {
      plugins.push(
        copy({
          targets: [{ src: getCssPath(pkg), dest: getDistPath(filepath) }],
          verbose: true
        })
      );
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
      plugins
    };
  })
  .filter(opt => opt);
