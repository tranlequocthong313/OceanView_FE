import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

const styles = StyleSheet.create({
    text: {
        fontSize: 15,
        lineHeight: 21,
        textAlign: 'center',
        marginBottom: 12,
    },
});

function Paragraph(props) {
    return <Text style={styles.text} {...props} />;
}

export default Paragraph;
