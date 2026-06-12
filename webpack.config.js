const path = require('path');
const { copyPublic } = require('./scripts/copy-public');

class CopyPublicPlugin {
    apply(compiler) {
        compiler.hooks.afterEmit.tap('CopyPublicPlugin', () => {
            copyPublic();
        });
    }
}

module.exports = {
    cache: {
        type: 'filesystem',
        buildDependencies: {
            config: [__filename]
        }
    },

    entry: "./src/main.tsx",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js",
        clean: true,
    },

    plugins: [
        new CopyPublicPlugin(),
    ],

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader"
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'file-loader',
                options: {},
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    target: ["web", "es5"],
};
