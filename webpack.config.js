const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, options) => {
    const isProduction = options.mode === 'production';

    const config = {
        mode: isProduction ? 'production' : 'development',
        devtool: isProduction ? 'none' : 'source-map',
        watch: !isProduction,
        entry: ['./src/index.js', './src/sass/style.scss'],
        output: {
            filename: 'script.js',
            path: path.join(__dirname, '/dist'),
        },       
        module: {
            rules: [
                {
                    enforce: 'pre',
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'eslint-loader',
                    options: {
                        fix: true,
                      },
                  },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                      loader: 'babel-loader',
                      options: {
                        presets: ['@babel/preset-env']
                      }
                    }
                }, {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' 
                    ]
                }, {
                    test: /\.(png|svg|jpe?g|gif|ico)$/,
                    use: [
                        {
                            loader: 'file-loader',
                        }
                    ]
                }, {
                    test: /\.html$/,
                    loader: 'html-loader',
                }               
            ]
        },
       

        plugins: [
            new CleanWebpackPlugin(),               
            new HtmlWebpackPlugin({
                template: './src/index.html'                
            }),
            new MiniCssExtractPlugin({
                filename: 'style.css'
            }),
            new CopyWebpackPlugin([
                { from:'src/audio/', to:'audio' },
                { from:'src/img/', to:'img' }
            ]),
        ],

        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            port: 3000,
            open: true,
          },
    }

    return config;
}