import React, { memo } from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import arrowBackImg from '../assets/arrow_back.png';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 10 + getStatusBarHeight(),
        left: 4,
        padding: 6,
    },
    image: {
        width: 26,
        height: 26,
    },
});

function BackButton({ goBack }) {
    console.log('BackButton render');
    return (
        <TouchableOpacity onPress={goBack} style={styles.container}>
            <Image style={styles.image} source={arrowBackImg} />
        </TouchableOpacity>
    );
}

export default memo(BackButton);
