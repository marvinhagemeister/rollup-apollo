const path = require('path');
const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const replace = require('rollup-plugin-replace');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');

[{
    entry: 'index.js',
    target: 'bundle.js'
}].reduce((sequence, item) => {
    return sequence.then(() => build(item.entry, item.target))
        .catch(err => console.error(err)); // eslint-disable-line no-console
}, Promise.resolve());

function getPlugins() {
    let plugins = [
        nodeResolve({
            jsnext: true,
            main: true
        }),
        commonjs({
            include: 'node_modules/**'
        }),
        babel({
            exclude: 'node_modules/**',
            runtimeHelpers: true
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ];

    return plugins;
}

let cache = {};
function build(entry, target) {
    return rollup.rollup({
        entry: path.join(__dirname, 'src', entry),
        cache: cache[entry],
        plugins: getPlugins()
    }).then(bundle => {
        cache[entry] = bundle;

        bundle.write({
            format: 'iife',
            moduleName: 'apollo_test',
            sourceMap: true,
            dest: path.join(__dirname, 'dist', target)
        });
    });
}