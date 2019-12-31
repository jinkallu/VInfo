const path = require('path');
//const fs = require('fs');
module.exports = {
    entry: "./src/main.ts",
    output: {
        path: path.resolve(__dirname, 'static/dist'),
        filename: "bundle.js"
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'static/dist'),
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".json"]
    },
    module: {
        rules: [
            // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
            { test: /\.tsx?$/, use: ["ts-loader"] },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    externals: {
        // require("jquery") is external and available
        //  on the global var jQuery
        "JSROOT": "JSROOT",
        "THREE" : "THREE",
        "MATH"  : "MATH",
        "MATHJAX"  : "MATHJAX",
        "CCapture": "CCapture", 
        three: 'three',
        //fs:    require('fs')
    }
}