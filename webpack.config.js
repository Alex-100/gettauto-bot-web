const HtmlWebPackPlugin = require('html-webpack-plugin');

const path = require('path');
module.exports = {
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    mode: "development",
    context: __dirname,
    entry: "./src/index.tsx",
    output: {
        filename: '[name].[hash].js',
        publicPath: '/',
        path: path.join(__dirname, 'dist'), // Убедитесь, что путь задан правильно
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env",  "@babel/preset-react", "@babel/preset-typescript"],
                    },
                },
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    devServer: {
        historyApiFallback: true,
        compress: true,
        hot: true,
        liveReload: true,
        port: 3000,
        proxy: [{
            context: ['/model-connector/',
                        '/geo'], // замените '/api' на ваш конкретный путь
            target: 'http://94.130.88.182:8100',
            secure: false,
            changeOrigin: true
        }]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './public/index.html'
        })
    ]
};