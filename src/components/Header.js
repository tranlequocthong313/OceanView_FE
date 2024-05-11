import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import theme from '../core/theme';

const styles = StyleSheet.create({
    header: {
        fontSize: 21,
        color: theme.colors.primary,
        fontWeight: 'bold',
        paddingVertical: 12,
    },
});

function Header(props) {
    console.log('render Header component')
    return <Text style={styles.header} {...props} />;
}

export default memo(Header);
