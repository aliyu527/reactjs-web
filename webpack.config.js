const path                          = require('path');
const HtmlWebpackPlugin             = require('html-webpack-plugin');
const webpack                       = require('webpack');
const CopyWebpackPlugin             = require('copy-webpack-plugin');
const BundleAnalyzerPlugin          = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const Production                    = true;
 

module.exports = {
    mode: 'production',
    externals: {
        'jquery': 'jQuery' // jquery is external and available at global veriable jQuery
    },
    devtool: Production ? '' : 'source-map', 
    entry: ["babel-polyfill", "./src/App.js"],
    output: {
        path: path.join(__dirname, 'build'),
        filename : 'gistoneer.js',
        chunkFilename: '[chunkhash].gistoneer.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        namedModules: false,
        namedChunks: false,
        nodeEnv: 'production',
        flagIncludedChunks: true,
        occurrenceOrder: true,
        sideEffects: true,
        usedExports: true,
        concatenateModules: true,
        noEmitOnErrors: true,
        checkWasmTypes: true,
        minimize: true,
        mangleWasmImports: true,
        removeAvailableModules: true
    },
    plugins: [
        new BundleAnalyzerPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({ 
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                removeAttributeQuotes: true,
                removeEmptyAttributes: true,
                useShortDoctype: true,
                minifyCSS: true,
                minifyJS: true
            },
            //inject: false, 
            cache: true,
            excludeChunks: ['dev-helper'],
            template: './src/index.html' 
        }),
        new CopyWebpackPlugin([{ from: 'static', to: 'static' }]),
        new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' }),
        //new LodashModuleReplacementPlugin,
    ],
    devServer: {
        contentBase: path.join(__dirname, "./"),
        historyApiFallback: true,
        open: true,
        hot: true,
        compress: false,
        port: 3001
    }
}