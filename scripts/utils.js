const packageJson = require('../package.json');

const path = require("path");
const rollup = require('rollup').rollup;
const esbuild = require('rollup-plugin-esbuild').default;
const babel = require('@rollup/plugin-babel');
const resolve = require('@rollup/plugin-node-resolve').nodeResolve;
const uglify = require('uglify-js');

exports.buildJs = async (options) => {
  await (await rollup({
    input: `./src/index.ts`,
    plugins: [
      resolve(),
      esbuild({ minify: false }),
      babel.getBabelOutputPlugin({
        configFile: path.resolve(__dirname, '../.babelrc'),
        allowAllFormats: true,
      }),
      options.minify ? {
        name: 'minify',
        renderChunk(code) {
          const result = uglify.minify(code, {
            sourceMap: true,
            output: {
              comments: /^!/,
            },
            toplevel: true,
            mangle: {
              properties: {
                regex: /^_/,
              },
            },
          });

          if (result.error) {
            throw new Error(result.error);
          }

          return result;
        },
      } : false,
    ],
  })).write({
    ...{
      banner: `/*! ${packageJson.name} ${packageJson.version} | ${packageJson.license} | ${packageJson.homepage} */`,
      file: './dist/' + options.name + ('umd' !== options.format ? '.' + options.format : '') + (options.minify ? '.min' : '') + ".js",
      format: options.format,
      name: "node2json",
      sourcemap: options.sourcemap,
    },
    ...(options.exports ? {
      exports: options.exports,
    } : {})
  });
};