module.exports = (api) => {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        env: {
            production: {
                plugins: ['react-native-paper/babel'],
            },
        },
        plugins: [
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
