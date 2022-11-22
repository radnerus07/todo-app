const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode:'development',
    module: {
        
        rules: [
            {
                test: /\.html$/,
                exclude: [/node_modules/, require.resolve('./index.html')],
                use: {
                    loader: 'file-loader',
                    query: {
                        name: '[name].[ext]'
                    },
                },
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"

                ]
            },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new MiniCssExtractPlugin({
           filename: "[name].css",
           chunkFilename:"[id].css"
        }),
    ]
}