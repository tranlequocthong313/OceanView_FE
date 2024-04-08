import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import arrowBackImg from '../assets/arrow_back.png'

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 10 + getStatusBarHeight(),
        left: 4,
    },
    image: {
        width: 24,
        height: 24,
    },
});

function BackButton({ goBack }) {
    return (
        <TouchableOpacity onPress={goBack} style={styles.container}>
            <Image style={styles.image} source={arrowBackImg} />
        </TouchableOpacity>
    );
}

export default BackButton;

