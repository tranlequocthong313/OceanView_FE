import React from 'react';
import { Image, StyleSheet } from 'react-native';
import logo from '../assets/logo.png'

const styles = StyleSheet.create({
    image: {
        width: 110,
        height: 110,
        marginBottom: 8,
    },
});

function Logo() {
    return <Image source={logo} style={styles.image} />;
}

export default Logo;