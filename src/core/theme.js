import { DefaultTheme } from 'react-native-paper';

const theme = {
    ...DefaultTheme,

    myOwnProperty: true,
    colors: {
        ...DefaultTheme.colors,
        text: '#000000',
        primary: '#041828',
        secondary: '#414757',
        third: '#2D33AF',
        error: '#f13a59',
        light: '#DDF6F2',
    },
};

export default theme;
