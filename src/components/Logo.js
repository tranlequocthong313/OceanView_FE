import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';
import logo from '../assets/logo.jpg';

const styles = StyleSheet.create({
    image: {
        width: 110,
        height: 110,
        marginBottom: 8,
        borderRadius: 55,
    },
});

function Logo() {
    console.log('render Logo component');
    return <Image source={logo} style={styles.image} />;
}

export default memo(Logo);
