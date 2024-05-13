module.exports = (api) => {
    api.cache(false);
    return {
        presets: ['babel-preset-expo'],
        env: {
            production: {
                plugins: ['react-native-paper/babel'],
            },
        },
        plugins: [
            ['module:react-native-dotenv'],
            [
                require.resolve('babel-plugin-module-resolver'),
                {
                    root: ['./src/'],
                    alias: {
                        '~': './src',
                    },
                },
            ],
        ],
    };
};
