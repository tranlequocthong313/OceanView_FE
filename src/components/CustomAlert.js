import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D9C657',
        padding: 10,
        width: 80,
        height: 40,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default function CustomAlert  ({ isVisible, onClose, title, message, onConfirm }) {
    return (
        <Modal isVisible={isVisible}>
            <View style={styles.modalContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.message}>{message}</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={onClose}>
                        <Text style={styles.buttonText}>Không</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={onConfirm}>
                        <Text style={styles.buttonText}>Có</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};



 
