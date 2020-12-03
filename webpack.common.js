const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "soccer-v0.1.0"),
        filename: "index.js"
    },
    module: {
        rules: [
            /* style and css loader */
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            }
        ]
    },
    /* plugin */
    plugins: [
        /* HTML Webpack Plugin */
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html"
        }),
        new HtmlWebpackPlugin({
            template: "./src/pages/navbar.html",
            filename: "./pages/navbar.html"
        }),
        new HtmlWebpackPlugin({
            template: "./src/pages/standings.html",
            filename: "./pages/standings.html"
        }),
        new HtmlWebpackPlugin({
            template: "./src/pages/matches.html",
            filename: "./pages/matches.html"
        }),
        new HtmlWebpackPlugin({
            template: "./src/pages/teams.html",
            filename: "./pages/teams.html"
        }),
        new HtmlWebpackPlugin({
            template: "./src/pages/upcoming.html",
            filename: "./pages/upcoming.html"
        }),
        new HtmlWebpackPlugin({
            template: "./src/pages/favorite.html",
            filename: "./pages/favorite.html"
        }),
        new HtmlWebpackPlugin({
            template: "./src/pages/reminder.html",
            filename: "./pages/reminder.html"
        }),
        new HtmlWebpackPlugin({
            template: "./src/detailTeam.html",
            filename: "detailTeam.html"
        }),
        new HtmlWebpackPlugin({
            template: "./src/detailMatch.html",
            filename: "detailMatch.html"
        }),
        new CopyPlugin({
            patterns: [
                { from: './src/img', to: './img' },
                { from: './src/sw.js', to: './sw.js'},
                { from: './src/manifest.json', to: './manifest.json'}
            ],
        }),
    ]
}