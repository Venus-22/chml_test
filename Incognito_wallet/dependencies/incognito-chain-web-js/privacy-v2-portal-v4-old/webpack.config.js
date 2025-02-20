var path = require('path');
const TerserPlugin = require('terser-webpack-plugin');


const optimization = {
    minimize: true,
    minimizer: [
        new TerserPlugin({
            terserOptions: {
                warnings: false,
                compress: {
                    comparisons: false,
                    drop_console: true,
                },
                parse: {},
                mangle: true,
                output: {
                    comments: false,
                    ascii_only: true,
                },
            },
            parallel: true,
            cache: true,
            sourceMap: false,
        }),
    ],
    nodeEnv: 'production',
};

const devConfig = {
    mode: 'development',
};

const prodConfig = {
    mode: 'production',
    optimization
};


module.exports = (env, argv) => {
    const isProduction = (argv.mode === 'production');

    const cfg = {
        devtool: 'source-map',
        entry: {
            wallet: './lib/wallet.js'
        },
        output: {
            path: path.resolve(__dirname),
            filename: 'build/[name].js',
            library: '',
            libraryTarget: 'umd'
        },
        target: "web",
        node: {
            fs: "empty"
        },
        module: {
            rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                'options': {
                    'plugins': ['lodash', '@babel/plugin-proposal-class-properties'],
                    'presets': ['@babel/preset-env']
                }
            }]
        },
        ...isProduction ? prodConfig : devConfig
    };
    const nodeCfg = {
        devtool: 'source-map',
        entry: {
            inc: './lib/lib.js',
        },
        output: {
            path: path.resolve(__dirname, 'build-node'),
            filename: '[name].js',
            library: '',
            libraryTarget: 'commonjs2'
        },
        target: "node",
        node: {
            __dirname: false
        },
        module: {
            rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                'options': {
                    'plugins': ['lodash', '@babel/plugin-proposal-class-properties'],
                    'presets': ['@babel/preset-env']
                }
            }]
        },
        ...isProduction ? prodConfig : devConfig
    };
    return [cfg, nodeCfg];
};